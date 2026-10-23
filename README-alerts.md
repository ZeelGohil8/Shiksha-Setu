# Absent parent alerts (SMS + AI call)

Teacher Attendance page -> Save Attendance -> absent students' parents get an SMS and an automated voice call.

## Test now (demo mode)
Open index.html, login TCH0001 / 1234, Attendance, untick a student, Save.
Nothing is really sent; the "Parent Alerts" table shows "Demo (not sent)".
Students 5-10 have no mobile number saved, so they show "No mobile number".

## Go live
1. Deploy backend/server.js (Node.js) and set the env variables listed at its top.
2. In index.html, before `<script src="script.js">`, add:
   <script>window.SHIKSHASETU_CONFIG = { endpoint: "https://YOUR-SERVER/api/notify-absent", language: "gu", schoolName: "Your School Name" };</script>
3. Get parents' consent, and complete DLT registration for SMS in India.
