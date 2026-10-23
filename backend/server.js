require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const twilio = require("twilio");

const MAX_STUDENTS = 100;
const MAX_RETRIES = 1;
const VOICES = {
  en: { language: "en-IN", voice: "Google.en-IN-Standard-A" },
  hi: { language: "hi-IN", voice: "Google.hi-IN-Standard-A" },
  gu: { language: "gu-IN", voice: "Google.gu-IN-Standard-A" }
};

function normalizePhone(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();
  const digits = raw.replace(/[\s().-]/g, "");
  if (/^\+[1-9]\d{7,14}$/.test(digits)) return digits;
  const national = digits.replace(/^0/, "");
  if (/^[6-9]\d{9}$/.test(national)) return `+91${national}`;
  return null;
}

function maskPhone(phone) {
  return phone ? `${phone.slice(0, 3)}******${phone.slice(-2)}` : "";
}

function messageFor({ language, schoolName, names, className, date }) {
  const children = names.join(", ");
  if (language === "gu") {
    return `નમસ્તે, આ ${schoolName} તરફથી કૉલ છે. તમારા બાળક ${children}, ધોરણ ${className}, આજે ${date} શાળામાં ગેરહાજર હતા. જરૂર હોય તો કૃપા કરીને વર્ગ શિક્ષકનો સંપર્ક કરો. આભાર.`;
  }
  if (language === "hi") {
    return `नमस्ते, यह ${schoolName} की ओर से कॉल है। आपका बच्चा ${children}, कक्षा ${className}, आज ${date} को स्कूल में अनुपस्थित था। आवश्यकता हो तो कृपया कक्षा शिक्षक से संपर्क करें। धन्यवाद।`;
  }
  return `Namaste, this is ${schoolName} calling. Your child ${children} of class ${className} was absent from school today, ${date}. Please contact the class teacher if needed. Thank you.`;
}

function userFacingTwilioError(error) {
  const detail = String(error && error.message || "");
  const code = Number(error && error.code);
  if (code === 21219 || /trial|unverified|not verified/i.test(detail)) {
    return "Twilio trial account: this parent number is not verified. Verify it in Twilio or upgrade the account.";
  }
  return "Twilio could not place this call. Check the Twilio account and destination permissions.";
}

function createApp(options = {}) {
  const env = options.env || process.env;
  const client = options.client || (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN
    ? twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
    : null);
  const validateRequest = options.validateRequest || twilio.validateRequest;
  const groupsBySid = new Map();
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: false, limit: "100kb" }));
  app.use(cors({ origin: env.ALLOWED_ORIGIN || false }));

  const notifyLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

  function hasApiKey(req) {
    if (!env.API_KEY) return false;
    const supplied = Buffer.from(req.get("x-api-key") || "");
    const expected = Buffer.from(env.API_KEY);
    return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
  }

  function requireApiKey(req, res) {
    if (!hasApiKey(req)) {
      res.status(env.API_KEY ? 401 : 503).json({ error: env.API_KEY ? "unauthorized" : "API_KEY is not configured" });
      return false;
    }
    return true;
  }

  function callbackUrl(group, attempt) {
    if (!env.PUBLIC_BASE_URL) throw new Error("PUBLIC_BASE_URL is not configured");
    const url = new URL("/api/call-status", env.PUBLIC_BASE_URL);
    url.searchParams.set("attempt", String(attempt));
    url.searchParams.set("group", group.id);
    return url.toString();
  }

  function buildTwiML(group) {
    const response = new twilio.twiml.VoiceResponse();
    const settings = VOICES[group.language];
    response.say({ language: settings.language, voice: settings.voice }, messageFor(group));
    return response.toString();
  }

  async function placeGroupCall(group, attempt) {
    if (!client || !env.TWILIO_PHONE_NUMBER) {
      throw new Error("Twilio voice is not configured.");
    }
    const call = await client.calls.create({
      to: group.phone,
      from: env.TWILIO_PHONE_NUMBER,
      twiml: buildTwiML(group),
      statusCallback: callbackUrl(group, attempt),
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
      statusCallbackMethod: "POST"
    });
    group.currentSid = call.sid;
    group.status = "queued";
    group.error = "";
    groupsBySid.set(call.sid, group);
    return call.sid;
  }

  function scheduleRetry(group) {
    if (group.retryCount >= MAX_RETRIES || group.retryScheduled) return;
    group.retryScheduled = true;
    const delay = Math.max(0, Number(env.RETRY_DELAY_MIN || 1)) * 60 * 1000;
    setTimeout(async () => {
      group.retryScheduled = false;
      group.retryCount += 1;
      try {
        await placeGroupCall(group, group.retryCount);
      } catch (error) {
        group.status = "failed";
        group.error = userFacingTwilioError(error);
      }
    }, delay).unref?.();
  }

  app.post("/api/notify-absent", notifyLimiter, async (req, res) => {
    if (!requireApiKey(req, res)) return;

    const body = req.body || {};
    const legacy = Array.isArray(body.alerts);
    const students = legacy
      ? body.alerts.map(alert => ({
        id: alert.studentId,
        name: alert.studentName || alert.name,
        parentName: alert.parentName,
        mobile: alert.mobile || alert.phone,
        language: alert.language
      }))
      : body.students;
    if (!Array.isArray(students) || students.length > MAX_STUDENTS) {
      return res.status(400).json({ error: `students must contain at most ${MAX_STUDENTS} entries` });
    }

    const results = [];
    const groups = new Map();
    const selectedSchool = String(body.schoolName || body.school || env.SCHOOL_NAME || "School").slice(0, 120);
    const selectedClass = String(body.className || "").slice(0, 80);
    const date = String(body.date || "today").slice(0, 40);

    for (const student of students) {
      const studentId = student && (student.id ?? student.studentId);
      const mobile = student && (student.mobile || student.phone);
      const phone = normalizePhone(mobile);
      if (!phone) {
        results.push({ studentId, sms: "not-sent", call: "no-number", status: "no-number", callSid: null,
          error: mobile ? "Invalid mobile number." : "No mobile number on file." });
        continue;
      }

      const studentLanguage = String(student.language || body.language || "en").toLowerCase().slice(0, 2);
      const fallback = !VOICES[studentLanguage];
      const language = fallback ? "en" : studentLanguage;
      let group = groups.get(phone);
      if (!group) {
        group = {
          id: crypto.randomUUID(), phone, names: [], className: String(student.className || selectedClass || "").slice(0, 80),
          language, schoolName: selectedSchool, date, studentIds: [], retryCount: 0, status: "queued", error: ""
        };
        groups.set(phone, group);
      }
      group.names.push(String(student.name || "your child").slice(0, 100));
      group.studentIds.push(studentId);
      results.push({ studentId, sms: "not-sent", call: "queued", status: "queued", callSid: null,
        ...(fallback ? { warning: "Language unavailable; English voice used." } : {}) });
    }

    const queue = [...groups.values()];
    let cursor = 0;
    await Promise.all(Array.from({ length: Math.min(3, queue.length) }, async () => {
      while (cursor < queue.length) {
        const group = queue[cursor++];
        try {
          const callSid = await placeGroupCall(group, 0);
          group.studentIds.forEach(studentId => {
            const result = results.find(item => String(item.studentId) === String(studentId));
            if (result) result.callSid = callSid;
          });
        } catch (error) {
          group.status = "failed";
          group.error = userFacingTwilioError(error);
          group.studentIds.forEach(studentId => {
            const result = results.find(item => String(item.studentId) === String(studentId));
            if (result) {
              result.call = "failed";
              result.status = "failed";
              result.error = group.error;
            }
          });
        }
      }
    }));

    res.json({ results, trialMode: true, note: "Twilio trial accounts can call only verified destination numbers and play a trial announcement." });
  });

  app.post("/api/call-status", async (req, res) => {
    if (!env.TWILIO_AUTH_TOKEN || !env.PUBLIC_BASE_URL) return res.sendStatus(503);
    const signature = req.get("x-twilio-signature") || "";
    const signedUrl = `${String(env.PUBLIC_BASE_URL).replace(/\/$/, "")}${req.originalUrl}`;
    const valid = validateRequest(env.TWILIO_AUTH_TOKEN, signature, signedUrl, req.body || {});
    if (!valid) return res.status(403).json({ error: "invalid Twilio signature" });

    const group = groupsBySid.get(req.body.CallSid) || [...groupsBySid.values()].find(item => item.id === req.query.group);
    if (group) {
      group.status = String(req.body.CallStatus || "initiated").toLowerCase();
      if (["busy", "no-answer"].includes(group.status)) scheduleRetry(group);
    }
    res.sendStatus(204);
  });

  app.get("/api/call-status", (req, res) => {
    if (!requireApiKey(req, res)) return;
    const requested = String(req.query.sids || "").split(",").filter(Boolean).slice(0, 200);
    const statuses = {};
    requested.forEach(sid => {
      const group = groupsBySid.get(sid);
      if (group) statuses[sid] = {
        status: group.status,
        callSid: group.currentSid,
        error: group.error,
        studentIds: group.studentIds,
        retryCount: group.retryCount,
        retryScheduled: group.retryScheduled || false
      };
    });
    res.json({ statuses });
  });

  app.locals.groupsBySid = groupsBySid;
  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`ShikshaSetu voice alert server listening on port ${port}`));
}

module.exports = { createApp, normalizePhone, messageFor, userFacingTwilioError };
