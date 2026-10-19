/* ==========================================
   SHIKSHASETU - SCHOOL ADMINISTRATION DEMO
   Frontend only. Data is stored in this browser.
   ========================================== */

(() => {
  "use strict";

  // ---------- DEMO ACCOUNTS ----------

  const teachers = {
    TCH0001: {
      id: "TCH0001",
      password: "1234",
      name: "Priya Sharma",
      role: "Primary Teacher",
      school: "Government Primary School",
      className: "Class 5A",
      subject: "Mathematics"
    },
    TCH0002: {
      id: "TCH0002",
      password: "1234",
      name: "Rahul Patel",
      role: "Primary Teacher",
      school: "Government Primary School",
      className: "Class 4B",
      subject: "Science"
    },
    TCH0003: {
      id: "TCH0003",
      password: "1234",
      name: "Fatima Shaikh",
      role: "Primary Teacher",
      school: "Government Primary School",
      className: "Class 3A",
      subject: "English"
    }
  };

  const initialStudents = [
    ["1", "Aarav Patel", "5A"],
    ["2", "Diya Shah", "5A"],
    ["3", "Krishna Joshi", "5A"],
    ["4", "Ananya Desai", "5A"],
    ["5", "Vivaan Mehta", "5A"],
    ["6", "Ishita Parmar", "5A"],
    ["7", "Arjun Patel", "5A"],
    ["8", "Sara Khan", "5A"],
    ["9", "Reyansh Shah", "5A"],
    ["10", "Mira Joshi", "5A"],
    ["11", "Kabir Desai", "4B"],
    ["12", "Riya Patel", "4B"],
    ["13", "Zoya Shaikh", "3A"],
    ["14", "Dev Shah", "3A"]
  ].map(([id, name, className]) => ({ id, name, className }));

  const defaultTasks = [
    { id: 1, title: "Submit attendance report", due: "Today", done: false },
    { id: 2, title: "Update midday meal register", due: "Today", done: false },
    { id: 3, title: "Review student progress", due: "Tomorrow", done: false }
  ];

  // ---------- APPLICATION STATE ----------

  const state = {
    teacher: null,
    page: "dashboard",
    students: initialStudents,
    attendance: {},
    meals: {},
    tasks: defaultTasks,
    messages: [{
      sender: "School Coordinator",
      text: "Welcome to the ShikshaSetu teacher group!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    }]
  };

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const ACADEMIC_SUBJECTS_KEY = "shikshasetu_academic_subjects_v1";
  const ACADEMIC_MARKS_KEY = "shikshasetu_academic_marks_v1";
  const APP_STORAGE_KEY = "shikshasetu_demo_data";

  const today = () => {
    const d = new Date();
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  };

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const initials = name =>
    String(name || "Teacher")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0] || "")
      .join("")
      .toUpperCase();

  const currentClass = () =>
    state.teacher?.className.replace(/^Class\s+/i, "") || "5A";

  const classStudents = () =>
    state.students.filter(student => student.className === currentClass());

  // ---------- NOTIFICATIONS ----------

  function showToast(message) {
    const root = $("#toastRoot");
    if (!root) return;

    root.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      root.innerHTML = "";
    }, 3000);
  }

  // ---------- STORAGE ----------

  function loadSavedData() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(APP_STORAGE_KEY) || "{}"
      );

      state.attendance = saved.attendance || {};
      state.meals = saved.meals || {};
      state.tasks = saved.tasks || defaultTasks.map(task => ({ ...task }));
      state.messages = saved.messages || state.messages;
    } catch (error) {
      console.warn("Could not load demo data.", error);
    }
  }

  function saveData() {
    try {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
        attendance: state.attendance,
        meals: state.meals,
        tasks: state.tasks,
        messages: state.messages
      }));
    } catch (error) {
      showToast("Could not save data in this browser.");
    }
  }

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn("Could not read saved data:", key, error);
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      showToast("Could not save data in this browser.");
      return false;
    }
  }

  // ---------- LOGIN ----------

  function login(id, password) {
    const teacher = teachers[id.trim().toUpperCase()];
    const error = $("#loginError");

    if (!teacher || teacher.password !== password) {
      if (error) {
        error.textContent = "Invalid Teacher ID or PIN. Please try again.";
        error.classList.remove("hidden");
      }
      return;
    }

    state.teacher = teacher;

    $("#loginScreen")?.classList.add("hidden");
    $("#app")?.classList.remove("hidden");

    if (error) {
      error.textContent = "";
      error.classList.add("hidden");
    }

    updateTeacherDetails();
    navigate("dashboard");
    showToast(`Welcome, ${teacher.name}!`);
  }

  function logout() {
    state.teacher = null;
    $("#app")?.classList.add("hidden");
    $("#loginScreen")?.classList.remove("hidden");
    $("#loginForm")?.reset();
    $("#loginError")?.classList.add("hidden");
    closeSidebar();
  }

  function updateTeacherDetails() {
    if (!state.teacher) return;

    $("#sideName").textContent = state.teacher.name;
    $("#sideRole").textContent =
      `${state.teacher.role} · ${state.teacher.id}`;
    $("#sideAvatar").textContent = initials(state.teacher.name);
    $("#topAvatar").textContent = initials(state.teacher.name);
  }

  // ---------- NAVIGATION ----------

  const pageInfo = {
    dashboard: ["Dashboard", "Your school day at a glance"],
    classes: ["My Classes", "Manage students and class information"],
    attendance: ["Attendance", "Record and review student attendance"],
    meals: ["Midday Meals", "Maintain daily meal records"],
    reports: ["My Reports", "Prepare school administration reports"],
    academics: ["Academic Reports", "Enter marks, grades and student rankings"],
    assistant: ["Smart Assistant", "Draft administrative content for review"],
    chat: ["Teacher Chat", "Share updates with your teaching team"],
    profile: ["My Profile", "View your teacher information"]
  };

  function navigate(page) {
    if (!pageInfo[page]) page = "dashboard";
    if (!state.teacher) return;

    state.page = page;

    $$(".nav-btn[data-page]").forEach(button => {
      button.classList.toggle("active", button.dataset.page === page);
    });

    $("#pageTitle").textContent = pageInfo[page][0];
    $("#pageSubtitle").textContent = pageInfo[page][1];
    $("#pageContent").innerHTML = renderPage(page);

    closeSidebar();
  }

  function closeSidebar() {
    $("#sidebar")?.classList.remove("open");
  }

  // ---------- DASHBOARD ----------

  function renderDashboard() {
    const students = classStudents();
    const records = state.attendance[today()] || {};
    const present = students.filter(s => records[s.id] === "Present").length;
    const absent = students.filter(s => records[s.id] === "Absent").length;
    const pending = students.length - present - absent;
    const meal = state.meals[today()];
    const pendingTasks = state.tasks.filter(task => !task.done).length;

    return `
      <section class="stats-grid">
        <article class="stat-card">
          <span class="stat-label">My Students</span>
          <h2>${students.length}</h2>
          <p>${escapeHTML(state.teacher.className)}</p>
        </article>
        <article class="stat-card">
          <span class="stat-label">Present Today</span>
          <h2>${present}</h2>
          <p>${students.length ? Math.round(present / students.length * 100) : 0}% of students</p>
        </article>
        <article class="stat-card">
          <span class="stat-label">Absent Today</span>
          <h2>${absent}</h2>
          <p>Recorded absences</p>
        </article>
        <article class="stat-card">
          <span class="stat-label">Tasks Pending</span>
          <h2>${pendingTasks}</h2>
          <p>Tasks to complete</p>
        </article>
      </section>

      <section class="content-grid">
        <article class="panel">
          <div class="panel-header"><h3>Quick Actions</h3></div>
          <div class="quick-actions">
            <button class="action-card" data-go="attendance">
              <span>✓</span><strong>Mark Attendance</strong>
              <small>Record today's attendance</small>
            </button>
            <button class="action-card" data-go="meals">
              <span>🍲</span><strong>Midday Meals</strong>
              <small>Update meal records</small>
            </button>
            <button class="action-card" data-go="reports">
              <span>▤</span><strong>Generate Report</strong>
              <small>Prepare a report</small>
            </button>
            <button class="action-card" data-go="academics">
              <span>🎓</span><strong>Academic Reports</strong>
              <small>Enter and review marks</small>
            </button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header"><h3>Today's Overview</h3></div>
          <div class="overview-row">
            <span>Attendance records</span>
            <strong>${pending === 0 ? "Complete" : `${pending} pending`}</strong>
          </div>
          <div class="overview-row">
            <span>Meals recorded</span>
            <strong>${meal ? "Yes" : "Pending"}</strong>
          </div>
          <div class="overview-row">
            <span>Tasks pending</span><strong>${pendingTasks}</strong>
          </div>
          <button class="btn btn-secondary" data-go="attendance">
            Review Attendance
          </button>
        </article>
      </section>

      <section class="panel">
        <div class="panel-header"><h3>My Tasks</h3></div>
        ${renderTasks()}
      </section>
    `;
  }

  function renderTasks() {
    if (!state.tasks.length) return `<p class="empty-state">No tasks yet.</p>`;

    return `<div class="task-list">
      ${state.tasks.map(task => `
        <label class="task-row">
          <input type="checkbox" data-task="${task.id}" ${task.done ? "checked" : ""}>
          <span class="${task.done ? "task-done" : ""}">${escapeHTML(task.title)}</span>
          <small>${escapeHTML(task.due)}</small>
        </label>
      `).join("")}
    </div>`;
  }

  // ---------- CLASSES ----------

  function renderClasses() {
    const students = classStudents();

    return `
      <section class="panel">
        <div class="panel-header">
          <div>
          <h3>Student Records</h3>
<p class="muted">${students.length} students in your records</p>
          </div>
          <button class="btn btn-secondary" data-export="students">Export Student List</button>
        </div>
        <div class="table-wrap">
          <table>
          <thead>
    <tr>
        <th>Roll No.</th>
        <th>Student Name</th>
        <th>Parent's Contact</th>
    </tr>
</thead>
<tbody>
    ${students.map((s, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHTML(s.name)}</td>
            <td>${escapeHTML(s.parentContact || "Not provided")}</td>
        </tr>
    `).join("")}
</tbody>
          </table>
        </div>
        <p class="muted">Sample student records for demonstration only.</p>
      </section>`;
  }

  // ---------- ATTENDANCE ----------

  function renderAttendance() {
    const students = classStudents();
    const records = state.attendance[today()] || {};
    const present = students.filter(s => records[s.id] === "Present").length;
    const absent = students.filter(s => records[s.id] === "Absent").length;

    return `
      <section class="stats-grid">
        <article class="stat-card"><span class="stat-label">Present</span><h2>${present}</h2></article>
        <article class="stat-card"><span class="stat-label">Absent</span><h2>${absent}</h2></article>
        <article class="stat-card"><span class="stat-label">Not Marked</span><h2>${students.length - present - absent}</h2></article>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div><h3>Daily Attendance</h3><p class="muted">${today()}</p></div>
          <button class="btn btn-secondary" data-export="attendance">Export</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Student ID</th><th>Student Name</th><th>Status</th></tr></thead>
            <tbody>
              ${students.map(student => `
                <tr>
                  <td>${escapeHTML(student.id)}</td>
                  <td>${escapeHTML(student.name)}</td>
                  <td>
                    <select class="attendance-select" data-student="${student.id}"
                      aria-label="Attendance for ${escapeHTML(student.name)}">
                      <option value="" ${!records[student.id] ? "selected" : ""}>Select status</option>
                      <option value="Present" ${records[student.id] === "Present" ? "selected" : ""}>Present</option>
                      <option value="Absent" ${records[student.id] === "Absent" ? "selected" : ""}>Absent</option>
                    </select>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="panel-actions">
          <button class="btn btn-primary" id="saveAttendance">Save Attendance</button>
          <button class="btn btn-secondary" id="markAllPresent">Mark All Present</button>
        </div>
      </section>`;
  }

  function saveAttendance() {
    const records = { ...(state.attendance[today()] || {}) };

    $$(".attendance-select").forEach(select => {
      if (select.value) records[select.dataset.student] = select.value;
      else delete records[select.dataset.student];
    });

    state.attendance[today()] = records;
    saveData();
    navigate("attendance");
    showToast("Attendance saved.");
  }

  function markAllPresent() {
    state.attendance[today()] = {};
    classStudents().forEach(student => {
      state.attendance[today()][student.id] = "Present";
    });
    saveData();
    navigate("attendance");
    showToast("All students marked present. Verify before submitting.");
  }

  // ---------- MIDDAY MEALS ----------

  function renderMeals() {
    const meal = state.meals[today()] || {};

    return `
      <section class="panel">
        <div class="panel-header">
          <div><h3>Daily Midday Meal Register</h3><p class="muted">Record today's meal details.</p></div>
          <span class="status-pill">${meal.menu ? "Recorded" : "Not recorded"}</span>
        </div>
        <form id="mealForm" class="form-grid">
          <label>Date<input type="date" name="mealDate" value="${today()}" required></label>
          <label>Meal Menu<input name="menu" value="${escapeHTML(meal.menu || "")}" placeholder="e.g. Khichdi and vegetables" required></label>
          <label>Students Served<input type="number" name="served" min="0" max="${classStudents().length}" value="${meal.served ?? ""}" required></label>
          <label>Meal Status
            <select name="status" required>
              <option value="">Select status</option>
              <option ${meal.status === "Served" ? "selected" : ""}>Served</option>
              <option ${meal.status === "Partially Served" ? "selected" : ""}>Partially Served</option>
              <option ${meal.status === "Not Served" ? "selected" : ""}>Not Served</option>
            </select>
          </label>
          <label class="full-width">Notes<textarea name="notes" rows="3">${escapeHTML(meal.notes || "")}</textarea></label>
          <div class="panel-actions full-width">
            <button class="btn btn-primary" type="submit">Save Meal Record</button>
            <button class="btn btn-secondary" type="button" data-export="meals">Export Meal Records</button>
          </div>
        </form>
      </section>

      <section class="panel">
        <h3>Recent Meal Records</h3>
        ${renderMealHistory()}
      </section>`;
  }

  function renderMealHistory() {
    const entries = Object.entries(state.meals).sort((a, b) => b[0].localeCompare(a[0]));
    if (!entries.length) return `<p class="empty-state">No meal records saved yet.</p>`;

    return `<div class="table-wrap"><table>
      <thead><tr><th>Date</th><th>Menu</th><th>Students Served</th><th>Status</th></tr></thead>
      <tbody>${entries.map(([date, meal]) => `
        <tr><td>${escapeHTML(date)}</td><td>${escapeHTML(meal.menu)}</td>
        <td>${escapeHTML(meal.served)}</td><td>${escapeHTML(meal.status)}</td></tr>
      `).join("")}</tbody>
    </table></div>`;
  }

  function saveMeal(form) {
    const data = new FormData(form);
    const date = String(data.get("mealDate") || "");
    const menu = String(data.get("menu") || "").trim();
    const served = Number(data.get("served"));
    const status = String(data.get("status") || "");

    if (!date || !menu || !status || !Number.isInteger(served) ||
        served < 0 || served > classStudents().length) {
      showToast("Please check the meal form details.");
      return;
    }

    state.meals[date] = {
      menu,
      served,
      status,
      notes: String(data.get("notes") || "").trim()
    };

    saveData();
    navigate("meals");
    showToast("Meal record saved.");
  }

  // ---------- REPORTS ----------

  function renderReports() {
    return `
      <section class="panel">
        <h3>Generate School Report</h3>
        <p class="muted">Choose a report to preview and export.</p>
        <div class="form-grid">
          <label>Report Type
            <select id="reportType">
            <option value="academic">Academic Report</option>
              <option value="attendance">Attendance Report</option>
              <option value="meals">Midday Meal Report</option>
              <option value="tasks">Task Summary</option>
            </select>
          </label>
          <label>Date<input type="date" id="reportDate" value="${today()}"></label>
        </div>
        <div class="panel-actions">
          <button class="btn btn-primary" id="previewReport">Preview Report</button>
          <button class="btn btn-secondary" id="exportReport">Download</button>
        </div>
        <div id="reportPreview" class="report-preview">
          <p class="empty-state">Choose a report and select Preview Report.</p>
        </div>
      </section>`;
  }

  function getReportRows(type, date) {
    if (type === "attendance") {
      const records = state.attendance[date] || {};
      return [
        ["Date", "Student ID", "Student Name", "Class", "Status"],
        ...classStudents().map(s => [date, s.id, s.name, s.className, records[s.id] || "Not Marked"])
      ];
    }

    if (type === "meals") {
      const meal = state.meals[date];
      return [
        ["Date", "Menu", "Students Served", "Status", "Notes"],
        ...(meal ? [[date, meal.menu, meal.served, meal.status, meal.notes]] : [])
      ];
    }

    return [
      ["Task", "Due", "Status"],
      ...state.tasks.map(task => [task.title, task.due, task.done ? "Completed" : "Pending"])
    ];
  }

  function previewReport() {
    const rows = getReportRows($("#reportType").value, $("#reportDate").value);
    const preview = $("#reportPreview");

    if (rows.length === 1) {
      preview.innerHTML = `<p class="empty-state">No records found for this report.</p>`;
      return;
    }

    preview.innerHTML = `
      <h3>Report Preview</h3>
      <div class="table-wrap"><table>
        <thead><tr>${rows[0].map(cell => `<th>${escapeHTML(cell)}</th>`).join("")}</tr></thead>
        <tbody>${rows.slice(1).map(row => `<tr>${row.map(cell => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>
      <p class="muted">Review the information before sharing or submitting it.</p>`;
  }

  // ---------- SMART ASSISTANT ----------

  
function renderAssistant() {
  return `
    <section class="panel assistant-panel">
      <h2>✨ Smart Assistant</h2>
      <p class="muted">
        Create school notices, parent messages and other school-related drafts.
      </p>

      <form id="assistantForm" class="form-grid">

        <label>
          Draft Type
          <select name="kind">
            <option value="notice">School Notice</option>
            <option value="parent">Parent Message</option>
            <option value="meeting">Meeting Summary</option>
            <option value="leave">Leave Application</option>
            <option value="announcement">School Announcement</option>
          </select>
        </label>

        <label>
          Language
          <select name="language">
            <option value="English">English</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Hindi">Hindi</option>
          </select>
        </label>

        <label class="full-width">
          Topic
          <input
            name="topic"
            type="text"
            required
            maxlength="200"
            placeholder="e.g. Parent-teacher meeting"
          >
        </label>

        <label class="full-width">
          Additional Details
          <textarea
            name="details"
            rows="4"
            maxlength="2000"
            placeholder="Enter date, time, class and other important details..."
          ></textarea>
        </label>

        <div class="panel-actions full-width">
          <button type="submit" class="btn btn-primary">
            ✨ Create Draft
          </button>
        </div>

      </form>

      <div id="assistantResult"></div>

      <p class="muted">
        Review the draft before sending or publishing it.
      </p>
    </section>
  `;
}

  function makeDraft(kind, topic, details) {
    const extra = details.trim() ? `\n\nAdditional details:\n${details.trim()}` : "";
    const name = state.teacher.name;
    const school = state.teacher.school;

    const templates = {
      notice: `SCHOOL NOTICE\n\nSubject: ${topic}\n\nThis is to inform all concerned about ${topic}. Please follow the relevant arrangements.${extra}\n\nDate: ${today()}\nIssued by: ${name}`,
      meeting: `MEETING SUMMARY DRAFT\n\nTopic: ${topic}\nDate: ${today()}\n\nDiscussion points:\n1. ${topic}\n2. Key observations and updates\n3. Actions and follow-up\n\nPlease confirm action items with participants.${extra}`,
      attendance: `ATTENDANCE SUMMARY DRAFT\n\nClass: ${state.teacher.className}\nDate: ${today()}\nTopic: ${topic}\n\nVerify the attendance register and totals before submitting.${extra}`,
      meal: `MIDDAY MEAL SUMMARY DRAFT\n\nDate: ${today()}\nTopic: ${topic}\n\nVerify the menu, service details and number of students served against the official register.${extra}`,
      leave: `LEAVE APPLICATION DRAFT\n\nTo,\nThe Head Teacher\n${school}\n\nSubject: Leave request — ${topic}\n\nRespected Sir/Madam,\n\nI would like to request leave for the reason stated below. Kindly consider my request.\n\n${details.trim() || "[Add dates and relevant details]"}\n\nThank you.\n\nYours sincerely,\n${name}\nDate: ${today()}`
    };

    return templates[kind] || templates.notice;
  }

  // ---------- TEACHER CHAT ----------

   
function renderChat() {
  return `
    <section class="panel teacher-chat-panel">
      <div class="chat-header">
        <div class="chat-group-avatar">👩‍🏫</div>
        <div>
          <h3>Teacher Group Chat</h3>
          <p class="muted">Share messages, photos and voice notes</p>
        </div>
      </div>

      <div id="chatMessages" class="chat-messages">
        ${renderMessages()}
      </div>

      <form id="chatForm" class="chat-form">
        <label for="chatPhotoInput" class="chat-icon-btn"
               title="Attach a photo" aria-label="Attach a photo">
          📎
        </label>

        <input
          type="file"
          id="chatPhotoInput"
          accept="image/*"
          multiple
          hidden
        >

        <input
          type="text"
          name="message"
          id="chatMessageInput"
          maxlength="500"
          placeholder="Type a message..."
          autocomplete="off"
        >

        <button
          type="button"
          id="recordVoiceBtn"
          class="chat-icon-btn"
          title="Record voice message"
          aria-label="Record voice message"
        >🎙️</button>

        <button type="submit" class="chat-send-btn">
          ➤
        </button>
      </form>

      <div id="voiceRecordingStatus" class="voice-status"
           aria-live="polite"></div>

      <p class="muted chat-footnote">
        Demo mode · Messages are stored in this browser only.
      </p>
    </section>
  `;
}


 
function renderMessages() {
  if (!state.messages.length) {
    return `<p class="empty-state">No messages yet. Start a conversation!</p>`;
  }

  return state.messages.map((message, index) => {
    const isMine = state.teacher &&
      message.sender === state.teacher.name;

    let attachment = "";

    if (message.type === "image" && message.dataUrl) {
      attachment = `
        <img
          class="chat-photo"
          src="${escapeHTML(message.dataUrl)}"
          alt="Shared photo"
          loading="lazy"
        >
      `;
    } else if (message.type === "audio" && message.dataUrl) {
      attachment = `
        <audio
          class="chat-audio"
          controls
          preload="metadata"
          src="${escapeHTML(message.dataUrl)}"
        ></audio>
      `;
    }

    return `
      <article class="chat-message ${isMine ? "my-message" : ""}">
        <div class="chat-message-heading">
          <strong>${escapeHTML(message.sender)}</strong>
          <small>${escapeHTML(message.time)}</small>
        </div>

        ${message.text
          ? `<p class="chat-message-text">${escapeHTML(message.text)}</p>`
          : ""}

        ${attachment}
      </article>
    `;
  }).join("");
}


// Convert an uploaded file or voice recording into a data URL.
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the file."));

    reader.readAsDataURL(file);
  });
}


// Add a text, photo or voice message.
async function addChatMessage({ text = "", type = "text", dataUrl = "" }) {
  if (!state.teacher) return;

  if (!text.trim() && !dataUrl) return;

  state.messages.push({
    sender: state.teacher.name,
    text: text.trim(),
    type,
    dataUrl,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  saveData();

  // Render only the chat, not the entire page.
  const messages = $("#chatMessages");

  if (messages) {
    messages.innerHTML = renderMessages();
    messages.scrollTop = messages.scrollHeight;
  } else {
    navigate("chat");
  }
}


// Send a normal text message.
function sendMessage(form) {
  const input = $("#chatMessageInput");
  const text = input?.value.trim() || "";

  if (!text) return;

  addChatMessage({ text });

  input.value = "";
  input.focus();
}


// Upload and send selected photos.
async function sendChatPhotos(files) {
  const maxSize = 2 * 1024 * 1024; // 2 MB per photo

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      showToast("Please select image files only.");
      continue;
    }

    if (file.size > maxSize) {
      showToast(`${file.name} is too large. Maximum size is 2 MB.`);
      continue;
    }

    try {
      const dataUrl = await fileToDataURL(file);

      await addChatMessage({
        type: "image",
        dataUrl
      });
    } catch (error) {
      showToast("Could not load this photo.");
    }
  }
}


// Voice recording state.
let chatMediaRecorder = null;
let chatAudioChunks = [];
let chatIsRecording = false;


// Start or stop recording a voice message.
async function toggleVoiceRecording() {
  const button = $("#recordVoiceBtn");
  const status = $("#voiceRecordingStatus");

  if (!button || !status) return;

  // Clicking again stops the active recording.
  if (chatIsRecording && chatMediaRecorder) {
    chatMediaRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined") {
    showToast("Voice recording is not supported in this browser.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    chatAudioChunks = [];

    const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? { mimeType: "audio/webm;codecs=opus" }
      : {};

    chatMediaRecorder = new MediaRecorder(stream, options);

    chatMediaRecorder.addEventListener("dataavailable", event => {
      if (event.data.size > 0) {
        chatAudioChunks.push(event.data);
      }
    });

    chatMediaRecorder.addEventListener("stop", async () => {
      const recorder = chatMediaRecorder;
      const mimeType = recorder?.mimeType || "audio/webm";

      stream.getTracks().forEach(track => track.stop());

      chatIsRecording = false;
      button.textContent = "🎙️";
      button.classList.remove("recording");
      status.textContent = "";

      const audioBlob = new Blob(chatAudioChunks, {
        type: mimeType
      });

      chatAudioChunks = [];
      chatMediaRecorder = null;

      if (!audioBlob.size) {
        showToast("No voice audio was recorded.");
        return;
      }

      // Keep voice notes reasonably small for this local demo.
      if (audioBlob.size > 2 * 1024 * 1024) {
        showToast("Voice note is too large. Please record a shorter one.");
        return;
      }

      try {
        const dataUrl = await fileToDataURL(audioBlob);

        await addChatMessage({
          type: "audio",
          dataUrl
        });

        showToast("Voice message added to chat.");
      } catch (error) {
        showToast("Could not save the voice message.");
      }
    });

    chatMediaRecorder.start();
    chatIsRecording = true;

    button.textContent = "⏹️";
    button.classList.add("recording");
    status.textContent = "Recording... Click ⏹️ to finish and send.";

  } catch (error) {
    showToast("Microphone access denied or unavailable.");
  }
}


    


  // ---------- PROFILE ----------

  
     function renderProfile() {
  const teacher = state.teacher;
  if (!teacher) return "";

  let savedProfile = {};

  try {
    savedProfile = JSON.parse(
      localStorage.getItem("shikshasetu_profile_" + teacher.id) || "{}"
    );
  } catch (error) {
    savedProfile = {};
  }

  const profile = {
    ...savedProfile,
    ...(teacher.profile || {})
  };

  teacher.profile = profile;

  const initials = (teacher.name || "T")
    .split(" ")
    .map(word => word[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return `
    <section class="panel profile-card">
      <div class="profile-top">

        <div class="profile-avatar-wrap">
          ${
            profile.photo
              ? `<img src="${escapeHTML(profile.photo)}"
                   class="profile-photo" alt="Teacher profile photo">`
              : `<div class="profile-avatar">${escapeHTML(initials)}</div>`
          }

         
<label class="profile-camera-btn" title="Change profile photo">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="22" height="22"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
         aria-hidden="true">
        <path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
    <input type="file" id="profilePhotoInput"
           accept="image/*" hidden>
</label>

        </div>

        <h2>${escapeHTML(teacher.name || "")}</h2>
        <p>${escapeHTML(teacher.role || "Teacher")}</p>
        <small class="muted">Tap the camera icon to change your photo.</small>
      </div>

     
<div class="profile-details">
    <div>
        <span><i class="profile-detail-icon">▣</i> Teacher ID</span>
        <strong>${escapeHTML(teacher.id || "-")}</strong>
    </div>
    <div>
        <span><i class="profile-detail-icon">◆</i> School</span>
        <strong>${escapeHTML(teacher.school || "-")}</strong>
    </div>
    <div>
        <span><i class="profile-detail-icon">●</i> Assigned Class</span>
        <strong>${escapeHTML(teacher.className || "-")}</strong>
    </div>
    <div>
        <span><i class="profile-detail-icon">▣</i> Subject</span>
        <strong>${escapeHTML(teacher.subject || "-")}</strong>
    </div>
</div>

      <form id="profileForm" class="form-grid profile-form">
        <label>
          Email ID
          <input type="email" name="email"
            value="${escapeHTML(profile.email || "")}"
            placeholder="teacher@example.com">
        </label>

        <label>
          Contact Number
          <input type="tel" name="contact" maxlength="15"
            value="${escapeHTML(profile.contact || "")}"
            placeholder="Enter contact number">
        </label>

        <label>
          Qualification
          <input type="text" name="qualification" maxlength="150"
            value="${escapeHTML(profile.qualification || "")}"
            placeholder="e.g. B.Ed., M.A.">
        </label>

        <label>
          Teaching Experience
          <input type="text" name="experience" maxlength="100"
            value="${escapeHTML(profile.experience || "")}"
            placeholder="e.g. 5 years">
        </label>

        <label class="full-width">
          Additional Role
          <input type="text" name="additionalRole" maxlength="150"
            value="${escapeHTML(profile.additionalRole || "")}"
            placeholder="e.g. Examination Coordinator">
        </label>

        <div class="panel-actions full-width">
          <button type="submit" class="btn btn-primary">Save Profile</button>
        </div>
      </form>
    </section>
  `;
}

  // ==========================================
  // ACADEMIC REPORTS
  // ==========================================

  function getAcademicSubjects() {
    const saved = readJSON(ACADEMIC_SUBJECTS_KEY, null);

    if (Array.isArray(saved)) return saved;

    const defaults = [
      { id: "sub_english", name: "English", maximum: 100 },
      { id: "sub_math", name: "Mathematics", maximum: 100 },
      { id: "sub_science", name: "Science", maximum: 100 },
      { id: "sub_social", name: "Social Studies", maximum: 100 },
      { id: "sub_gujarati", name: "Gujarati", maximum: 100 }
    ];

    writeJSON(ACADEMIC_SUBJECTS_KEY, defaults);
    return defaults;
  }

  function getAcademicMarks() {
    const saved = readJSON(ACADEMIC_MARKS_KEY, {});
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  }

  function academicMarkKey(studentId, subjectId) {
    return `${studentId}__${subjectId}`;
  }

  function getGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  }

 

function getAcademicResults() {
  const subjects = getAcademicSubjects();
  const marks = getAcademicMarks();

  const results = classStudents().map(student => {
    let total = 0;
    let enteredSubjects = 0;

    const subjectResults = subjects.map(subject => {
      const key = academicMarkKey(student.id, subject.id);
      const raw = marks[key];

      const entered =
        raw !== undefined &&
        raw !== null &&
        String(raw).trim() !== "";

      const mark = entered ? Number(raw) : null;

      if (
        entered &&
        Number.isFinite(mark) &&
        mark >= 0 &&
        mark <= Number(subject.maximum)
      ) {
        total += mark;
        enteredSubjects++;
      }

      return {
        subjectId: subject.id,
        mark,
        entered:
          entered &&
          Number.isFinite(mark) &&
          mark >= 0 &&
          mark <= Number(subject.maximum)
      };
    });

    const maximum = subjects.reduce(
      (sum, subject) => sum + Number(subject.maximum),
      0
    );

    const complete =
      subjects.length > 0 &&
      enteredSubjects === subjects.length;

    const percentage =
      complete && maximum > 0
        ? (total / maximum) * 100
        : 0;

    return {
      ...student,
      subjectResults,
      total,
      maximum,
      percentage,
      grade: getGrade(percentage),
      enteredSubjects,
      complete
    };
  });

  
  results.sort((a, b) => {
    // Students with completed marks appear first, ranked by percentage.
    if (a.complete !== b.complete) {
      return a.complete ? -1 : 1;
    }

    // If both students have completed marks, sort by rank.
    if (a.complete && b.complete) {
      return (
        b.percentage - a.percentage ||
        b.total - a.total ||
        Number(a.id) - Number(b.id)
      );
    }

    // If marks are incomplete, sort by roll number.
    return Number(a.id) - Number(b.id);
  });


  let rank = 0;
  let previousPercentage = null;

  results.forEach(student => {
    if (!student.complete) {
      student.rank = "—";
      return;
    }

    if (student.percentage !== previousPercentage) {
      rank++;
      previousPercentage = student.percentage;
    }

    student.rank = rank;
  });

  return { subjects, students: results };
}


  function renderAcademicTopCards(students) {
    const complete = students.filter(s => s.complete);

    if (!complete.length) {
      return `<section class="academic-panel"><p class="academic-muted">Enter marks for all subjects to display confirmed top-three highlights.</p></section>`;
    }

    const positions = [
      ["👑", "1st Position", "first"],
      ["⭐", "2nd Position", "second"],
      ["⭐", "3rd Position", "third"]
    ];

    return `<section class="academic-top-cards">
      ${positions.map(([icon, label, css], index) => {
        const student = complete[index];

        return `<article class="academic-top-card ${css}">
          <div class="trophy">${icon}</div>
          <div class="academic-muted">${label}</div>
          ${student ? `
            <div class="student-name">${escapeHTML(student.name)}</div>
            <div class="percentage">${student.percentage.toFixed(1)}%</div>
            <div class="academic-muted">${student.total}/${student.maximum} marks · Grade ${student.grade}</div>
          ` : `<p class="academic-muted">Awaiting results</p>`}
        </article>`;
      }).join("")}
    </section>`;
  }

function renderAcademicRows(students, subjects) {
  const marks = getAcademicMarks();

  if (!students.length) {
    return `<tr><td colspan="${subjects.length + 6}">
      No students found.
    </td></tr>`;
  }

  return students.map(student => `
    <tr>
      <td>
        ${student.complete ? student.rank : "—"}
        ${student.complete && student.rank === 1 ? " 👑" : ""}
      </td>
      <td>
        <strong>${escapeHTML(student.name)}</strong>
        <div class="academic-muted">${escapeHTML(student.id)}</div>
      </td>

      ${subjects.map(subject => {
        const key = academicMarkKey(student.id, subject.id);
        const raw = marks[key] ?? "";

        return `
          <td>
            <input
              type="number"
              class="academic-mark-input"
              data-academic-mark="true"
              data-student-id="${escapeHTML(student.id)}"
              data-subject-id="${escapeHTML(subject.id)}"
              min="0"
              max="${Number(subject.maximum)}"
              step="1"
              value="${escapeHTML(raw)}"
              aria-label="${escapeHTML(student.name)} - ${escapeHTML(subject.name)}"
              style="width:90px;min-width:70px"
            >
          </td>
        `;
      }).join("")}

      <td>${student.total} / ${student.maximum}</td>
      <td>${student.complete
        ? student.percentage.toFixed(2) + "%"
        : "Pending"}</td>
      <td>${student.complete ? student.grade : "—"}</td>
    </tr>
  `).join("");
}


  function renderAcademicReports() {
    const { subjects, students } = getAcademicResults();
    const completed = students.filter(s => s.complete);
    const average = completed.length
      ? completed.reduce((sum, s) => sum + s.percentage, 0) / completed.length
      : 0;

    return `
      <section class="academic-summary">
        <article class="academic-stat"><span>Students in class</span><strong>${students.length}</strong></article>
        <article class="academic-stat"><span>Completed reports</span><strong>${completed.length}/${students.length}</strong></article>
        <article class="academic-stat"><span>Class average</span><strong>${completed.length ? average.toFixed(1) + "%" : "—"}</strong></article>
      </section>
      
      ${renderAcademicTopCards(students)}

      <section class="academic-panel">
        <h3 class="academic-heading">Manage Subjects</h3>
        <p class="academic-muted">Add subjects and maximum marks. Data is stored in this browser.</p>

        <form id="academicSubjectForm" class="academic-subject-form">
          <div class="academic-field">
            <label for="academicSubjectName">Subject name</label>
            <input id="academicSubjectName" name="subjectName" maxlength="60" required placeholder="e.g. Computer Science">
          </div>
          <div class="academic-field">
            <label for="academicSubjectMax">Maximum marks</label>
            <input id="academicSubjectMax" name="subjectMaximum" type="number" min="1" max="10000" step="1" value="100" required>
          </div>
          <button class="academic-button" type="submit">+ Add Subject</button>
        </form>

        <div class="academic-toolbar">
          <label for="academicDeleteSubject">Remove a subject:</label>
          <select id="academicDeleteSubject">
            ${subjects.map(s => `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)}</option>`).join("")}
          </select>
          <button type="button" class="academic-button danger" id="academicRemoveSubject">Remove Subject</button>
        </div>
      </section>

      <section class="academic-panel">
        <h3 class="academic-heading">Marks Entry & Student Results</h3>
        <p class="academic-muted">Enter marks, save your changes and review the updated results. Only complete reports are eligible for top-three highlights.</p>

        <div class="academic-toolbar">
          <input id="academicSearch" type="search" placeholder="Search student name or ID..." aria-label="Search students">
          <button type="button" class="academic-button" id="academicSaveMarks">Save Marks & Update Results</button>
          <button type="button" class="academic-button secondary" id="academicExport">Export</button>
        </div>

        <div class="academic-table-wrap">
          <table class="academic-table">
            <thead><tr>
              <th>Rank</th><th>Student</th>
              ${subjects.map(s => `<th>${escapeHTML(s.name)}<div>Out of ${Number(s.maximum)}</div></th>`).join("")}
              <th>Total</th><th>Percentage</th><th>Grade</th>
            </tr></thead>
            <tbody id="academicTableBody">${renderAcademicRows(students, subjects)}</tbody>
          </table>
        </div>

        <p class="academic-note">👑 First place · ⭐ Second and third place. Sample grading: A+ 90%+, A 80%+, B 70%+, C 60%+, D 50%+, F below 50%. Follow your school's official grading policy.</p>
      </section>`;
  }

  function renderCurrentAcademicPage() {
    if (state.page === "academics") {

      $("#pageContent").innerHTML = renderAcademicReports();
    }
  }

  function filterAcademicReports() {
    const query = ($("#academicSearch")?.value || "").trim().toLowerCase();
    const { subjects, students } = getAcademicResults();

    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query)
    );

    const body = $("#academicTableBody");
    if (body) body.innerHTML = renderAcademicRows(filtered, subjects);
  }

  function saveAcademicMarksFromTable() {
    const marks = getAcademicMarks();
    const subjects = getAcademicSubjects();
    const inputs = $$('[data-academic-mark="true"]');

    // Validate all visible inputs before saving any of them.
    for (const input of inputs) {
      const raw = input.value.trim();
      if (raw === "") continue;

      const subject = subjects.find(s => s.id === input.dataset.subjectId);
      if (!subject) continue;

      const value = Number(raw);
      if (!Number.isFinite(value) || value < 0 || value > Number(subject.maximum)) {
        input.setCustomValidity(`Enter a mark between 0 and ${subject.maximum}.`);
        input.reportValidity();
        return false;
      }
      input.setCustomValidity("");
    }

    for (const input of inputs) {
      const key = academicMarkKey(input.dataset.studentId, input.dataset.subjectId);
      const raw = input.value.trim();

      if (raw === "") delete marks[key];
      else marks[key] = Number(raw);
    }

    return writeJSON(ACADEMIC_MARKS_KEY, marks);
  }

  function addAcademicSubject(event) {
    event.preventDefault();

    const nameInput = $("#academicSubjectName");
    const maxInput = $("#academicSubjectMax");
    const name = nameInput.value.trim();
    const maximum = Number(maxInput.value);

    if (!name) {
      nameInput.focus();
      return;
    }

    if (!Number.isInteger(maximum) || maximum < 1 || maximum > 10000) {
      maxInput.setCustomValidity("Enter a whole number from 1 to 10000.");
      maxInput.reportValidity();
      maxInput.setCustomValidity("");
      return;
    }

    const subjects = getAcademicSubjects();

    if (subjects.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      showToast("That subject already exists.");
      return;
    }

    subjects.push({
      id: "sub_" + Date.now().toString(36),
      name,
      maximum
    });

    if (writeJSON(ACADEMIC_SUBJECTS_KEY, subjects)) {
      renderCurrentAcademicPage();
      showToast("Subject added.");
    }
  }

  function removeAcademicSubject() {
    const select = $("#academicDeleteSubject");
    if (!select?.value) return;

    const subjects = getAcademicSubjects();
    const subject = subjects.find(s => s.id === select.value);
    if (!subject) return;

    if (!confirm(`Remove "${subject.name}" and its saved marks?`)) return;

    const updatedSubjects = subjects.filter(s => s.id !== subject.id);
    const marks = getAcademicMarks();

    Object.keys(marks).forEach(key => {
      if (key.endsWith("__" + subject.id)) delete marks[key];
    });

    if (writeJSON(ACADEMIC_SUBJECTS_KEY, updatedSubjects) &&
        writeJSON(ACADEMIC_MARKS_KEY, marks)) {
      renderCurrentAcademicPage();
      showToast("Subject removed.");
    }
  }

  function exportAcademicReports() {
    const { subjects, students } = getAcademicResults();

    const rows = [
      [
        "Rank", "Student ID", "Student Name", "Class",
        ...subjects.map(s => s.name),
        "Total Marks", "Maximum Marks", "Percentage", "Grade", "Report Status"
      ],
      ...students.map(student => [
        student.rank,
        student.id,
        student.name,
        student.className,
        ...student.subjectResults.map(r => r.entered ? r.mark : ""),
        student.total,
        student.maximum,
        student.enteredSubjects ? student.percentage.toFixed(1) + "%" : "",
        student.enteredSubjects ? student.grade : "",
        student.complete ? "Complete" : "Incomplete"
      ])
    ];

    downloadCSV(rows, "shikshasetu-academic-reports.csv");
  }

  // ---------- CSV EXPORT ----------

  function downloadCSV(rows, filename) {
    const csv = rows.map(row => row.map(value => {
      let cell = String(value ?? "");

      // Protect spreadsheet users from formula injection.
      if (/^[\s]*[=+\-@]/.test(cell)) cell = "'" + cell;

      return `"${cell.replace(/"/g, '""')}"`;
    }).join(",")).join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Delay revocation so the browser can begin the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("CSV export prepared.");
  }

  function exportData(type) {
    let rows;
    let filename;

    if (type === "students") {
      rows = [
        ["Student ID", "Student Name", "Class"],
        ...classStudents().map(s => [s.id, s.name, s.className])
      ];
      filename = "shikshasetu-students.csv";
    } else if (type === "attendance") {
      rows = getReportRows("attendance", today());
      filename = `attendance-${today()}.csv`;
    } else if (type === "meals") {
      rows = [
        ["Date", "Menu", "Students Served", "Status", "Notes"],
        ...Object.entries(state.meals).map(([date, meal]) =>
          [date, meal.menu, meal.served, meal.status, meal.notes]
        )
      ];
      filename = "shikshasetu-meal-records.csv";
    } else {
      const typeValue = $("#reportType")?.value || "attendance";
      const date = $("#reportDate")?.value || today();
      rows = getReportRows(typeValue, date);
      filename = `shikshasetu-${typeValue}-${date}.csv`;
    }

    downloadCSV(rows, filename);
  }

  // ---------- PAGE RENDERER ----------
  // IMPORTANT: Every page function is in this same IIFE.
  // The comma after renderProfile fixes the original syntax error.

  function renderPage(page) {
    if (!state.teacher) return "";

    const pages = {
      dashboard: renderDashboard,
      classes: renderClasses,
      attendance: renderAttendance,
      meals: renderMeals,
      reports: renderReports,
      academics: renderAcademicReports,
      assistant: renderAssistant,
      chat: renderChat,
      profile: renderProfile
    };

    return pages[page] ? pages[page]() : renderDashboard();
  }

  // ---------- EVENT HANDLERS ----------

  function bindEvents() {
    
    // Teacher chat: send text messages.
    // Profile: save teacher details.
document.addEventListener("submit", event => {
  if (event.target.id !== "profileForm") return;

  event.preventDefault();

  const teacher = state.teacher;
  if (!teacher) return;

  teacher.profile = teacher.profile || {};

  const formData = new FormData(event.target);

  teacher.profile.email = formData.get("email") || "";
  teacher.profile.contact = formData.get("contact") || "";
  teacher.profile.qualification = formData.get("qualification") || "";
  teacher.profile.experience = formData.get("experience") || "";
  teacher.profile.additionalRole = formData.get("additionalRole") || "";

  saveData();
  showToast("Profile saved successfully!");
});

    // Teacher chat: choose and send photos.
    document.addEventListener("change", event => {
      if (event.target.id !== "chatPhotoInput") return;

      const files = Array.from(event.target.files || []);

      // Allow the same photo to be selected again later.
      event.target.value = "";

      sendChatPhotos(files);
    });
    // Profile photo upload handler
document.addEventListener("change", event => {
  if (event.target.id !== "profilePhotoInput") return;

  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Please select an image.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    showToast("Choose an image smaller than 2 MB.");
    return;
  }

  const teacher = state.teacher;
  if (!teacher) return;

  const reader = new FileReader();

  reader.onload = () => {
    teacher.profile = teacher.profile || {};
    teacher.profile.photo = reader.result;

    try {
      localStorage.setItem(
        "shikshasetu_profile_" + teacher.id,
        JSON.stringify(teacher.profile)
      );
    } catch (error) {
      showToast("Photo could not be saved.");
      return;
    }

    const avatar = document.querySelector(".profile-avatar-wrap");

    if (avatar) {
      const img = document.createElement("img");
      img.src = reader.result;
      img.className = "profile-photo";
      img.alt = "Teacher profile photo";
      const oldPhoto = avatar.querySelector(".profile-photo");

        if (oldPhoto) {
         oldPhoto.replaceWith(img);
        } else {
             avatar.prepend(img);
            }
const cameraLabel = document.createElement("label");
cameraLabel.className = "profile-camera-btn";
cameraLabel.title = "Change profile photo";

 cameraLabel.innerHTML = `
    <span>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">

            <path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v9
                     a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9
                     a2 2 0 0 0-2-2h-4l-2-3z"/>

            <circle cx="12" cy="12" r="3"/>
        </svg>
    </span>

    <input type="file"
           id="profilePhotoInput"
           accept="image/*"
           hidden>

`;
avatar.appendChild(cameraLabel);
    }

    showToast("Profile photo updated!");
    event.target.value = "";
  };

  reader.readAsDataURL(file);
});

    // Teacher chat: record voice messages.
    document.addEventListener("click", event => {
      const button = event.target.closest("#recordVoiceBtn");
      if (!button) return;

      toggleVoiceRecording();
    });

    $("#loginForm")?.addEventListener("submit", event => {
      event.preventDefault();
      login($("#teacherId").value, $("#password").value);
    });

    $$("[data-demo]").forEach(button => {
      button.addEventListener("click", () => {
        const teacher = teachers[button.dataset.demo];
        if (!teacher) return;

        $("#teacherId").value = teacher.id;
        $("#password").value = teacher.password;
        login(teacher.id, teacher.password);
      });
    });

    $("#logoutBtn")?.addEventListener("click", logout);

    $("#menuBtn")?.addEventListener("click", () => {
      $("#sidebar")?.classList.toggle("open");
    });

    $("#notificationBtn")?.addEventListener("click", () => {
      showToast("You are all caught up in this demo.");
    });

    // Delegated click handlers for dynamically rendered content.
    document.addEventListener("click", event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const nav = target.closest("[data-page]");
      if (nav) {
        navigate(nav.dataset.page);
        return;
      }

      const go = target.closest("[data-go]");
      if (go) {
        navigate(go.dataset.go);
        return;
      }

      const exportButton = target.closest("[data-export]");
      if (exportButton) {
        exportData(exportButton.dataset.export);
        return;
      }

      if (target.closest("#saveAttendance")) {
        saveAttendance();
        return;
      }

      if (target.closest("#markAllPresent")) {
        markAllPresent();
        return;
      }

      if (target.closest("#previewReport")) {
        previewReport();
        return;
      }

      if (target.closest("#exportReport")) {
        exportData("report");
        return;
      }

      if (target.closest("#academicSaveMarks")) {
        if (saveAcademicMarksFromTable()) {
          renderCurrentAcademicPage();
          showToast("Academic marks saved.");
        }
        return;
      }

      if (target.closest("#academicRemoveSubject")) {
        removeAcademicSubject();
        return;
      }

      if (target.closest("#academicExport")) {
        exportAcademicReports();
        return;
      }

      if (target.closest("#copyDraft")) {
        copyDraft();
        return;
      }

      if (target.closest("#downloadDraft")) {
        const draft = $("#draftText")?.value || "";
        downloadCSV([["Administrative Draft"], [draft]], "shikshasetu-draft.csv");
      }
    });

    document.addEventListener("change", event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const checkbox = target.closest("[data-task]");
      if (!checkbox) return;

      const task = state.tasks.find(
        item => String(item.id) === checkbox.dataset.task
      );

      if (task) {
        task.done = checkbox.checked;
        saveData();
        navigate("dashboard");
      }
    });

    document.addEventListener("input", event => {
      if (event.target.id === "academicSearch") {
        filterAcademicReports();
      }
    });

    document.addEventListener("submit", event => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      if (form.id === "mealForm") {
        event.preventDefault();
        saveMeal(form);
      }

      if (form.id === "assistantForm") {
        event.preventDefault();

        const data = new FormData(form);
        const draft = makeDraft(
          String(data.get("kind") || "notice"),
          String(data.get("topic") || ""),
          String(data.get("details") || "")
        );

        $("#assistantResult").innerHTML = `
          <section class="panel assistant-result">
            <div class="panel-header"><h3>Draft — Please Review</h3></div>
            <textarea id="draftText" rows="14">${escapeHTML(draft)}</textarea>
            <div class="panel-actions">
              <button type="button" class="btn btn-primary" id="copyDraft">Copy Draft</button>
              <button type="button" class="btn btn-secondary" id="downloadDraft">Download Draft</button>
            </div>
          </section>`;
      }

      if (form.id === "chatForm") {
        event.preventDefault();
        sendMessage(form);
      }

      if (form.id === "academicSubjectForm") {
        addAcademicSubject(event);
      }
    });
  }

  async function copyDraft() {
    const textarea = $("#draftText");
    if (!textarea) return;

    try {
      await navigator.clipboard.writeText(textarea.value);
      showToast("Draft copied.");
    } catch (error) {
      textarea.focus();
      textarea.select();

      try {
        const success = document.execCommand("copy");
        showToast(success ? "Draft copied." : "Select and copy the draft manually.");
      } catch {
        showToast("Select and copy the draft manually.");
      }
    }
  }

 
  // ---------- INITIALIZATION ----------

  function init() {
    loadSavedData();
    bindEvents();

    $("#app")?.classList.add("hidden");
    $("#loginScreen")?.classList.remove("hidden");

    const updateConnection = () => {
      const indicator = $("#syncStatus");
      if (!indicator) return;

      indicator.textContent = navigator.onLine
        ? "● Demo data"
        : "● Offline mode";
    };

    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    updateConnection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();



/* ===== SHIKSHASETU ATTENDANCE UPDATE ===== */

(function () {
    const students = [
        { name: "Aarav Patel", present: false },
        { name: "Diya Shah", present: false },
        { name: "Krishna Joshi", present: false },
        { name: "Ananya Desai", present: false },
        { name: "Vivaan Mehta", present: false },
        { name: "Student 6", present: false },
        { name: "Student 7", present: false },
        { name: "Student 8", present: false },
        { name: "Student 9", present: false },
        { name: "Student 10", present: false }
    ];

    function renderAttendance() {
        const content = document.getElementById("pageContent");
        if (!content) return;

        const present = students.filter(s => s.present).length;
        const absent = students.length - present;

        content.innerHTML = `
            <div class="stats" style="grid-template-columns:repeat(3,minmax(0,1fr));">
                <div class="card">
                    <p>Present</p>
                    <h2 style="color:#52734b">${present}</h2>
                </div>
                <div class="card">
                    <p>Absent</p>
                    <h2 style="color:#a53535">${absent}</h2>
                </div>
                <div class="card">
                    <p>Total Students</p>
                    <h2>${students.length}</h2>
                </div>
            </div>

            <div class="card" style="margin-top:24px;">
                <div class="section-title">
                    <div>
                        <h2>Daily Attendance</h2>
                        <p>${new Date().toISOString().slice(0, 10)}</p>
                    </div>
                    <button class="btn" id="exportAttendanceCSV">
                        Export
                    </button>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No.</th>
                                <th>Student Name</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map((student, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${student.name}</td>
                                    <td>
                                        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                                            <input
                                                type="checkbox"
                                                class="attendance-checkbox"
                                                data-index="${index}"
                                                ${student.present ? "checked" : ""}
                                                style="width:19px;height:19px;accent-color:#52734b;"
                                            >
                                            <span style="color:${student.present ? "#52734b" : "#a53535"}">
                                                ${student.present ? "Present" : "Absent"}
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        content.querySelectorAll(".attendance-checkbox").forEach(box => {
            box.addEventListener("change", function () {
                students[Number(this.dataset.index)].present = this.checked;
                renderAttendance();
            });
        });

        document.getElementById("exportAttendanceCSV")
            .addEventListener("click", function () {
                const rows = [
                    ["Roll No.", "Student Name", "Attendance"],
                    ...students.map((student, index) => [
                        index + 1,
                        student.name,
                        student.present ? "Present" : "Absent"
                    ])
                ];

                const csv = rows.map(row =>
                    row.map(value =>
                        '"' + String(value).replace(/"/g, '""') + '"'
                    ).join(",")
                ).join("\r\n");

                const blob = new Blob(["\uFEFF" + csv], {
                    type: "text/csv;charset=utf-8;"
                });

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "attendance.csv";
                link.click();
                URL.revokeObjectURL(url);
            });
    }

    // Open the updated attendance page when its menu button is clicked.
    document.addEventListener("click", function (event) {
        const button = event.target.closest('.nav-btn[data-page="attendance"]');
        if (!button) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        document.querySelectorAll(".nav-btn").forEach(nav => {
            nav.classList.toggle("active", nav === button);
        });

        document.getElementById("pageTitle").textContent = "Attendance";
        document.getElementById("pageSubtitle").textContent =
            "Record and review student attendance";

        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.remove("open");

        renderAttendance();
    }, true);
})();
 

