const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("./server");

async function withServer(options, run) {
  const app = createApp(options);
  const server = app.listen(0);
  await new Promise(resolve => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    await run(baseUrl, app);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

function fixture(createCall = async () => ({ sid: "CA123" })) {
  const calls = [];
  const client = { calls: { create: async options => {
    calls.push(options);
    return createCall(options);
  } } };
  const env = {
    API_KEY: "test-api-key",
    TWILIO_AUTH_TOKEN: "test-auth-token",
    TWILIO_PHONE_NUMBER: "+14155550100",
    PUBLIC_BASE_URL: "https://school.example",
    RETRY_DELAY_MIN: "60",
    ALLOWED_ORIGIN: "https://website.example"
  };
  return { appOptions: { client, env, validateRequest: (_token, signature) => signature === "valid-signature" }, calls };
}

const headers = { "content-type": "application/json", "x-api-key": "test-api-key" };

test("valid number is normalized and queued with localized TwiML and callback", async () => {
  const setup = fixture();
  await withServer(setup.appOptions, async baseUrl => {
    const response = await fetch(`${baseUrl}/api/notify-absent`, {
      method: "POST", headers,
      body: JSON.stringify({ date: "2026-10-23", className: "Class 5A", schoolName: "School & Sons", language: "gu", students: [
        { id: "s1", name: "Aarav <Patel>", mobile: "9876543210" },
        { id: "s2", name: "Diya", mobile: "9876543210" }
      ] })
    });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.results[0].status, "queued");
    assert.equal(body.results[0].callSid, "CA123");
    assert.equal(body.results[1].callSid, "CA123");
    assert.equal(setup.calls[0].to, "+919876543210");
    assert.equal(setup.calls.length, 1);
    assert.match(setup.calls[0].twiml, /Google\.gu-IN-Standard-A/);
    assert.match(setup.calls[0].twiml, /Aarav &lt;Patel&gt;/);
    assert.match(setup.calls[0].twiml, /Diya/);
    assert.equal(setup.calls[0].statusCallbackEvent.join(","), "initiated,ringing,answered,completed");
  });
});

test("missing and invalid numbers are skipped without provider calls", async () => {
  const setup = fixture();
  await withServer(setup.appOptions, async baseUrl => {
    const response = await fetch(`${baseUrl}/api/notify-absent`, {
      method: "POST", headers,
      body: JSON.stringify({ students: [
        { id: "missing", name: "No number" },
        { id: "invalid", name: "Bad number", mobile: "12345" }
      ] })
    });
    const body = await response.json();
    assert.deepEqual(body.results.map(result => result.status), ["no-number", "no-number"]);
    assert.equal(setup.calls.length, 0);
  });
});

test("Twilio errors fail only that call and unverified trial numbers get guidance", async () => {
  for (const [code, expected] of [[20003, /could not place/i], [21219, /trial account.*not verified/i]]) {
    const setup = fixture(async () => { throw Object.assign(new Error("provider error"), { code }); });
    await withServer(setup.appOptions, async baseUrl => {
      const response = await fetch(`${baseUrl}/api/notify-absent`, {
        method: "POST", headers,
        body: JSON.stringify({ students: [{ id: "s1", name: "Student", mobile: "+919876543210" }] })
      });
      const body = await response.json();
      assert.equal(body.results[0].status, "failed");
      assert.match(body.results[0].error, expected);
    });
  }
});

test("invalid Twilio callback signature is rejected", async () => {
  const setup = fixture();
  await withServer(setup.appOptions, async baseUrl => {
    const response = await fetch(`${baseUrl}/api/call-status`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "x-twilio-signature": "bad-signature" },
      body: new URLSearchParams({ CallSid: "CA123", CallStatus: "completed" })
    });
    assert.equal(response.status, 403);
  });
});

test("valid status callback updates the authenticated polling response", async () => {
  const setup = fixture();
  await withServer(setup.appOptions, async baseUrl => {
    await fetch(`${baseUrl}/api/notify-absent`, {
      method: "POST", headers,
      body: JSON.stringify({ students: [{ id: "s1", name: "Student", mobile: "+919876543210" }] })
    });
    const callback = await fetch(`${baseUrl}/api/call-status`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", "x-twilio-signature": "valid-signature" },
      body: new URLSearchParams({ CallSid: "CA123", CallStatus: "ringing" })
    });
    assert.equal(callback.status, 204);
    const response = await fetch(`${baseUrl}/api/call-status?sids=CA123`, { headers: { "x-api-key": "test-api-key" } });
    const body = await response.json();
    assert.equal(body.statuses.CA123.status, "ringing");
    assert.deepEqual(body.statuses.CA123.studentIds, ["s1"]);
  });
});

test("request without API key is rejected", async () => {
  const setup = fixture();
  await withServer(setup.appOptions, async baseUrl => {
    const response = await fetch(`${baseUrl}/api/notify-absent`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ students: [] })
    });
    assert.equal(response.status, 401);
  });
});
