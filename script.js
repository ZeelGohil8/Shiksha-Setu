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

  const parents = {
    PAR0001: {
      id: "PAR0001", email: "father.par0001@example.com", password: "1234", name: "Aarav Patel's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Aarav Patel", roll: "1", className: "Class 5A", dob: "12 March 2015", bloodGroup: "B+", guardianPhone: "9876543210", address: "Petlad, Gujarat", attendancePercent: 92, presentDays: 184, totalDays: 200 }
    },
    PAR0002: {
      id: "PAR0002", email: "father.par0002@example.com", password: "1234", name: "Diya Shah's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Diya Shah", roll: "2", className: "Class 5A", dob: "05 July 2015", bloodGroup: "O+", guardianPhone: "9876501234", address: "Petlad, Gujarat", attendancePercent: 95, presentDays: 190, totalDays: 200 }
    },
    PAR0003: {
      id: "PAR0003", email: "father.par0003@example.com", password: "1234", name: "Krishna Joshi's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Krishna Joshi", roll: "3", className: "Class 5A", dob: "21 September 2015", bloodGroup: "A+", guardianPhone: "9876502345", address: "Anand, Gujarat", attendancePercent: 93, presentDays: 186, totalDays: 200 }
    },
    PAR0004: {
      id: "PAR0004", email: "father.par0004@example.com", password: "1234", name: "Ananya Desai's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Ananya Desai", roll: "4", className: "Class 5A", dob: "14 January 2015", bloodGroup: "B+", guardianPhone: "9876503456", address: "Nadiad, Gujarat", attendancePercent: 96, presentDays: 192, totalDays: 200 }
    },
    PAR0005: {
      id: "PAR0005", email: "father.par0005@example.com", password: "1234", name: "Janki's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Janki", roll: "15", className: "Class 5A", dob: "Not provided", bloodGroup: "Not provided", guardianPhone: "7863082585", address: "Anand, Gujarat", attendancePercent: 0, presentDays: 0, totalDays: 0 }
    },
    PAR0006: {
      id: "PAR0006", email: "father.par0006@example.com", password: "1234", name: "Zeel's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Zeel", roll: "16", className: "Class 5A", dob: "Not provided", bloodGroup: "Not provided", guardianPhone: "9723647071", address: "Anand, Gujarat", attendancePercent: 0, presentDays: 0, totalDays: 0 }
    },
    PAR0007: {
      id: "PAR0007", email: "father.par0007@example.com", password: "1234", name: "Drashti's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Drashti", roll: "17", className: "Class 5A", dob: "Not provided", bloodGroup: "Not provided", guardianPhone: "7284880281", address: "Anand, Gujarat", attendancePercent: 0, presentDays: 0, totalDays: 0 }
    }
  };

  const initialStudents = [
    ["1", "Aarav Patel", "5A", "9876543210"],
    ["2", "Diya Shah", "5A", "9876501234"],
    ["3", "Krishna Joshi", "5A", "9876502345"],
    ["4", "Ananya Desai", "5A", "9876503456"],
    ["5", "Vivaan Mehta", "5A"],
    ["6", "Ishita Parmar", "5A"],
    ["7", "Arjun Patel", "5A"],
    ["8", "Sara Khan", "5A"],
    ["9", "Reyansh Shah", "5A"],
    ["10", "Mira Joshi", "5A"],
    ["11", "Kabir Desai", "4B"],
    ["12", "Riya Patel", "4B"],
    ["13", "Zoya Shaikh", "3A"],
    ["14", "Dev Shah", "3A"],
    ["15", "Janki", "5A", "7863082585"],
    ["16", "Zeel", "5A", "9723647071"],
    ["17", "Drashti", "5A", "7284880281"]
  ].map(([id, name, className, mobileNo]) => (mobileNo ? { id, name, className, mobileNo } : { id, name, className }));

  // Attendance and midday meal tasks are generated automatically (see getPendingTasks)
  // and clear themselves once the register is saved, so no manual defaults are needed.
  const defaultTasks = [];

  // ---------- APPLICATION STATE ----------

  const state = {
    teacher: null,
    userType: "teacher",
    page: "dashboard",
    language: "en",
    students: initialStudents,
    attendance: {},
    attendanceConfirmed: {},
    absenceAlerts: {},
    meals: {},
    notices: [],
    lastDraft: null,
    assistantDrafts: [],
    tasks: defaultTasks,
    chatClearedAtByUser: {},
    parentNoticeSeenByUser: {},
    messages: [{
      id: "seed-welcome-1",
      createdAt: 1,
      hiddenFor: [],
      sender: "School Coordinator",
      text: "Welcome to the ShikshaSetu teacher group!",
      seen: true,
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

  // ---------- OFFLINE MULTILINGUAL UI ----------
  // English is the source language; Gujarati and Hindi translations are bundled
  // locally, so switching languages works without an API or internet connection.
  const UI_TRANSLATIONS = {
    "ShikshaSetu | Smart School Administration": ["ShikshaSetu | સ્માર્ટ શાળા વ્યવસ્થાપન", "ShikshaSetu | स्मार्ट स्कूल प्रबंधन"],
    "Smarter Schools. Brighter Futures.": ["સ્માર્ટ શાળાઓ. ઉજ્જવળ ભવિષ્ય.", "स्मार्ट स्कूल। उज्ज्वल भविष्य।"],
    "One connected workspace for school administration. Manage classes, attendance, midday meals and reports from one simple dashboard.": ["શાળા વ્યવસ્થાપન માટે એક સંકલિત કાર્યસ્થળ. એક સરળ ડેશબોર્ડથી વર્ગો, હાજરી, મધ્યાહ્ન ભોજન અને અહેવાલો સંભાળો.", "स्कूल प्रशासन के लिए एक जुड़ा हुआ कार्यक्षेत्र। एक सरल डैशबोर्ड से कक्षाएँ, उपस्थिति, मध्याह्न भोजन और रिपोर्ट प्रबंधित करें।"],
    "One-time entry for everyday school records": ["રોજિંદા શાળા રેકોર્ડ માટે એક જ વાર નોંધણી", "दैनिक स्कूल रिकॉर्ड के लिए एक बार प्रविष्टि"],
    "AI-assisted drafts with teacher review": ["શિક્ષકની સમીક્ષા સાથે AI દ્વારા તૈયાર કરેલા ડ્રાફ્ટ", "शिक्षक की समीक्षा के साथ AI-सहायता प्राप्त ड्राफ्ट"],
    "Designed for low-connectivity workflows": ["ઓછા ઇન્ટરનેટમાં પણ કામ કરે તે રીતે બનાવેલ", "कम इंटरनेट कनेक्टिविटी में काम करने के लिए बनाया गया"],
    "Connecting Teachers, Parents & Students": ["શિક્ષકો, વાલીઓ અને વિદ્યાર્થીઓને જોડતું", "शिक्षकों, अभिभावकों और विद्यार्थियों को जोड़ता है"],
    "Welcome back": ["ફરી સ્વાગત છે", "वापसी पर स्वागत है"],
    "Sign in to open your teacher dashboard.": ["તમારું ડેશબોર્ડ ખોલવા માટે સાઇન ઇન કરો.", "अपना डैशबोर्ड खोलने के लिए साइन इन करें।"],
    "Teacher Login": ["શિક્ષક લૉગિન", "शिक्षक लॉगिन"],
    "Parent Login": ["વાલી લૉગિન", "अभिभावक लॉगिन"],
    "Teacher ID": ["શિક્ષક ID", "शिक्षक ID"],
    "Parent ID": ["વાલી ID", "अभिभावक ID"],
    "Parent's Email ID": ["વાલીનું ઇમેઇલ ID", "अभिभावक का ईमेल ID"],
    "Enter Parent's Email ID": ["વાલીનું ઇમેઇલ ID દાખલ કરો", "अभिभावक का ईमेल ID दर्ज करें"],
    "Invalid Parent's Email ID or password. Please try again.": ["વાલીનું ઇમેઇલ ID અથવા પાસવર્ડ ખોટો છે. કૃપા કરીને ફરી પ્રયાસ કરો.", "अभिभावक का ईमेल ID या पासवर्ड गलत है। कृपया फिर कोशिश करें।"],
    "Password / PIN": ["પાસવર્ડ / PIN", "पासवर्ड / PIN"],
    "Enter your password or PIN": ["તમારો પાસવર્ડ અથવા PIN દાખલ કરો", "अपना पासवर्ड या PIN दर्ज करें"],
    "Sign in securely →": ["સુરક્ષિત રીતે સાઇન ઇન કરો →", "सुरक्षित रूप से साइन इन करें →"],
    "Demo mode:": ["ડેમો મોડ:", "डेमो मोड:"],
    "This frontend uses sample accounts and does not provide real authentication. Do not enter a real password.": ["આ ફ્રન્ટએન્ડમાં નમૂનાના એકાઉન્ટ છે અને વાસ્તવિક પ્રમાણિત લૉગિન નથી. વાસ્તવિક પાસવર્ડ દાખલ ન કરો.", "इस फ्रंटएंड में नमूना खाते हैं और वास्तविक प्रमाणीकरण नहीं है। वास्तविक पासवर्ड दर्ज न करें।"],
    "Try a demo account": ["ડેમો એકાઉન્ટ અજમાવો", "डेमो खाता आज़माएँ"],
    "Use demo →": ["ડેમો વાપરો →", "डेमो इस्तेमाल करें →"],
    "Need help? Contact your school administrator.": ["મદદ જોઈએ છે? શાળાના સંચાલકનો સંપર્ક કરો.", "मदद चाहिए? अपने स्कूल प्रशासक से संपर्क करें।"],
    "Language": ["ભાષા", "भाषा"],
    "Choose website language": ["વેબસાઇટની ભાષા પસંદ કરો", "वेबसाइट की भाषा चुनें"],
    "Workspace": ["કાર્યસ્થળ", "कार्यस्थल"],
    "Dashboard": ["ડેશબોર્ડ", "डैशबोर्ड"],
    "Student Record": ["વિદ્યાર્થી રેકોર્ડ", "विद्यार्थी रिकॉर्ड"],
    "My Classes": ["મારા વર્ગો", "मेरी कक्षाएँ"],
    "Attendance": ["હાજરી", "उपस्थिति"],
    "Midday Meals": ["મધ્યાહ્ન ભોજન", "मध्याह्न भोजन"],
    "My Reports": ["અહેવાલ", "रिपोर्ट"],
    "Communication": ["સંદેશાવ્યવહાર", "संचार"],
    "Smart Assistant": ["સ્માર્ટ સહાયક", "स्मार्ट सहायक"],
    "Chat": ["ચેટ", "चैट"],
    "Account": ["એકાઉન્ટ", "खाता"],
    "My Profile": ["મારી પ્રોફાઇલ", "मेरी प्रोफ़ाइल"],
    "Log out": ["લૉગ આઉટ", "लॉग आउट"],
    "Faculty Members": ["શિક્ષક મંડળ", "शिक्षकगण"],
    "Student's Information": ["વિદ્યાર્થીની માહિતી", "छात्र की जानकारी"],
    "Parent Profile": ["વાલી પ્રોફાઇલ", "अभिभावक प्रोफ़ाइल"],
    "Parent–Teacher Chat": ["વાલી–શિક્ષક ચેટ", "अभिभावक–शिक्षक चैट"],
    "Parent Portal": ["વાલી પોર્ટલ", "अभिभावक पोर्टल"],
    "Your school day, organized.": ["તમારા શાળાના દિવસનું આયોજન.", "आपके स्कूल के दिन का सुव्यवस्थित विवरण।"],
    "Your school day at a glance": ["તમારા શાળાના દિવસની એક ઝલક", "आपके स्कूल के दिन की एक झलक"],
    "Attendance and school updates": ["હાજરી અને શાળાની માહિતી", "उपस्थिति और स्कूल अपडेट"],
    "Your child's school updates in one place.": ["તમારા બાળકની શાળાની માહિતી એક જ જગ્યાએ.", "आपके बच्चे के स्कूल के अपडेट एक ही जगह।"],
    "Your child's attendance summary": ["તમારા બાળકની હાજરીનો સારાંશ", "आपके बच्चे की उपस्थिति का सारांश"],
    "Your child's information": ["તમારા બાળકની માહિતી", "आपके बच्चे की जानकारी"],
    "Contact your child's teacher": ["તમારા બાળકના શિક્ષકનો સંપર્ક કરો", "अपने बच्चे के शिक्षक से संपर्क करें"],
    "This week's school meal menu": ["આ અઠવાડિયાનું શાળાનું ભોજન મેનૂ", "इस सप्ताह का स्कूल भोजन मेनू"],
    "Teacher names, subjects and contact numbers": ["શિક્ષકોનાં નામ, વિષયો અને સંપર્ક નંબર", "शिक्षकों के नाम, विषय और संपर्क नंबर"],
    "Quick Actions": ["ઝડપી કાર્યો", "त्वरित कार्य"],
    "Quick Access": ["ઝડપી ઍક્સેસ", "त्वरित पहुँच"],
    "Mark Attendance": ["હાજરી નોંધો", "उपस्थिति दर्ज करें"],
    "Record today's attendance": ["આજની હાજરી નોંધો", "आज की उपस्थिति दर्ज करें"],
    "Generate Report": ["અહેવાલ બનાવો", "रिपोर्ट बनाएँ"],
    "Prepare a report": ["અહેવાલ તૈયાર કરો", "रिपोर्ट तैयार करें"],
    "Today's Overview": ["આજની ઝલક", "आज का अवलोकन"],
    "Attendance records": ["હાજરીના રેકોર્ડ", "उपस्थिति रिकॉर्ड"],
    "Meals recorded": ["ભોજનની નોંધ", "भोजन दर्ज"],
    "Tasks pending": ["બાકી કાર્યો", "लंबित कार्य"],
    "My Tasks": ["મારા કાર્યો", "मेरे कार्य"],
    "No tasks yet.": ["હજુ કોઈ કાર્ય નથી.", "अभी कोई कार्य नहीं है।"],
    "My Students": ["કુલ વિદ્યાર્થીઓ", "कुल विद्यार्थी"],
    "Present Today": ["આજે હાજર", "आज उपस्थित"],
    "Absent Today": ["આજે ગેરહાજર", "आज अनुपस्थित"],
    "Tasks Pending": ["બાકી કાર્યો", "लंबित कार्य"],
    "of students": ["વિદ્યાર્થીઓમાંથી", "विद्यार्थियों में से"],
    "Recorded absences": ["નોંધાયેલી ગેરહાજરી", "दर्ज अनुपस्थितियाँ"],
    "Complete": ["પૂર્ણ", "पूर्ण"],
    "Pending": ["બાકી", "लंबित"],
    "Yes": ["હા", "हाँ"],
    "No": ["ના", "नहीं"],
    "Review Attendance": ["હાજરી તપાસો", "उपस्थिति की समीक्षा करें"],
    "Student Records": ["વિદ્યાર્થી રેકોર્ડ્સ", "विद्यार्थी रिकॉर्ड"],
    "students in your records": ["વિદ્યાર્થીઓના રેકોર્ડ", "विद्यार्थियों के रिकॉर्ड"],
    "Export Student List": ["વિદ્યાર્થી યાદી નિકાસ કરો", "विद्यार्थी सूची निर्यात करें"],
    "Roll No.": ["રોલ નં.", "रोल नं."],
    "Student Name": ["વિદ્યાર્થીનું નામ", "विद्यार्थी का नाम"],
    "Parent's Contact": ["વાલીનો સંપર્ક", "अभिभावक का संपर्क"],
    "Not provided": ["આપેલ નથી", "उपलब्ध नहीं"],
    "Sample student records for demonstration only.": ["માત્ર ડેમો માટેના નમૂનાના વિદ્યાર્થી રેકોર્ડ.", "केवल डेमो के लिए नमूना विद्यार्थी रिकॉर्ड।"],
    "Present": ["હાજર", "उपस्थित"],
    "Absent": ["ગેરહાજર", "अनुपस्थित"],
    "Total Students": ["કુલ વિદ્યાર્થીઓ", "कुल विद्यार्थी"],
    "Daily Attendance": ["દૈનિક હાજરી", "दैनिक उपस्थिति"],
    "Export": ["નિકાસ કરો", "निर्यात करें"],
    "Attendance Percentage": ["હાજરીની ટકાવારી", "उपस्थिति प्रतिशत"],
    "Total Present Days": ["કુલ હાજર દિવસો", "कुल उपस्थित दिन"],
    "school days": ["શાળાના દિવસો", "स्कूल के दिन"],
    "Sample attendance data for demo purposes.": ["ડેમો માટેના નમૂનાના હાજરી ડેટા.", "डेमो के लिए नमूना उपस्थिति डेटा।"],
    "Generate Attendance Report": ["હાજરીનો અહેવાલ બનાવો", "उपस्थिति रिपोर्ट बनाएँ"],
    "Choose a report period to view saved student attendance and calculate each student's percentage.": ["સાચવેલી વિદ્યાર્થી હાજરી જોવા અને દરેક વિદ્યાર્થીની ટકાવારી ગણવા માટે સમયગાળો પસંદ કરો.", "सहेजी गई विद्यार्थी उपस्थिति देखने और प्रत्येक विद्यार्थी का प्रतिशत निकालने के लिए अवधि चुनें।"],
    "Weekly": ["સાપ્તાહિક", "साप्ताहिक"],
    "Monthly": ["માસિક", "मासिक"],
    "Yearly": ["વાર્ષિક", "वार्षिक"],
    "Preview Report": ["અહેવાલનું પૂર્વદર્શન", "रिपोर्ट पूर्वावलोकन"],
    "Download Report": ["અહેવાલ ડાઉનલોડ કરો", "रिपोर्ट डाउनलोड करें"],
    "No attendance has been saved for this period. Go to Attendance, mark Present/Absent, press Save Attendance, and then preview this report again.": ["આ સમયગાળા માટે હાજરી સાચવેલી નથી. હાજરી વિભાગમાં જઈ હાજર/ગેરહાજર નોંધો, હાજરી સાચવો દબાવો અને પછી અહેવાલ ફરી જુઓ.", "इस अवधि के लिए उपस्थिति सहेजी नहीं गई है। उपस्थिति में जाकर उपस्थित/अनुपस्थित दर्ज करें, उपस्थिति सहेजें दबाएँ और फिर रिपोर्ट देखें।"],
    "MIDDAY MEAL SUMMARY DRAFT": ["મધ્યાહ્ન ભોજન સારાંશનો ડ્રાફ્ટ", "मध्याह्न भोजन सारांश ड्राफ्ट"],
    "Weekly Midday Meal Menu": ["સાપ્તાહિક મધ્યાહ્ન ભોજન મેનૂ", "साप्ताहिक मध्याह्न भोजन मेनू"],
    "Same weekly menu for teachers and parents.": ["શિક્ષકો અને વાલીઓ માટે એક જ સાપ્તાહિક મેનૂ.", "शिक्षकों और अभिभावकों के लिए एक ही साप्ताहिक मेनू।"],
    "Day": ["દિવસ", "दिन"],
    "Meal menu": ["ભોજન મેનૂ", "भोजन मेनू"],
    "Daily Midday Meal Register": ["દૈનિક મધ્યાહ્ન ભોજન રજિસ્ટર", "दैनिक मध्याह्न भोजन रजिस्टर"],
    "The menu is filled automatically from the selected day. Record service details below.": ["પસંદ કરેલા દિવસ પ્રમાણે મેનૂ આપમેળે દેખાશે. નીચે ભોજન વિતરણની વિગતો નોંધો.", "चुने गए दिन के अनुसार मेनू अपने आप दिखेगा। नीचे भोजन वितरण का विवरण दर्ज करें।"],
    "Recorded": ["નોંધાયેલ", "दर्ज"],
    "Not recorded": ["નોંધાયેલ નથી", "दर्ज नहीं"],
    "Date": ["તારીખ", "तारीख"],
    "Select a date to view the menu.": ["મેનૂ જોવા તારીખ પસંદ કરો.", "मेनू देखने के लिए तारीख चुनें।"],
    "No meal menu scheduled for this day.": ["આ દિવસ માટે ભોજન મેનૂ નક્કી નથી.", "इस दिन के लिए भोजन मेनू निर्धारित नहीं है।"],
    "Students Served": ["ભોજન મેળવનારા વિદ્યાર્થીઓ", "भोजन पाने वाले विद्यार्थी"],
    "Meal Status": ["ભોજનની સ્થિતિ", "भोजन की स्थिति"],
    "Select status": ["સ્થિતિ પસંદ કરો", "स्थिति चुनें"],
    "Served": ["પીરસાયું", "परोसा गया"],
    "Partially Served": ["આંશિક રીતે પીરસાયું", "आंशिक रूप से परोसा गया"],
    "Not Served": ["પીરસાયું નથી", "नहीं परोसा गया"],
    "Notes": ["નોંધો", "टिप्पणियाँ"],
    "Save Meal Record": ["ભોજનનો રેકોર્ડ સાચવો", "भोजन रिकॉर्ड सहेजें"],
    "Export Meal Records": ["ભોજનના રેકોર્ડ નિકાસ કરો", "भोजन रिकॉर्ड निर्यात करें"],
    "Recent Meal Records": ["તાજેતરના ભોજન રેકોર્ડ", "हाल के भोजन रिकॉर्ड"],
    "No meal records saved yet.": ["હજુ સુધી ભોજનના રેકોર્ડ સાચવ્યા નથી.", "अभी तक भोजन रिकॉर्ड सहेजे नहीं गए हैं।"],
    "My Reports": ["અહેવાલ", "रिपोर्ट"],
    "Smart Assistant": ["સ્માર્ટ સહાયક", "स्मार्ट सहायक"],
    "Create school notices, parent messages and other school-related drafts.": ["શાળાની સૂચનાઓ, વાલીઓ માટેના સંદેશા અને અન્ય શાળાસંબંધિત ડ્રાફ્ટ બનાવો.", "स्कूल नोटिस, अभिभावक संदेश और अन्य स्कूल-संबंधित ड्राफ्ट बनाएँ।"],
    "Draft Type": ["ડ્રાફ્ટનો પ્રકાર", "ड्राफ्ट का प्रकार"],
    "School Notice": ["શાળાની સૂચના", "स्कूल नोटिस"],
    "Parent Message": ["વાલી માટેનો સંદેશ", "अभिभावक संदेश"],
    "Meeting Summary": ["બેઠકનો સારાંશ", "बैठक का सारांश"],
    "Leave Application": ["રજાની અરજી", "छुट्टी का आवेदन"],
    "School Announcement": ["શાળાની જાહેરાત", "स्कूल की घोषणा"],
    "Topic": ["વિષય", "विषय"],
    "e.g. Parent-teacher meeting": ["દા.ત. વાલી-શિક્ષક બેઠક", "जैसे: अभिभावक-शिक्षक बैठक"],
    "Additional Details": ["વધારાની વિગતો", "अतिरिक्त विवरण"],
    "Enter date, time, class and other important details...": ["તારીખ, સમય, વર્ગ અને અન્ય જરૂરી વિગતો દાખલ કરો...", "तारीख, समय, कक्षा और अन्य ज़रूरी विवरण दर्ज करें..."],
    "✨ Create Draft": ["✨ ડ્રાફ્ટ બનાવો", "✨ ड्राफ्ट बनाएँ"],
    "Review the draft before sending or publishing it.": ["ડ્રાફ્ટ મોકલતા અથવા પ્રકાશિત કરતા પહેલાં તેની સમીક્ષા કરો.", "ड्राफ्ट भेजने या प्रकाशित करने से पहले उसकी समीक्षा करें।"],
    "Draft — Please Review": ["ડ્રાફ્ટ — કૃપા કરીને સમીક્ષા કરો", "ड्राफ्ट — कृपया समीक्षा करें"],
    "Download Draft": ["ડ્રાફ્ટ ડાઉનલોડ કરો", "ड्राफ्ट डाउनलोड करें"],
    "School notice": ["શાળાની સૂચના", "स्कूल नोटिस"],
    "Teacher Chat": ["શિક્ષક ચેટ", "शिक्षक चैट"],
    "Teacher Group Chat": ["શિક્ષક જૂથ ચેટ", "शिक्षक समूह चैट"],
    "Share messages, photos and voice notes": ["સંદેશા, ફોટા અને વૉઇસ નોંધો શેર કરો", "संदेश, फोटो और वॉइस नोट साझा करें"],
    "Attach a photo": ["ફોટો જોડો", "फोटो संलग्न करें"],
    "Record voice message": ["વૉઇસ સંદેશ રેકોર્ડ કરો", "वॉइस संदेश रिकॉर्ड करें"],
    "Demo mode · Messages are stored in this browser only.": ["ડેમો મોડ · સંદેશા ફક્ત આ બ્રાઉઝરમાં સંગ્રહિત થાય છે.", "डेमो मोड · संदेश केवल इसी ब्राउज़र में संग्रहीत होते हैं।"],
    "No messages yet. Start a conversation!": ["હજુ કોઈ સંદેશ નથી. વાતચીત શરૂ કરો!", "अभी कोई संदेश नहीं है। बातचीत शुरू करें!"],
    "Send a message to your child's class teacher": ["તમારા બાળકના વર્ગશિક્ષકને સંદેશ મોકલો", "अपने बच्चे के कक्षा शिक्षक को संदेश भेजें"],
    "My Profile": ["મારી પ્રોફાઇલ", "मेरी प्रोफ़ाइल"],
    "View your teacher information": ["તમારી શિક્ષક સંબંધિત માહિતી જુઓ", "अपनी शिक्षक जानकारी देखें"],
    "Profile photo updated!": ["પ્રોફાઇલ ફોટો અપડેટ થયો!", "प्रोफ़ाइल फोटो अपडेट हो गया!"],
    "Change profile photo": ["પ્રોફાઇલ ફોટો બદલો", "प्रोफ़ाइल फोटो बदलें"],
    "Tap the camera icon to change your photo.": ["ફોટો બદલવા કેમેરા ચિહ્ન દબાવો.", "फोटो बदलने के लिए कैमरा आइकन दबाएँ।"],
    "Parent / Guardian": ["વાલી / સંરક્ષક", "अभिभावक / संरक्षक"],
    "Parent ID": ["વાલી ID", "अभिभावक ID"],
    "Father's Information": ["પિતાની માહિતી", "पिता की जानकारी"],
    "Father's Name": ["પિતાનું નામ", "पिता का नाम"],
    "Father's Mobile Number": ["પિતાનો મોબાઇલ નંબર", "पिता का मोबाइल नंबर"],
    "Father's Email ID": ["પિતાનું ઈમેલ ID", "पिता की ईमेल ID"],
    "Mother's Information": ["માતાની માહિતી", "माता की जानकारी"],
    "Mother's Name": ["માતાનું નામ", "माता का नाम"],
    "Mother's Mobile Number": ["માતાનો મોબાઇલ નંબર", "माता का मोबाइल नंबर"],
    "Mother's Email ID": ["માતાનું ઈમેલ ID", "माता की ईमेल ID"],
    "Home Address": ["ઘરનું સરનામું", "घर का पता"],
    "Address": ["સરનામું", "पता"],
    "Save Parent Profile": ["વાલી પ્રોફાઇલ સાચવો", "अभिभावक प्रोफ़ाइल सहेजें"],

    "Student details linked to this demo parent account.": ["આ ડેમો વાલી એકાઉન્ટ સાથે જોડાયેલી વિદ્યાર્થીની વિગતો.", "इस डेमो अभिभावक खाते से जुड़ी विद्यार्थी की जानकारी।"],
    "Student name": ["વિદ્યાર્થીનું નામ", "विद्यार्थी का नाम"],
    "Class": ["વર્ગ", "कक्षा"],
    "Roll number": ["રોલ નંબર", "रोल नंबर"],
    "Date of birth": ["જન્મ તારીખ", "जन्म तिथि"],
    "Blood group": ["રક્ત જૂથ", "रक्त समूह"],
    "Parent contact": ["વાલીનો સંપર્ક", "अभिभावक का संपर्क"],
    "PARENT PORTAL": ["વાલી પોર્ટલ", "अभिभावक पोर्टल"],
    "Welcome,": ["સ્વાગત છે,", "स्वागत है,"],
    "Here are the latest updates for": ["અહીં નવીનતમ માહિતી છે:", "यहाँ नवीनतम अपडेट हैं:"],
    "Student's Information": ["વિદ્યાર્થીની માહિતી", "छात्र की जानकारी"],
    "View your child's details": ["તમારા બાળકની વિગતો જુઓ", "अपने बच्चे का विवरण देखें"],
    "Message Teacher": ["શિક્ષકને સંદેશ મોકલો", "शिक्षक को संदेश भेजें"],
    "Contact the class teacher": ["વર્ગશિક્ષકનો સંપર્ક કરો", "कक्षा शिक्षक से संपर्क करें"],
    "Meal Menu": ["ભોજન મેનૂ", "भोजन मेनू"],
    "View this week's meals": ["આ અઠવાડિયાનું ભોજન જુઓ", "इस सप्ताह का भोजन देखें"],
    "School Notice": ["શાળાની સૂચના", "स्कूल नोटिस"],
    "Dear Parent, please check the weekly meal menu and contact the class teacher if you have any questions.": ["પ્રિય વાલી, કૃપા કરીને સાપ્તાહિક ભોજન મેનૂ તપાસો અને કોઈ પ્રશ્ન હોય તો વર્ગશિક્ષકનો સંપર્ક કરો.", "प्रिय अभिभावक, कृपया साप्ताहिक भोजन मेनू देखें और कोई प्रश्न हो तो कक्षा शिक्षक से संपर्क करें।"],
    "Demo information for preview only.": ["માત્ર પૂર્વદર્શન માટેની ડેમો માહિતી.", "केवल पूर्वावलोकन के लिए डेमो जानकारी।"],
    "School Notice": ["શાળાની સૂચના", "स्कूल नोटिस"],
    "This week's school meal menu": ["આ અઠવાડિયાનું શાળાનું ભોજન મેનૂ", "इस सप्ताह का स्कूल भोजन मेनू"],
    "Monday": ["સોમવાર", "सोमवार"],
    "Tuesday": ["મંગળવાર", "मंगलवार"],
    "Wednesday": ["બુધવાર", "बुधवार"],
    "Thursday": ["ગુરુવાર", "गुरुवार"],
    "Friday": ["શુક્રવાર", "शुक्रवार"],
    "Sunday": ["રવિવાર", "रविवार"],
    "Saturday": ["શનિવાર", "शनिवार"],
    "Roti, dal, seasonal vegetable": ["રોટલી, દાળ, મોસમી શાકભાજી", "रोटी, दाल, मौसमी सब्ज़ी"],
    "Rice, chana curry": ["ભાત, ચણાનું શાક", "चावल, चने की करी"],
    "Khichdi and vegetables": ["ખીચડી અને શાકભાજી", "खिचड़ी और सब्ज़ियाँ"],
    "Roti, dal and vegetables": ["રોટલી, દાળ અને શાકભાજી", "रोटी, दाल और सब्ज़ियाँ"],
    "Vegetable pulao and fruit": ["શાકભાજી પુલાવ અને ફળ", "सब्ज़ी पुलाव और फल"],
    "Back to Dashboard": ["ડેશબોર્ડ પર પાછા જાઓ", "डैशबोर्ड पर वापस जाएँ"],
    "← Back to Dashboard": ["← ડેશબોર્ડ પર પાછા જાઓ", "← डैशबोर्ड पर वापस जाएँ"],
    "Notifications": ["સૂચનાઓ", "सूचनाएँ"],
    "● Demo data": ["● ડેમો ડેટા", "● डेमो डेटा"],
    "● Offline mode": ["● ઑફલાઇન મોડ", "● ऑफ़लाइन मोड"],
    "All students marked present. Verify the attendance.": ["બધા વિદ્યાર્થીઓને હાજર નોંધ્યા છે. હાજરી ચકાસો.", "सभी विद्यार्थियों को उपस्थित दर्ज किया गया। उपस्थिति जाँचें।"],
    "Please check the meal form details.": ["કૃપા કરીને ભોજન ફોર્મની વિગતો તપાસો.", "कृपया भोजन फ़ॉर्म का विवरण जाँचें।"],
    "Meal record saved.": ["ભોજનનો રેકોર્ડ સાચવાયો.", "भोजन रिकॉर्ड सहेजा गया।"],
    "Academic marks saved.": ["શૈક્ષણિક ગુણ સાચવાયા.", "शैक्षणिक अंक सहेजे गए।"],
    "Draft copied.": ["ડ્રાફ્ટ કૉપી થયો.", "ड्राफ्ट कॉपी हो गया।"],
    "Select and copy the draft manually.": ["ડ્રાફ્ટ પસંદ કરીને જાતે કૉપી કરો.", "ड्राफ्ट चुनकर मैन्युअल रूप से कॉपी करें।"],
    "Could not save data in this browser.": ["આ બ્રાઉઝરમાં ડેટા સાચવી શકાયો નથી.", "इस ब्राउज़र में डेटा सहेजा नहीं जा सका।"],
    "Please select an image.": ["કૃપા કરીને છબી પસંદ કરો.", "कृपया एक छवि चुनें।"],
    "Choose an image smaller than 2 MB.": ["2 MB કરતાં નાની છબી પસંદ કરો.", "2 MB से छोटी छवि चुनें।"],
    "Photo could not be saved.": ["ફોટો સાચવી શકાયો નથી.", "फोटो सहेजा नहीं जा सका।"],
    "View Meal Menu": ["ભોજન મેનૂ જુઓ", "भोजन मेनू देखें"],
    "Connecting Teachers, Parents & Students": ["શિક્ષકો, વાલીઓ અને વિદ્યાર્થીઓને જોડતું", "शिक्षकों, अभिभावकों और विद्यार्थियों को जोड़ता है"],
    "Subject": ["વિષય", "विषय"],
    "English": ["English", "English"],
    "Gujarati": ["ગુજરાતી", "गुजराती"],
    "Hindi": ["હિન્દી", "हिन्दी"],
    "School": ["શાળા", "स्कूल"],
    "school": ["શાળા", "स्कूल"],
    "Teacher": ["શિક્ષક", "शिक्षक"],
    "teacher": ["શિક્ષક", "शिक्षक"],
    "Parent": ["વાલી", "अभिभावक"],
    "parent": ["વાલી", "अभिभावक"],
    "Student": ["વિદ્યાર્થી", "विद्यार्थी"],
    "student": ["વિદ્યાર્થી", "विद्यार्थी"],
    "Name": ["નામ", "नाम"],
    "name": ["નામ", "नाम"],
    "Report": ["અહેવાલ", "रिपोर्ट"],
    "report": ["અહેવાલ", "रिपोर्ट"],
    "Save": ["સાચવો", "सहेजें"],
    "save": ["સાચવો", "सहेजें"],
    "Search": ["શોધો", "खोजें"],
    "search": ["શોધો", "खोजें"],
    "Filter": ["ફિલ્ટર", "फ़िल्टर"],
    "filter": ["ફિલ્ટર", "फ़िल्टर"],
    "Select": ["પસંદ કરો", "चुनें"],
    "select": ["પસંદ કરો", "चुनें"],
    "Details": ["વિગતો", "विवरण"],
    "details": ["વિગતો", "विवरण"],
    "Information": ["માહિતી", "जानकारी"],
    "information": ["માહિતી", "जानकारी"],
    "Today": ["આજે", "आज"],
    "today": ["આજે", "आज"],
    "Tomorrow": ["આવતીકાલે", "कल"],
    "tomorrow": ["આવતીકાલે", "कल"],
    "Done": ["પૂર્ણ", "हो गया"],
    "done": ["પૂર્ણ", "हो गया"],
    "Cancel": ["રદ કરો", "रद्द करें"],
    "Cancel": ["રદ કરો", "रद्द करें"],
    "Close": ["બંધ કરો", "बंद करें"],
    "Open": ["ખોલો", "खोलें"],
    "Total": ["કુલ", "कुल"],
    "total": ["કુલ", "कुल"],
    "Percentage": ["ટકાવારી", "प्रतिशत"],
    "percentage": ["ટકાવારી", "प्रतिशत"],
    "Email": ["ઈમેલ", "ईमेल"],
    "Mobile Number": ["મોબાઇલ નંબર", "मोबाइल नंबर"],
    "Phone": ["ફોન", "फोन"],
    "Address": ["સરનામું", "पता"],
    "Menu": ["મેનૂ", "मेनू"],
    "menu": ["મેનૂ", "मेनू"],
    "Meals": ["ભોજન", "भोजन"],
    "Class": ["વર્ગ", "कक्षा"],
    "class": ["વર્ગ", "कक्षा"],
    "Class 5A": ["વર્ગ 5A", "कक्षा 5A"],
    "Class 4B": ["વર્ગ 4B", "कक्षा 4B"],
    "Class 3A": ["વર્ગ 3A", "कक्षा 3A"],
    "All": ["બધા", "सभी"],
    "all": ["બધા", "सभी"],
    "No": ["ના", "नहीं"],
    "no": ["ના", "नहीं"],
    "Please": ["કૃપા કરીને", "कृपया"],
    "please": ["કૃપા કરીને", "कृपया"],
    "and": ["અને", "और"],
    "or": ["અથવા", "या"],
    "for": ["માટે", "के लिए"],
    "with": ["સાથે", "के साथ"],
    "from": ["માંથી", "से"],
    "to": ["ને", "को"],
    "your": ["તમારું", "आपका"],
    "Your": ["તમારું", "आपका"],
    "the": ["", ""],
    "The": ["", ""],
    "in": ["માં", "में"],
    "on": ["પર", "पर"],
    "this": ["આ", "यह"],
    "This": ["આ", "यह"],
    "week": ["અઠવાડિયું", "सप्ताह"],
    "weekly": ["સાપ્તાહિક", "साप्ताहिक"],
    "daily": ["દૈનિક", "दैनिक"],
    "student's": ["વિદ્યાર્થીની", "विद्यार्थी की"],
    "children": ["બાળકો", "बच्चे"],
    "child": ["બાળક", "बच्चा"],
    "contact": ["સંપર્ક", "संपर्क"],
    "contact number": ["સંપર્ક નંબર", "संपर्क नंबर"],
    "review": ["સમીક્ષા", "समीक्षा"],
    "Review": ["સમીક્ષા", "समीक्षा"],
    "message": ["સંદેશ", "संदेश"],
    "Message": ["સંદેશ", "संदेश"],
    "Create": ["બનાવો", "बनाएँ"],
    "create": ["બનાવો", "बनाएँ"],
    "Draft": ["ડ્રાફ્ટ", "ड्राफ्ट"],
    "draft": ["ડ્રાફ્ટ", "ड्राफ्ट"],
    "Download": ["ડાઉનલોડ કરો", "डाउनलोड करें"],
    "download": ["ડાઉનલોડ કરો", "डाउनलोड करें"],
    "Copy": ["કૉપી કરો", "कॉपी करें"],
    "copy": ["કૉપી કરો", "कॉपी करें"],
    "Time": ["સમય", "समय"],
    "time": ["સમય", "समय"],
    "Date of birth": ["જન્મ તારીખ", "जन्म तिथि"],
    "Demo": ["ડેમો", "डेमो"],
    "demo": ["ડેમો", "डेमो"],
    "Welcome": ["સ્વાગત છે", "स्वागत है"],
    "welcome": ["સ્વાગત છે", "स्वागत है"],
    "Hello": ["નમસ્તે", "नमस्ते"],
    "Generate": ["બનાવો", "बनाएँ"],
    "generate": ["બનાવો", "बनाएँ"],
    "View": ["જુઓ", "देखें"],
    "view": ["જુઓ", "देखें"],
    "Back": ["પાછા", "वापस"],
    "back": ["પાછા", "वापस"],
    "Status": ["સ્થિતિ", "स्थिति"],
    "status": ["સ્થિતિ", "स्थिति"],
    "Notice": ["સૂચના", "सूचना"],
    "notice": ["સૂચના", "सूचना"],
    "No records found.": ["કોઈ રેકોર્ડ મળ્યો નથી.", "कोई रिकॉर्ड नहीं मिला।"],
    "No data available.": ["કોઈ ડેટા ઉપલબ્ધ નથી.", "कोई डेटा उपलब्ध नहीं है।"],
    "No results found.": ["કોઈ પરિણામ મળ્યું નથી.", "कोई परिणाम नहीं मिला।"],
    "Please try again.": ["કૃપા કરીને ફરી પ્રયાસ કરો.", "कृपया फिर कोशिश करें।"],
    "Invalid Parent ID or password. Please try again.": ["વાલી ID અથવા પાસવર્ડ ખોટો છે. કૃપા કરીને ફરી પ્રયાસ કરો.", "अभिभावक ID या पासवर्ड गलत है। कृपया फिर कोशिश करें।"],
    "Invalid Teacher ID or PIN. Please try again.": ["શિક્ષક ID અથવા PIN ખોટો છે. કૃપા કરીને ફરી પ્રયાસ કરો.", "शिक्षक ID या PIN गलत है। कृपया फिर कोशिश करें।"],
    "Welcome,": ["સ્વાગત છે,", "स्वागत है,"],
    "Parent Profile saved.": ["વાલી પ્રોફાઇલ સાચવાઈ.", "अभिभावक प्रोफ़ाइल सहेजी गई।"],
    "Parent profile photo updated!": ["વાલી પ્રોફાઇલનો ફોટો અપડેટ થયો!", "अभिभावक प्रोफ़ाइल फोटो अपडेट हुई!"],
    "Teacher profile saved.": ["શિક્ષક પ્રોફાઇલ સાચવાઈ.", "शिक्षक प्रोफ़ाइल सहेजी गई।"],
    "Student Record": ["વિદ્યાર્થી રેકોર્ડ", "विद्यार्थी रिकॉर्ड"],
    "Present students": ["હાજર વિદ્યાર્થીઓ", "उपस्थित विद्यार्थी"],
    "Absent students": ["ગેરહાજર વિદ્યાર્થીઓ", "अनुपस्थित विद्यार्थी"],
    "Working/recorded days:": ["કાર્યકારી/નોંધાયેલા દિવસો:", "कार्य दिवस/दर्ज दिन:"],
    "Attendance percentage is calculated from each student's explicitly marked Present/Absent days, so blank days are not counted as Absent.": ["હાજરીની ટકાવારી ફક્ત હાજર/ગેરહાજર તરીકે નોંધાયેલા દિવસો પરથી ગણાય છે; ખાલી દિવસોને ગેરહાજર ગણવામાં આવતા નથી.", "उपस्थिति प्रतिशत केवल उपस्थित/अनुपस्थित के रूप में दर्ज दिनों से निकाला जाता है; खाली दिनों को अनुपस्थित नहीं माना जाता।"],
    "Shared photo": ["શેર કરેલો ફોટો", "साझा की गई फोटो"],
    "View Student's Information": ["વિદ્યાર્થીની માહિતી જુઓ", "छात्र की जानकारी देखें"],
    "Message your teacher": ["તમારા શિક્ષકને સંદેશ મોકલો", "अपने शिक्षक को संदेश भेजें"],
    "No school updates yet.": ["હજુ શાળાની માહિતી નથી.", "अभी तक स्कूल अपडेट नहीं हैं।"],
    "School Coordinator": ["શાળા સંયોજક", "स्कूल समन्वयक"],
    "Welcome to the ShikshaSetu teacher group!": ["ShikshaSetu શિક્ષક જૂથમાં સ્વાગત છે!", "ShikshaSetu शिक्षक समूह में आपका स्वागत है!"],
    "Tap the camera icon to change your photo.": ["ફોટો બદલવા કેમેરા ચિહ્ન દબાવો.", "फोटो बदलने के लिए कैमरा आइकन दबाएँ।"],
    "Your child's attendance summary.": ["તમારા બાળકની હાજરીનો સારાંશ.", "आपके बच्चे की उपस्थिति का सारांश।"],
    "Welcome, Aarav Patel's Parent": ["સ્વાગત છે, Aarav Patelના વાલી", "स्वागत है, Aarav Patel के अभिभावक"],
    "Welcome, Diya Shah's Parent": ["સ્વાગત છે, Diya Shahના વાલી", "स्वागत है, Diya Shah के अभिभावक"],
    "Weekly Attendance Report": ["સાપ્તાહિક હાજરી અહેવાલ", "साप्ताहिक उपस्थिति रिपोर्ट"],
    "Monthly Attendance Report": ["માસિક હાજરી અહેવાલ", "मासिक उपस्थिति रिपोर्ट"],
    "Yearly Attendance Report": ["વાર્ષિક હાજરી અહેવાલ", "वार्षिक उपस्थिति रिपोर्ट"],
    "Generate": ["બનાવો", "बनाएँ"],
    "Reset": ["રીસેટ કરો", "रीसेट करें"],
    "Apply": ["લાગુ કરો", "लागू करें"],
    "Save Attendance": ["હાજરી સાચવો", "उपस्थिति सहेजें"],
    "Notify parents of absent students (SMS + AI call) when I save": ["સાચવતી વખતે ગેરહાજર વિદ્યાર્થીઓના વાલીને જાણ કરો (SMS + AI કૉલ)", "सहेजते समय अनुपस्थित विद्यार्थियों के अभिभावकों को सूचित करें (SMS + AI कॉल)"],
    "Parent Alerts": ["વાલી સૂચનાઓ", "अभिभावक सूचनाएँ"],
    "SMS and AI call for absent students": ["ગેરહાજર વિદ્યાર્થીઓ માટે SMS અને AI કૉલ", "अनुपस्थित विद्यार्थियों के लिए SMS और AI कॉल"],
    "Retry failed": ["નિષ્ફળ ફરી મોકલો", "असफल दोबारा भेजें"],
    "Parent Mobile": ["વાલીનો મોબાઇલ", "अभिभावक मोबाइल"],
    "AI Call": ["AI કૉલ", "AI कॉल"],
    "Sent": ["મોકલાયું", "भेजा गया"],
    "Failed": ["નિષ્ફળ", "असफल"],
    "Demo (not sent)": ["ડેમો (મોકલાયું નથી)", "डेमो (भेजा नहीं गया)"],
    "No mobile number": ["મોબાઇલ નંબર નથી", "मोबाइल नंबर नहीं"],
    "Mark All Present": ["બધાને હાજર નોંધો", "सभी को उपस्थित दर्ज करें"],
    "Update meal records": ["ભોજનના રેકોર્ડ અપડેટ કરો", "भोजन रिकॉर्ड अपडेट करें"],
    "Download Draft": ["ડ્રાફ્ટ ડાઉનલોડ કરો", "ड्राफ्ट डाउनलोड करें"],
    "Please enter a topic.": ["કૃપા કરીને વિષય દાખલ કરો.", "कृपया विषय दर्ज करें।"],
    "Draft template follows the selected language. Common school topics and complete phrases are translated offline; custom details may stay as entered.": ["ડ્રાફ્ટનો નમૂનો પસંદ કરેલી ભાષામાં રહેશે. શાળાના સામાન્ય વિષયો અને સંપૂર્ણ શબ્દસમૂહોનું ઑફલાઇન ભાષાંતર થશે; કસ્ટમ વિગતો મૂળ જેવી રહી શકે છે.", "ड्राफ्ट का प्रारूप चुनी गई भाषा में होगा। स्कूल के सामान्य विषयों और पूरे वाक्यांशों का ऑफ़लाइन अनुवाद होगा; कस्टम विवरण वैसे ही रह सकते हैं।"],
    "Parent-teacher meeting": ["વાલી-શિક્ષક બેઠક", "अभिभावक-शिक्षक बैठक"],
    "parent-teacher meeting": ["વાલી-શિક્ષક બેઠક", "अभिभावक-शिक्षक बैठक"],
    "Meeting": ["બેઠક", "बैठक"],
    "meeting": ["બેઠક", "बैठक"],
    "School cleanliness": ["શાળાની સ્વચ્છતા", "स्कूल की स्वच्छता"],
    "school cleanliness": ["શાળાની સ્વચ્છતા", "स्कूल की स्वच्छता"],
    "Annual day": ["વાર્ષિકોત્સવ", "वार्षिकोत्सव"],
    "annual day": ["વાર્ષિકોત્સવ", "वार्षिकोत्सव"],
    "Exam timetable": ["પરીક્ષાનું સમયપત્રક", "परीक्षा समय-सारणी"],
    "exam timetable": ["પરીક્ષાનું સમયપત્રક", "परीक्षा समय-सारणी"],
    "Holiday notice": ["રજાની સૂચના", "अवकाश सूचना"],
    "holiday notice": ["રજાની સૂચના", "अवकाश सूचना"],
    "Student progress": ["વિદ્યાર્થીની પ્રગતિ", "विद्यार्थी की प्रगति"],
    "student progress": ["વિદ્યાર્થીની પ્રગતિ", "विद्यार्थी की प्रगति"],
    "School picnic": ["શાળાની પિકનિક", "स्कूल पिकनिक"],
    "school picnic": ["શાળાની પિકનિક", "स्कूल पिकनिक"],
    "Water supply": ["પાણીનો પુરવઠો", "जल आपूर्ति"],
    "water supply": ["પાણીનો પુરવઠો", "जल आपूर्ति"]
  };

  Object.assign(UI_TRANSLATIONS, {
    "Manage students and class information": ["વિદ્યાર્થીઓ અને વર્ગની માહિતી સંચાલિત કરો", "विद्यार्थियों और कक्षा की जानकारी प्रबंधित करें"],
    "Record and review student attendance": ["વિદ્યાર્થીઓની હાજરી નોંધો અને તપાસો", "विद्यार्थियों की उपस्थिति दर्ज करें और समीक्षा करें"],
    "Maintain daily meal records": ["દૈનિક ભોજનના રેકોર્ડ જાળવો", "दैनिक भोजन रिकॉर्ड बनाए रखें"],
    "Prepare school administration reports": ["શાળા વ્યવસ્થાપનના અહેવાલો તૈયાર કરો", "स्कूल प्रशासन की रिपोर्ट तैयार करें"],
    "Draft administrative content for review": ["સમીક્ષા માટે વહીવટી ડ્રાફ્ટ તૈયાર કરો", "समीक्षा के लिए प्रशासनिक ड्राफ्ट तैयार करें"],
    "Share updates with your teaching team": ["તમારી શિક્ષક ટીમ સાથે અપડેટ શેર કરો", "अपनी शिक्षक टीम के साथ अपडेट साझा करें"],
    "View your teacher information": ["તમારી શિક્ષક માહિતી જુઓ", "अपनी शिक्षक जानकारी देखें"],
    "Contact your child's teacher": ["તમારા બાળકના શિક્ષકનો સંપર્ક કરો", "अपने बच्चे के शिक्षक से संपर्क करें"],
    "Father's and mother's contact information": ["પિતા અને માતાની સંપર્ક માહિતી", "पिता और माता की संपर्क जानकारी"],
    "Student Academic Results": ["વિદ્યાર્થીના શૈક્ષણિક પરિણામો", "विद्यार्थी के शैक्षणिक परिणाम"],
    "Academic Reports": ["શૈક્ષણિક અહેવાલો", "शैक्षणिक रिपोर्टें"],
    "Academic Summary": ["શૈક્ષણિક સારાંશ", "शैक्षणिक सारांश"],
    "Subject Performance": ["વિષયવાર પ્રદર્શન", "विषयवार प्रदर्शन"],
    "Student Performance": ["વિદ્યાર્થીનું પ્રદર્શન", "विद्यार्थी का प्रदर्शन"],
    "Marks": ["ગુણ", "अंक"],
    "marks": ["ગુણ", "अंक"],
    "Maximum Marks": ["મહત્તમ ગુણ", "अधिकतम अंक"],
    "Maximum": ["મહત્તમ", "अधिकतम"],
    "Grade": ["ગ્રેડ", "ग्रेड"],
    "Rank": ["ક્રમ", "रैंक"],
    "Subject Name": ["વિષયનું નામ", "विषय का नाम"],
    "Add Subject": ["વિષય ઉમેરો", "विषय जोड़ें"],
    "Remove Subject": ["વિષય દૂર કરો", "विषय हटाएँ"],
    "Save Marks": ["ગુણ સાચવો", "अंक सहेजें"],
    "Add New Subject": ["નવો વિષય ઉમેરો", "नया विषय जोड़ें"],
    "Search students": ["વિદ્યાર્થીઓ શોધો", "विद्यार्थियों को खोजें"],
    "Search by student name or roll number": ["વિદ્યાર્થીના નામ અથવા રોલ નંબરથી શોધો", "विद्यार्थी के नाम या रोल नंबर से खोजें"],
    "Enter marks for all subjects to display confirmed top-three highlights.": ["પુષ્ટિ કરેલા ટોચના ત્રણ પરિણામો જોવા બધા વિષયોના ગુણ દાખલ કરો.", "पुष्ट शीर्ष तीन परिणाम देखने के लिए सभी विषयों के अंक दर्ज करें।"],
    "Awaiting results": ["પરિણામોની રાહમાં", "परिणाम की प्रतीक्षा"],
    "Report Type": ["અહેવાલનો પ્રકાર", "रिपोर्ट का प्रकार"],
    "Select a period and click Preview Report.": ["સમયગાળો પસંદ કરો અને અહેવાલ પૂર્વદર્શન પર ક્લિક કરો.", "अवधि चुनें और रिपोर्ट पूर्वावलोकन पर क्लिक करें।"],
    "Please select a valid date range, month or academic year.": ["કૃપા કરીને યોગ્ય તારીખની શ્રેણી, મહિનો અથવા શૈક્ષણિક વર્ષ પસંદ કરો.", "कृपया मान्य तारीख सीमा, महीना या शैक्षणिक वर्ष चुनें।"],
    "P = Present · A = Absent · Blank = attendance not marked": ["P = હાજર · A = ગેરહાજર · ખાલી = હાજરી નોંધાઈ નથી", "P = उपस्थित · A = अनुपस्थित · खाली = उपस्थिति दर्ज नहीं"],
    "Working/recorded days:": ["કાર્યકારી/નોંધાયેલા દિવસો:", "कार्य दिवस/दर्ज दिन:"],
    "Export Report": ["અહેવાલ નિકાસ કરો", "रिपोर्ट निर्यात करें"],
    "Export Attendance": ["હાજરી નિકાસ કરો", "उपस्थिति निर्यात करें"],
    "Save Attendance": ["હાજરી સાચવો", "उपस्थिति सहेजें"],
    "Mark All Present": ["બધાને હાજર નોંધો", "सभी को उपस्थित दर्ज करें"],
    "Save and Continue": ["સાચવો અને આગળ વધો", "सहेजें और आगे बढ़ें"],
    "Export Student List": ["વિદ્યાર્થી યાદી નિકાસ કરો", "विद्यार्थी सूची निर्यात करें"],
    "Assigned Class": ["સોંપાયેલ વર્ગ", "आवंटित कक्षा"],
    "Qualification": ["લાયકાત", "योग्यता"],
    "Teaching Experience": ["અધ્યાપનનો અનુભવ", "शिक्षण अनुभव"],
    "Additional Role": ["વધારાની ભૂમિકા", "अतिरिक्त भूमिका"],
    "Email ID": ["ઈમેલ ID", "ईमेल ID"],
    "Contact Number": ["સંપર્ક નંબર", "संपर्क नंबर"],
    "Enter contact number": ["સંપર્ક નંબર દાખલ કરો", "संपर्क नंबर दर्ज करें"],
    "Enter father's full name": ["પિતાનું પૂરું નામ દાખલ કરો", "पिता का पूरा नाम दर्ज करें"],
    "Enter father's mobile number": ["પિતાનો મોબાઇલ નંબર દાખલ કરો", "पिता का मोबाइल नंबर दर्ज करें"],
    "Enter father's email address": ["પિતાનું ઈમેલ સરનામું દાખલ કરો", "पिता का ईमेल पता दर्ज करें"],
    "Enter mother's full name": ["માતાનું પૂરું નામ દાખલ કરો", "माता का पूरा नाम दर्ज करें"],
    "Enter mother's mobile number": ["માતાનો મોબાઇલ નંબર દાખલ કરો", "माता का मोबाइल नंबर दर्ज करें"],
    "Enter mother's email address": ["માતાનું ઈમેલ સરનામું દાખલ કરો", "माता का ईमेल पता दर्ज करें"],
    "Enter full home address": ["ઘરનું પૂરું સરનામું દાખલ કરો", "घर का पूरा पता दर्ज करें"],
    "Your child's attendance summary.": ["તમારા બાળકની હાજરીનો સારાંશ.", "आपके बच्चे की उपस्थिति का सारांश।"],
    "Attendance summary for this academic year.": ["આ શૈક્ષણિક વર્ષ માટે હાજરીનો સારાંશ.", "इस शैक्षणिक वर्ष के लिए उपस्थिति सारांश।"],
    "Faculty Members": ["શિક્ષક મંડળ", "शिक्षकगण"],
    "Teacher names, subjects and contact numbers": ["શિક્ષકોનાં નામ, વિષયો અને સંપર્ક નંબર", "शिक्षकों के नाम, विषय और संपर्क नंबर"],
    "Demo contact numbers are sample data. Replace them with your school's verified faculty numbers before using this website for real contacts.": ["ડેમો સંપર્ક નંબરો નમૂનાના છે. વાસ્તવિક ઉપયોગ પહેલાં શાળાના ચકાસેલા શિક્ષક નંબરો મૂકો.", "डेमो संपर्क नंबर नमूना हैं। वास्तविक उपयोग से पहले स्कूल के सत्यापित शिक्षक नंबर डालें।"],
    "Save Parent Profile": ["વાલી પ્રોફાઇલ સાચવો", "अभिभावक प्रोफ़ाइल सहेजें"],
    "Save Profile": ["પ્રોફાઇલ સાચવો", "प्रोफ़ाइल सहेजें"],
    "Teacher profile photo": ["શિક્ષકનો પ્રોફાઇલ ફોટો", "शिक्षक की प्रोफ़ाइल फोटो"],
    "Parent profile photo": ["વાલીનો પ્રોફાઇલ ફોટો", "अभिभावक की प्रोफ़ाइल फोटो"],
    "Type a message...": ["સંદેશ લખો...", "संदेश लिखें..."],
    "Send": ["મોકલો", "भेजें"],
    "No meal records saved yet.": ["હજુ ભોજનના રેકોર્ડ સાચવ્યા નથી.", "अभी तक भोजन रिकॉर्ड सहेजे नहीं गए हैं।"],
    "No attendance records found for this period.": ["આ સમયગાળા માટે હાજરીના રેકોર્ડ મળ્યા નથી.", "इस अवधि के लिए उपस्थिति रिकॉर्ड नहीं मिले।"],
    "Please mark attendance before generating a report.": ["અહેવાલ બનાવતા પહેલાં હાજરી નોંધો.", "रिपोर्ट बनाने से पहले उपस्थिति दर्ज करें।"],
    "No students found.": ["કોઈ વિદ્યાર્થી મળ્યો નથી.", "कोई विद्यार्थी नहीं मिला।"],
    "Export data": ["ડેટા નિકાસ કરો", "डेटा निर्यात करें"],
    "Refresh": ["ફરીથી લોડ કરો", "रीफ़्रेश करें"],
    "Edit": ["સંપાદિત કરો", "संपादित करें"],
    "Delete": ["કાઢી નાખો", "हटाएँ"],
    "Update": ["અપડેટ કરો", "अपडेट करें"],
    "Add": ["ઉમેરો", "जोड़ें"],
    "More": ["વધુ", "और"],
    "Less": ["ઓછું", "कम"],
    "View Report": ["અહેવાલ જુઓ", "रिपोर्ट देखें"],
    "Open parent profile": ["વાલી પ્રોફાઇલ ખોલો", "अभिभावक प्रोफ़ाइल खोलें"],
    "Choose an image smaller than 2 MB.": ["2 MB કરતાં નાની છબી પસંદ કરો.", "2 MB से छोटी छवि चुनें।"],
    "Could not load this photo.": ["આ ફોટો લોડ થઈ શક્યો નથી.", "यह फोटो लोड नहीं हो सकी।"],
    "Voice recording is not supported in this browser.": ["આ બ્રાઉઝરમાં અવાજ રેકોર્ડિંગ સપોર્ટ થતું નથી.", "इस ब्राउज़र में वॉइस रिकॉर्डिंग समर्थित नहीं है।"],
    "Microphone access denied or unavailable.": ["માઇક્રોફોનની પરવાનગી નકારી છે અથવા ઉપલબ્ધ નથી.", "माइक्रोफ़ोन की अनुमति नहीं मिली या उपलब्ध नहीं है।"],
    "No voice audio was recorded.": ["કોઈ અવાજ રેકોર્ડ થયો નથી.", "कोई आवाज़ रिकॉर्ड नहीं हुई।"],
    "Voice note is too large. Please record a shorter one.": ["વૉઇસ નોંધ મોટી છે. કૃપા કરીને ટૂંકી નોંધ રેકોર્ડ કરો.", "वॉइस नोट बहुत बड़ा है। कृपया छोटा नोट रिकॉर्ड करें।"],
    "Voice message added to chat.": ["વૉઇસ સંદેશ ચેટમાં ઉમેરાયો.", "वॉइस संदेश चैट में जोड़ दिया गया।"],
    "Could not save the voice message.": ["વૉઇસ સંદેશ સાચવી શકાયો નથી.", "वॉइस संदेश सहेजा नहीं जा सका।"],
    "Recording... Click ⏹️ to finish and send.": ["રેકોર્ડિંગ... પૂરું કરીને મોકલવા ⏹️ દબાવો.", "रिकॉर्डिंग... समाप्त करके भेजने के लिए ⏹️ दबाएँ।"],
    "Please select image files only.": ["કૃપા કરીને માત્ર છબી ફાઇલો પસંદ કરો.", "कृपया केवल इमेज फ़ाइलें चुनें।"],
    "Maximum size is 2 MB.": ["મહત્તમ કદ 2 MB છે.", "अधिकतम आकार 2 MB है।"],
    "Offline mode": ["ઑફલાઇન મોડ", "ऑफ़लाइन मोड"],
    "Today's Overview": ["આજની ઝલક", "आज का अवलोकन"],
    "Record today's attendance": ["આજની હાજરી નોંધો", "आज की उपस्थिति दर्ज करें"],
    "Prepare a report": ["અહેવાલ તૈયાર કરો", "रिपोर्ट तैयार करें"],
    "Contact Number": ["સંપર્ક નંબર", "संपर्क नंबर"],
    "The Head Teacher": ["આચાર્યશ્રી", "प्रधान शिक्षक"],
    "Yours sincerely,": ["આપનો વિશ્વાસુ,", "सादर,"],
    "Key observations and updates": ["મુખ્ય અવલોકનો અને અપડેટ્સ", "मुख्य अवलोकन और अपडेट"],
    "Actions and follow-up": ["કાર્યવાહી અને અનુસરણ", "कार्रवाई और अनुवर्ती कार्य"],
    "Discussion points:": ["ચર્ચાના મુદ્દાઓ:", "चर्चा के बिंदु:"],
    "SCHOOL NOTICE": ["શાળાની સૂચના", "विद्यालय सूचना"],
    "PARENT MESSAGE": ["વાલી માટેનો સંદેશ", "अभिभावक संदेश"],
    "SCHOOL ANNOUNCEMENT": ["શાળાની જાહેરાત", "स्कूल की घोषणा"],
    "MEETING SUMMARY DRAFT": ["બેઠકના સારાંશનો ડ્રાફ્ટ", "बैठक सारांश ड्राफ्ट"],
    "LEAVE APPLICATION DRAFT": ["રજાની અરજીનો ડ્રાફ્ટ", "छुट्टी आवेदन ड्राफ्ट"],
    "ATTENDANCE SUMMARY DRAFT": ["હાજરી સારાંશનો ડ્રાફ્ટ", "उपस्थिति सारांश ड्राफ्ट"]
  });

  Object.assign(UI_TRANSLATIONS, {
    "Recorded absences": ["નોંધાયેલી ગેરહાજરી", "दर्ज अनुपस्थितियाँ"],
    "Tasks to complete": ["પૂર્ણ કરવાના કાર્યો", "पूरे किए जाने वाले कार्य"],
    "Attendance records": ["હાજરીના રેકોર્ડ", "उपस्थिति रिकॉर्ड"],
    "Meals recorded": ["નોંધાયેલ ભોજન", "दर्ज भोजन"],
    "Tasks pending": ["બાકી કાર્યો", "लंबित कार्य"],
    "Record today's attendance": ["આજની હાજરી નોંધો", "आज की उपस्थिति दर्ज करें"],
    "Update meal records": ["ભોજનના રેકોર્ડ અપડેટ કરો", "भोजन रिकॉर्ड अपडेट करें"],
    "Prepare a report": ["અહેવાલ તૈયાર કરો", "रिपोर्ट तैयार करें"],
    "Present Today": ["આજે હાજર", "आज उपस्थित"],
    "Absent Today": ["આજે ગેરહાજર", "आज अनुपस्थित"],
    "Tasks to complete": ["પૂર્ણ કરવાના કાર્યો", "पूरे किए जाने वाले कार्य"],
    "Today's Overview": ["આજની ઝલક", "आज का अवलोकन"],
    "Monthly Attendance": ["માસિક હાજરી", "मासिक उपस्थिति"],
    "Weekly Attendance": ["સાપ્તાહિક હાજરી", "साप्ताहिक उपस्थिति"],
    "Yearly Attendance (June–May)": ["વાર્ષિક હાજરી (જૂન–મે)", "वार्षिक उपस्थिति (जून–मई)"],
    "Select a period and click Preview Report.": ["સમયગાળો પસંદ કરીને અહેવાલ પૂર્વદર્શન પર ક્લિક કરો.", "अवधि चुनकर रिपोर्ट पूर्वावलोकन पर क्लिक करें।"],
    "Preview Report": ["અહેવાલનું પૂર્વદર્શન", "रिपोर्ट पूर्वावलोकन"],
    "Download": ["ડાઉનલોડ કરો", "डाउनलोड करें"],
    "Enter date, time, class and other important details...": ["તારીખ, સમય, વર્ગ અને અન્ય જરૂરી વિગતો દાખલ કરો...", "तारीख, समय, कक्षा और अन्य ज़रूरी विवरण दर्ज करें..."],
    "Please select a valid date range, month or academic year.": ["કૃપા કરીને યોગ્ય તારીખ શ્રેણી, મહિનો અથવા શૈક્ષણિક વર્ષ પસંદ કરો.", "कृपया मान्य तारीख सीमा, महीना या शैक्षणिक वर्ष चुनें।"],
    "Select a period and click Preview Report.": ["સમયગાળો પસંદ કરીને અહેવાલ પૂર્વદર્શન પર ક્લિક કરો.", "अवधि चुनकर रिपोर्ट पूर्वावलोकन पर क्लिक करें।"],
    "PARENT PORTAL": ["વાલી પોર્ટલ", "अभिभावक पोर्टल"],
    "Here are the latest updates for": ["અહીં નવીનતમ માહિતી છે:", "यहाँ नवीनतम अपडेट हैं:"],
    "Student's Information": ["વિદ્યાર્થીની માહિતી", "छात्र की जानकारी"],
    "View your child's details": ["તમારા બાળકની વિગતો જુઓ", "अपने बच्चे का विवरण देखें"],
    "Contact the class teacher": ["વર્ગશિક્ષકનો સંપર્ક કરો", "कक्षा शिक्षक से संपर्क करें"],
    "View this week's meals": ["આ અઠવાડિયાનું ભોજન જુઓ", "इस सप्ताह का भोजन देखें"],
    "Dear Parent, please check the weekly meal menu and contact the class teacher if you have any questions.": ["પ્રિય વાલી, કૃપા કરીને સાપ્તાહિક ભોજન મેનૂ તપાસો અને કોઈ પ્રશ્ન હોય તો વર્ગશિક્ષકનો સંપર્ક કરો.", "प्रिय अभिभावक, कृपया साप्ताहिक भोजन मेनू देखें और कोई प्रश्न हो तो कक्षा शिक्षक से संपर्क करें।"],
    "Demo information for preview only.": ["માત્ર પૂર્વદર્શન માટેની ડેમો માહિતી.", "केवल पूर्वावलोकन के लिए डेमो जानकारी।"],
    "Student details linked to this demo parent account.": ["આ ડેમો વાલી ખાતા સાથે જોડાયેલી વિદ્યાર્થી માહિતી.", "इस डेमो अभिभावक खाते से जुड़ी विद्यार्थी जानकारी।"],
    "Attendance summary for this academic year.": ["આ શૈક્ષણિક વર્ષ માટે હાજરીનો સારાંશ.", "इस शैक्षणिक वर्ष के लिए उपस्थिति सारांश।"],
    "Sample attendance data for demo purposes.": ["ડેમો માટેના નમૂનાના હાજરી ડેટા.", "डेमो के लिए नमूना उपस्थिति डेटा।"],
    "Teacher names, subjects and contact numbers": ["શિક્ષકોનાં નામ, વિષયો અને સંપર્ક નંબર", "शिक्षकों के नाम, विषय और संपर्क नंबर"],
    "Same weekly menu for teachers and parents.": ["શિક્ષકો અને વાલીઓ માટે એક જ સાપ્તાહિક મેનૂ.", "शिक्षकों और अभिभावकों के लिए एक ही साप्ताहिक मेनू।"],
    "Demo mode · Messages are stored in this browser only.": ["ડેમો મોડ · સંદેશા ફક્ત આ બ્રાઉઝરમાં સંગ્રહિત થાય છે.", "डेमो मोड · संदेश केवल इसी ब्राउज़र में संग्रहीत होते हैं।"],
    "Type a message...": ["સંદેશ લખો...", "संदेश लिखें..."],
    "Email ID": ["ઈમેલ ID", "ईमेल ID"],
    "Contact Number": ["સંપર્ક નંબર", "संपर्क नंबर"],
    "Subject name": ["વિષયનું નામ", "विषय का नाम"],
    "Maximum marks": ["મહત્તમ ગુણ", "अधिकतम अंक"],
    "Remove a subject:": ["વિષય દૂર કરો:", "एक विषय हटाएँ:"],
    "Marks Entry & Student Results": ["ગુણની નોંધણી અને વિદ્યાર્થી પરિણામો", "अंक प्रविष्टि और विद्यार्थी परिणाम"],
    "Manage Subjects": ["વિષયોનું સંચાલન કરો", "विषयों का प्रबंधन करें"],
    "Add subjects and maximum marks. Data is stored in this browser.": ["વિષયો અને મહત્તમ ગુણ ઉમેરો. ડેટા આ બ્રાઉઝરમાં સાચવાય છે.", "विषय और अधिकतम अंक जोड़ें। डेटा इसी ब्राउज़र में सहेजा जाता है।"],
    "Enter marks, save your changes and review the updated results. Only complete reports are eligible for top-three highlights.": ["ગુણ દાખલ કરો, ફેરફારો સાચવો અને અપડેટ થયેલા પરિણામો તપાસો. ફક્ત સંપૂર્ણ અહેવાલો જ ટોચના ત્રણમાં દર્શાવાશે.", "अंक दर्ज करें, बदलाव सहेजें और अपडेट परिणाम देखें। केवल पूर्ण रिपोर्ट ही शीर्ष तीन में शामिल होंगी।"],
    "Save Marks & Update Results": ["ગુણ સાચવો અને પરિણામ અપડેટ કરો", "अंक सहेजें और परिणाम अपडेट करें"],
    "Students in class": ["વર્ગમાં વિદ્યાર્થીઓ", "कक्षा में विद्यार्थी"],
    "Completed reports": ["પૂર્ણ થયેલા અહેવાલો", "पूरी हुई रिपोर्टें"],
    "Class average": ["વર્ગની સરેરાશ", "कक्षा का औसत"],
    "Student": ["વિદ્યાર્થી", "विद्यार्थी"],
    "Total": ["કુલ", "कुल"],
    "Percentage": ["ટકાવારી", "प्रतिशत"],
    "Tap the camera icon to change your photo.": ["ફોટો બદલવા કેમેરા ચિહ્ન દબાવો.", "फोटो बदलने के लिए कैमरा आइकन दबाएँ।"],
    "Parent / Guardian": ["વાલી / સંરક્ષક", "अभिभावक / संरक्षक"],
    "The school announces the following update:": ["શાળા નીચેની જાણ કરે છે:", "स्कूल निम्नलिखित सूचना जारी करता है:"],
    "Please follow the relevant arrangements.": ["કૃપા કરીને સંબંધિત વ્યવસ્થાનું પાલન કરો.", "कृपया संबंधित व्यवस्था का पालन करें।"],
    "Thank you.": ["આભાર.", "धन्यवाद।"],
    "Respected Sir/Madam,": ["માનનીય સાહેબ/મેડમ,", "आदरणीय महोदय/महोदया,"],
    "Yours sincerely,": ["આપનો વિશ્વાસુ,", "सादर,"],
    "Please confirm action items with participants.": ["કૃપા કરીને સહભાગીઓ સાથે કાર્ય મુદ્દાઓની પુષ્ટિ કરો.", "कृपया प्रतिभागियों के साथ कार्य बिंदुओं की पुष्टि करें।"],
    "Please bring the student ID card.": ["કૃપા કરીને વિદ્યાર્થીનું ID કાર્ડ લાવશો.", "कृपया विद्यार्थी का ID कार्ड लाएँ।"],
    "Please bring the student's ID card.": ["કૃપા કરીને વિદ્યાર્થીનું ID કાર્ડ લાવશો.", "कृपया विद्यार्थी का ID कार्ड लाएँ।"],
    "Please come on time.": ["કૃપા કરીને સમયસર આવશો.", "कृपया समय पर आएँ।"],
    "School will remain closed tomorrow.": ["શાળા આવતીકાલે બંધ રહેશે.", "स्कूल कल बंद रहेगा।"],
    "School will remain closed on Monday.": ["સોમવારે શાળા બંધ રહેશે.", "सोमवार को स्कूल बंद रहेगा।"],
    "Please contact the class teacher if you have any questions.": ["કોઈ પ્રશ્ન હોય તો કૃપા કરીને વર્ગશિક્ષકનો સંપર્ક કરો.", "कोई प्रश्न हो तो कृपया कक्षा शिक्षक से संपर्क करें।"],
    "Kindly attend the meeting.": ["કૃપા કરીને બેઠકમાં હાજર રહેશો.", "कृपया बैठक में उपस्थित रहें।"],
    "Bring books and notebooks.": ["પુસ્તકો અને નોટબુક લાવશો.", "किताबें और नोटबुक लाएँ।"],
    "Students should arrive by 9 AM.": ["વિદ્યાર્થીઓએ સવારે 9 વાગ્યા સુધીમાં પહોંચવું.", "विद्यार्थियों को सुबह 9 बजे तक पहुँच जाना चाहिए।"],
    "Submit homework by Friday.": ["શુક્રવાર સુધીમાં ગૃહકાર્ય જમા કરાવો.", "शुक्रवार तक गृहकार्य जमा करें।"],
    "The meeting will be held on Monday at 10 AM.": ["બેઠક સોમવારે સવારે 10 વાગ્યે યોજાશે.", "बैठक सोमवार को सुबह 10 बजे होगी।"],
    "Parent-teacher meeting at 10 AM.": ["વાલી-શિક્ષક બેઠક સવારે 10 વાગ્યે.", "अभिभावक-शिक्षक बैठक सुबह 10 बजे।"],
    "School cleanliness drive on Friday.": ["શુક્રવારે શાળામાં સ્વચ્છતા અભિયાન.", "शुक्रवार को स्कूल में स्वच्छता अभियान।"]
  });

  Object.assign(UI_TRANSLATIONS, {
    "My Classes": ["મારા વર્ગો", "मेरी कक्षाएँ"],
    "Your child's information": ["તમારા બાળકની માહિતી", "आपके बच्चे की जानकारी"],
    "Your child's attendance summary": ["તમારા બાળકની હાજરીનો સારાંશ", "आपके बच्चे की उपस्थिति का सारांश"],
    "Parent's Contact": ["વાલીનો સંપર્ક", "अभिभावक का संपर्क"],
    "e.g. TCH0001": ["દા.ત. TCH0001", "जैसे TCH0001"],
    "Enter Teacher ID": ["શિક્ષક ID દાખલ કરો", "शिक्षक ID दर्ज करें"],
    "Enter Parent ID": ["વાલી ID દાખલ કરો", "अभिभावक ID दर्ज करें"],
    "e.g. B.Ed., M.A.": ["દા.ત. B.Ed., M.A.", "जैसे B.Ed., M.A."],
    "e.g. 5 years": ["દા.ત. 5 વર્ષ", "जैसे 5 वर्ष"],
    "e.g. Examination Coordinator": ["દા.ત. પરીક્ષા સંયોજક", "जैसे परीक्षा समन्वयक"],
    "Enter your password or PIN": ["તમારો પાસવર્ડ અથવા PIN દાખલ કરો", "अपना पासवर्ड या PIN दर्ज करें"],
    "Parent-teacher meeting": ["વાલી-શિક્ષક બેઠક", "अभिभावक-शिक्षक बैठक"],
    "Please bring the student ID card.": ["કૃપા કરીને વિદ્યાર્થીનું ID કાર્ડ લાવશો.", "कृपया विद्यार्थी का ID कार्ड लाएँ।"]
  });

  Object.assign(UI_TRANSLATIONS, {
    "Holiday List": ["રજાઓની યાદી", "छुट्टियों की सूची"],
    "Student Holiday List": ["વિદ્યાર્થી રજાઓની યાદી", "विद्यार्थी छुट्टियों की सूची"],
    "Government School": ["સરકારી શાળા", "सरकारी स्कूल"],
    "Academic Year 2026 - 27": ["શૈક્ષણિક વર્ષ ૨૦૨૬ - ૨૭", "शैक्षणिक वर्ष २०२६ - २७"],
    "Holiday Calendar": ["રજાઓનું કેલેન્ડર", "छुट्टियों का कैलेंडर"],
    "School Holidays": ["શાળાની રજાઓ", "स्कूल की छुट्टियाँ"],
    "Festivals, national holidays and vacation dates": ["તહેવારો, રાષ્ટ્રીય રજાઓ અને વેકેશનની તારીખો", "त्योहार, राष्ट्रीय छुट्टियाँ और अवकाश की तारीखें"],
    "Month": ["મહિનો", "महीना"],
    "Date / Date Range": ["તારીખ / તારીખની શ્રેણી", "तारीख / तारीख की अवधि"],
    "Holiday Name": ["રજાનું નામ", "छुट्टी का नाम"],
    "Type": ["પ્રકાર", "प्रकार"],
    "Religious": ["ધાર્મિક", "धार्मिक"],
    "Festival": ["તહેવાર", "त्योहार"],
    "National": ["રાષ્ટ્રીય", "राष्ट्रीय"],
    "Vacation": ["વેકેશન", "अवकाश"],
    "Bakri Eid": ["બકરી ઈદ", "बकरी ईद"],
    "Rath Yatra": ["રથયાત્રા", "रथ यात्रा"],
    "Id-ul-Zuha (Bakrid)": ["ઈદ-ઉલ-ઝુહા (બકરીદ)", "ईद-उल-जुहा (बकरीद)"],
    "Independence Day": ["સ્વતંત્રતા દિવસ", "स्वतंत्रता दिवस"],
    "Raksha Bandhan": ["રક્ષાબંધન", "रक्षाबंधन"],
    "Janmashtami": ["જન્માષ્ટમી", "जन्माष्टमी"],
    "Gandhi Jayanti": ["ગાંધી જયંતિ", "गांधी जयंती"],
    "Diwali (Holiday begins)": ["દિવાળી (રજાની શરૂઆત)", "दिवाली (छुट्टी शुरू)"],
    "Diwali Vacation Starts": ["દિવાળી વેકેશન શરૂ", "दिवाली की छुट्टियाँ शुरू"],
    "Diwali Vacation Ends": ["દિવાળી વેકેશન પૂર્ણ", "दिवाली की छुट्टियाँ समाप्त"],
    "Christmas": ["ક્રિસમસ", "क्रिसमस"],
    "Republic Day": ["પ્રજાસત્તાક દિવસ", "गणतंत्र दिवस"],
    "Maha Shivratri": ["મહાશિવરાત્રી", "महाशिवरात्रि"],
    "Holi": ["હોળી", "होली"],
    "Good Friday": ["ગુડ ફ્રાઇડે", "गुड फ्राइडे"],
    "Summer Vacation Starts": ["ઉનાળુ વેકેશન શરૂ", "गर्मी की छुट्टियाँ शुरू"],
    "Summer Vacation Ends": ["ઉનાળુ વેકેશન પૂર્ણ", "गर्मी की छुट्टियाँ समाप्त"],
    "June 2026": ["જૂન ૨૦૨૬", "जून २०२६"],
    "July 2026": ["જુલાઈ ૨૦૨૬", "जुलाई २०२६"],
    "August 2026": ["ઑગસ્ટ ૨૦૨૬", "अगस्त २०२६"],
    "September 2026": ["સપ્ટેમ્બર ૨૦૨૬", "सितंबर २०२६"],
    "October 2026": ["ઑક્ટોબર ૨૦૨૬", "अक्टूबर २०२६"],
    "November 2026": ["નવેમ્બર ૨૦૨૬", "नवंबर २०२६"],
    "December 2026": ["ડિસેમ્બર ૨૦૨૬", "दिसंबर २०२६"],
    "January 2027": ["જાન્યુઆરી ૨૦૨૭", "जनवरी २०२७"],
    "February 2027": ["ફેબ્રુઆરી ૨૦૨૭", "फ़रवरी २०२७"],
    "March 2027": ["માર્ચ ૨૦૨૭", "मार्च २०२७"],
    "April 2027": ["એપ્રિલ ૨૦૨૭", "अप्रैल २०२७"],
    "May 2027": ["મે ૨૦૨૭", "मई २०२७"],
    "Dates are shown as provided in the sample holiday schedule.": ["તારીખો મોકલેલી નમૂના રજા-યાદી મુજબ દર્શાવવામાં આવી છે.", "तारीखें दिए गए नमूना छुट्टी कार्यक्रम के अनुसार दिखाई गई हैं।"]
  });


  // Additional Gujarati/Hindi terminology for dynamic labels, dates, sample
  // records and common phrases that previously appeared in English.
  Object.assign(UI_TRANSLATIONS, {
    "Government Primary School": ["સરકારી પ્રાથમિક શાળા", "सरकारी प्राथमिक विद्यालय"],
    "Government Primary": ["સરકારી પ્રાથમિક", "सरकारी प्राथमिक"],
    "Primary Teacher": ["પ્રાથમિક શિક્ષક", "प्राथमिक शिक्षक"],
    "Primary": ["પ્રાથમિક", "प्राथमिक"],
    "Mathematics": ["ગણિત", "गणित"],
    "Science": ["વિજ્ઞાન", "विज्ञान"],
    "English": ["અંગ્રેજી", "अंग्रेज़ी"],
    "Class 5A": ["ધોરણ ૫-અ", "कक्षा ५-अ"],
    "Class 4B": ["ધોરણ ૪-બ", "कक्षा ४-ब"],
    "Class 3A": ["ધોરણ ૩-અ", "कक्षा ३-अ"],
    "5A": ["ધોરણ ૫-અ", "कक्षा ५-अ"],
    "4B": ["ધોરણ ૪-બ", "कक्षा ४-ब"],
    "3A": ["ધોરણ ૩-અ", "कक्षा ३-अ"],
    "ID": ["ઓળખ નંબર", "पहचान संख्या"],
    "id": ["ઓળખ નંબર", "पहचान संख्या"],
    "October": ["ઑક્ટોબર", "अक्टूबर"],
    "October 2026": ["ઑક્ટોબર ૨૦૨૬", "अक्टूबर २०२६"],
    "January": ["જાન્યુઆરી", "जनवरी"],
    "February": ["ફેબ્રુઆરી", "फ़रवरी"],
    "March": ["માર્ચ", "मार्च"],
    "April": ["એપ્રિલ", "अप्रैल"],
    "May": ["મે", "मई"],
    "June": ["જૂન", "जून"],
    "July": ["જુલાઈ", "जुलाई"],
    "August": ["ઑગસ્ટ", "अगस्त"],
    "September": ["સપ્ટેમ્બર", "सितंबर"],
    "November": ["નવેમ્બર", "नवंबर"],
    "December": ["ડિસેમ્બર", "दिसंबर"],
    "Hi": ["નમસ્તે", "नमस्ते"],
    "hi": ["નમસ્તે", "नमस्ते"],
    "Hello": ["નમસ્તે", "नमस्ते"],
    "How are you": ["તમે કેમ છો?", "आप कैसे हैं?"],
    "How are you?": ["તમે કેમ છો?", "आप कैसे हैं?"],
    "I am fine": ["હું મજામાં છું.", "मैं ठीक हूँ।"],
    "I am fine.": ["હું મજામાં છું.", "मैं ठीक हूँ।"],
    "Good morning": ["સુપ્રભાત", "सुप्रभात"],
    "Good afternoon": ["શુભ બપોર", "नमस्कार"],
    "Good evening": ["શુભ સાંજ", "शुभ संध्या"],
    "Good night": ["શુભ રાત્રિ", "शुभ रात्रि"],
    "Yes": ["હા", "हाँ"],
    "No": ["ના", "नहीं"],
    "Name": ["નામ", "नाम"],
    "School": ["શાળા", "विद्यालय"],
    "Teacher": ["શિક્ષક", "शिक्षक"],
    "Student": ["વિદ્યાર્થી", "विद्यार्थी"],
    "Parent": ["વાલી", "अभिभावक"],
    "Class": ["ધોરણ", "कक्षा"],
    "Subject": ["વિષય", "विषय"],
    "Roll No.": ["ક્રમ નંબર", "अनुक्रमांक"],
    "Password": ["પાસવર્ડ", "पासवर्ड"],
    "PIN": ["પિન", "पिन"],
    "Save": ["સાચવો", "सहेजें"],
    "Cancel": ["રદ કરો", "रद्द करें"],
    "Submit": ["સબમિટ કરો", "जमा करें"],
    "Search": ["શોધો", "खोजें"],
    "Today": ["આજે", "आज"],
    "Tomorrow": ["આવતીકાલે", "कल"],
    "Yesterday": ["ગઈકાલે", "कल"],
    "Not Marked": ["નોંધ્યું નથી", "दर्ज नहीं"],
    "Present": ["હાજર", "उपस्थित"],
    "Absent": ["ગેરહાજર", "अनुपस्थित"],
    "Served": ["ભોજન મળ્યું", "भोजन मिला"],
    "Not Served": ["ભોજન મળ્યું નથી", "भोजन नहीं मिला"],
    "Save Meal Record": ["ભોજનનો રેકોર્ડ સાચવો", "भोजन रिकॉर्ड सहेजें"],
    "Download Meal Report PDF": ["ભોજનનો અહેવાલ PDF ડાઉનલોડ કરો", "भोजन रिपोर्ट PDF डाउनलोड करें"],
    "Complete meal record": ["ભોજનનો રેકોર્ડ પૂર્ણ કરો", "भोजन रिकॉर्ड पूरा करें"],
    "Complete today's Midday Meal Record": ["આજનો મધ્યાહ્ન ભોજનનો રેકોર્ડ પૂર્ણ કરો", "आज का मध्याह्न भोजन रिकॉर्ड पूरा करें"],
    "Today's Midday Meal Record": ["આજનો મધ્યાહ્ન ભોજનનો રેકોર્ડ", "आज का मध्याह्न भोजन रिकॉर्ड"],
    "No School Notices Have Been Published Yet.": ["હજુ સુધી શાળાની કોઈ સૂચના પ્રકાશિત થઈ નથી.", "अभी तक स्कूल की कोई सूचना प्रकाशित नहीं हुई है।"],
    "Notices Published By The Teacher Will Appear Here.": ["શિક્ષક દ્વારા પ્રકાશિત સૂચનાઓ અહીં દેખાશે.", "शिक्षक द्वारा प्रकाशित सूचनाएँ यहाँ दिखाई देंगी।"],
    "No School Notices Have Been Published Yet": ["હજુ સુધી શાળાની કોઈ સૂચના પ્રકાશિત થઈ નથી", "अभी तक स्कूल की कोई सूचना प्रकाशित नहीं हुई है"],
    "Notices Published By The Teacher Will Appear Here": ["શિક્ષક દ્વારા પ્રકાશિત સૂચનાઓ અહીં દેખાશે", "शिक्षक द्वारा प्रकाशित सूचनाएँ यहाँ दिखाई देंगी"],
    "No Notices": ["કોઈ સૂચના નથી", "कोई सूचना नहीं"],
    "0 Notices": ["૦ સૂચનાઓ", "० सूचनाएँ"],
    "Teacher Group Chat": ["શિક્ષકોના જૂથની ચેટ", "शिक्षक समूह चैट"],
    "Share messages, photos and voice notes": ["સંદેશા, ફોટા અને અવાજની નોંધો મોકલો", "संदेश, फोटो और वॉइस नोट भेजें"],
    "Type a message...": ["સંદેશ લખો...", "संदेश लिखें..."],
    "Clear chat": ["ચેટ સાફ કરો", "चैट साफ़ करें"],
    "More options": ["વધુ વિકલ્પો", "अन्य विकल्प"],
    "Copy": ["નકલ કરો", "कॉपी करें"],
    "Edit": ["સંપાદિત કરો", "संपादित करें"],
    "Delete": ["કાઢી નાખો", "हटाएँ"],
    "Delete for me": ["મારા માટે કાઢી નાખો", "मेरे लिए हटाएँ"],
    "Delete for everyone": ["બધા માટે કાઢી નાખો", "सबके लिए हटाएँ"],
    "Select a message to see message actions.": ["સંદેશના વિકલ્પો જોવા માટે સંદેશ પસંદ કરો.", "संदेश के विकल्प देखने के लिए संदेश चुनें।"],
    "Message selected": ["સંદેશ પસંદ કર્યો", "संदेश चुना गया"],
    "Copy message text?": ["સંદેશનું લખાણ નકલ કરવું છે?", "संदेश का पाठ कॉपी करना है?"],
    "Delete this message for you only?": ["આ સંદેશ ફક્ત તમારી ચેટમાંથી કાઢી નાખવો છે?", "यह संदेश केवल आपकी चैट से हटाना है?"],
    "Delete this message for everyone?": ["આ સંદેશ દરેકની ચેટમાંથી કાઢી નાખવો છે?", "यह संदेश सभी की चैट से हटाना है?"],
    "Message copied.": ["સંદેશની નકલ થઈ.", "संदेश कॉपी हो गया।"],
    "Could not copy the message.": ["સંદેશની નકલ થઈ શકી નહીં.", "संदेश कॉपी नहीं हो सका।"],
    "Message deleted for you.": ["સંદેશ તમારી ચેટમાંથી કાઢી નાખ્યો.", "संदेश आपकी चैट से हटा दिया गया।"],
    "Message deleted for everyone.": ["સંદેશ દરેકની ચેટમાંથી કાઢી નાખ્યો.", "संदेश सभी की चैट से हटा दिया गया।"],
    "Only your own messages can be deleted for everyone.": ["ફક્ત તમારા પોતાના સંદેશા જ બધા માટે કાઢી શકાય છે.", "केवल आपके अपने संदेश ही सभी के लिए हटाए जा सकते हैं।"],
    "No messages yet. Start a conversation!": ["હજુ કોઈ સંદેશ નથી. વાતચીત શરૂ કરો!", "अभी कोई संदेश नहीं है। बातचीत शुरू करें!"],
    "Welcome to the ShikshaSetu teacher group!": ["શિક્ષા સેતુ શિક્ષક જૂથમાં સ્વાગત છે!", "शिक्षा सेतु शिक्षक समूह में आपका स्वागत है!"],
    "Janki": ["જાનકી", "जानकी"],
    "Zeel": ["ઝીલ", "ज़ील"],
    "Drashti": ["દ્રષ્ટિ", "दृष्टि"],
    "Janki's Parent": ["જાનકીના વાલી", "जानकी के अभिभावक"],
    "Zeel's Parent": ["ઝીલના વાલી", "ज़ील के अभिभावक"],
    "Drashti's Parent": ["દ્રષ્ટિના વાલી", "दृष्टि के अभिभावक"],
    "Aarav Patel's Parent": ["આરવ પટેલના વાલી", "आरव पटेल के अभिभावक"],
    "Diya Shah's Parent": ["દિયા શાહના વાલી", "दिया शाह के अभिभावक"],
    "Krishna Joshi's Parent": ["કૃષ્ણા જોશીના વાલી", "कृष्णा जोशी के अभिभावक"],
    "Ananya Desai's Parent": ["અનન્યા દેસાઈના વાલી", "अनन्या देसाई के अभिभावक"],
    "School Coordinator": ["શાળા સંયોજક", "स्कूल समन्वयक"],
    "Welcome To The ShikshaSetu Teacher Group!": ["શિક્ષા સેતુ શિક્ષક જૂથમાં સ્વાગત છે!", "शिक्षा सेतु शिक्षक समूह में आपका स्वागत है!"],
    "No pending tasks or unread messages.": ["કોઈ બાકી કાર્ય કે ન વાંચેલો સંદેશ નથી.", "कोई लंबित कार्य या अपठित संदेश नहीं है।"],
    "Clear all messages in this chat?": ["શું આ ચેટના બધા સંદેશા સાફ કરવા છે?", "क्या इस चैट के सभी संदेश साफ़ करने हैं?"],
    "Chat cleared.": ["ચેટ સાફ થઈ ગઈ.", "चैट साफ़ हो गई।"],
    "Edit message": ["સંદેશ સંપાદિત કરો", "संदेश संपादित करें"],
    "Message cannot be empty.": ["સંદેશ ખાલી ન હોઈ શકે.", "संदेश खाली नहीं हो सकता।"],
    "Delete this message?": ["શું આ સંદેશ કાઢી નાખવો છે?", "क्या यह संदेश हटाना है?"],
    "Edited": ["સંપાદિત", "संपादित"],
    "Complete today's attendance": ["આજની હાજરી પૂર્ણ કરો", "आज की उपस्थिति पूरी करें"],
    "Student's Information": ["વિદ્યાર્થીની માહિતી", "विद्यार्थी की जानकारी"],
    "Your child's information": ["તમારા બાળકની માહિતી", "आपके बच्चे की जानकारी"],
    "Father's and mother's contact information": ["પિતા અને માતાની સંપર્ક માહિતી", "पिता और माता की संपर्क जानकारी"],
    "Contact your child's teacher": ["તમારા બાળકના શિક્ષકનો સંપર્ક કરો", "अपने बच्चे के शिक्षक से संपर्क करें"],
    "your child's class teacher": ["તમારા બાળકના વર્ગશિક્ષક", "आपके बच्चे के कक्षा शिक्षक"]
  });

  Object.assign(UI_TRANSLATIONS, {
    "Parent Call Language": ["વાલી કૉલની ભાષા", "अभिभावक कॉल की भाषा"],
    "Automated calls for absent students": ["ગેરહાજર વિદ્યાર્થીઓ માટે સ્વચાલિત કૉલ", "अनुपस्थित विद्यार्थियों के लिए स्वचालित कॉल"],
    "English": ["અંગ્રેજી", "अंग्रेज़ी"],
    "Gujarati": ["ગુજરાતી", "गुजराती"],
    "Hindi": ["હિન્દી", "हिंदी"],
    "Parents must have consented to automated calls.": ["વાલીઓએ સ્વચાલિત કૉલ માટે સંમતિ આપી હોવી જરૂરી છે.", "अभिभावकों ने स्वचालित कॉल के लिए सहमति दी होनी चाहिए।"],
    "Retry failed calls": ["નિષ્ફળ કૉલ ફરી કરો", "असफल कॉल फिर से करें"],
    "Queued": ["કતારમાં", "कतार में"],
    "Ringing": ["રિંગ થઈ રહ્યું છે", "रिंग हो रही है"],
    "Answered": ["જવાબ આપ્યો", "जवाब दिया"],
    "Completed": ["પૂર્ણ", "पूरा हुआ"],
    "No answer": ["જવાબ મળ્યો નથી", "जवाब नहीं मिला"],
    "Busy": ["વ્યસ્ત", "व्यस्त"],
    "Failed": ["નિષ્ફળ", "असफल"],
    "No mobile number": ["મોબાઇલ નંબર નથી", "मोबाइल नंबर नहीं है"],
    "Call not sent": ["કૉલ મોકલાયો નથી", "कॉल नहीं की गई"]
  });

  const UI_TRANSLATIONS_BY_LOWER = new Map(
    Object.entries(UI_TRANSLATIONS).map(([key, value]) => [key.toLocaleLowerCase(), value])
  );
  const PHRASE_TRANSLATIONS = Object.entries(UI_TRANSLATIONS)
    .filter(([key]) => key.trim().includes(" ") || key.length >= 10)
    .sort((a, b) => b[0].length - a[0].length);
  const WORD_BOUNDARY_TRANSLATIONS = Object.entries(UI_TRANSLATIONS)
    .filter(([key, value]) => !key.trim().includes(" ") && key.length >= 3 && value[0] !== "" && value[1] !== "")
    .sort((a, b) => b[0].length - a[0].length);
  const LANGUAGE_LOCALES = { en: "en-IN", gu: "gu-IN", hi: "hi-IN" };
  let languageObserver = null;
  let selectedChatMessageId = null;
  let chatMenuOpen = false;

  function getChatUserKey() {
    if (!state.teacher) return `${state.userType || "guest"}:guest`;
    return `${state.userType || "teacher"}:${state.teacher.id || state.teacher.name || "user"}`;
  }

  function isMessageVisibleToCurrentUser(message) {
    if (!message) return false;
    const userKey = getChatUserKey();
    if (Array.isArray(message.hiddenFor) && message.hiddenFor.includes(userKey)) return false;
    const clearedValue = state.chatClearedAtByUser?.[userKey];
    if (clearedValue !== undefined && clearedValue !== null) {
      return Number(message.createdAt || 0) > Number(clearedValue);
    }
    return true;
  }

  function isCurrentUserMessage(message) {
    if (!message || !state.teacher) return false;
    if (message.senderId) {
      return message.senderId === state.teacher.id && (!message.senderType || message.senderType === state.userType);
    }
    return message.sender === state.teacher.name;
  }

  // Rule-based Latin -> Devanagari/Gujarati transliteration for names and places.
  // Gujarati letters sit exactly 0x180 above their Devanagari twins.
  function transliterateWord(word, language) {
    const lower = word.toLowerCase();
    const C = {
      ksh: "\u0915\u094d\u0937", chh: "\u091b", kh: "\u0916", gh: "\u0918", ch: "\u091a", jh: "\u091d", th: "\u0925", dh: "\u0927", ph: "\u092b", bh: "\u092d", sh: "\u0936",
      k: "\u0915", g: "\u0917", c: "\u0915", j: "\u091c", t: "\u0924", d: "\u0926", n: "\u0928", p: "\u092a", f: "\u092b", b: "\u092c", m: "\u092e", y: "\u092f", r: "\u0930", l: "\u0932", v: "\u0935", w: "\u0935", s: "\u0938", h: "\u0939", z: "\u091d", q: "\u0915", x: "\u0915\u094d\u0938"
    };
    const V = {
      aa: ["\u0906", "\u093e"], ai: ["\u0910", "\u0948"], au: ["\u0914", "\u094c"], ee: ["\u0908", "\u0940"], ii: ["\u0908", "\u0940"], oo: ["\u090a", "\u0942"], uu: ["\u090a", "\u0942"],
      a: ["\u0905", ""], i: ["\u0907", "\u093f"], e: ["\u090f", "\u0947"], o: ["\u0913", "\u094b"], u: ["\u0909", "\u0941"]
    };
    const isVowelAt = i => "aeiou".includes(lower[i] || "#");
    const matchC = i => { for (const len of [3, 2, 1]) { const k = lower.substr(i, len); if (k.length === len && C[k]) return [C[k], len]; } return null; };
    const matchV = i => { for (const len of [2, 1]) { const k = lower.substr(i, len); if (k.length === len && V[k]) return [k, len]; } return null; };
    let out = "", i = 0, afterConsonant = false;
    while (i < lower.length) {
      const v = matchV(i);
      if (v) {
        let [key, len] = v;
        let [indep, matra] = V[key];
        if (key === "i" && i === lower.length - 1 && lower.length > 2) indep = "\u0908", matra = "\u0940";
        if (key === "a") {
          // single "a": long vowel sign in open syllables / before a final consonant
          const c1 = matchC(i + 1);
          const afterC = c1 ? i + 1 + c1[1] : -1;
          if (!c1 && i === lower.length - 1) matra = "\u093e", indep = "\u0906";
          else if (c1 && (afterC >= lower.length || isVowelAt(afterC))) matra = "\u093e", indep = "\u0906";
        }
        out += afterConsonant ? matra : indep;
        afterConsonant = false; i += len; continue;
      }
      const c = matchC(i);
      if (c) {
        if (afterConsonant) out += "\u094d";
        out += c[0]; afterConsonant = true; i += c[1]; continue;
      }
      out += word[i]; afterConsonant = false; i++;
    }
    if (language === "gu") out = out.replace(/[\u0900-\u097f]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x180));
    return out;
  }

  function translatePlainText(value, language = state.language || "en") {
    const source = String(value ?? "");
    if (language === "en" || !source.trim()) return source;
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    const trimmed = source.slice(leading.length, source.length - trailing.length || source.length);
    const exactEntry = UI_TRANSLATIONS_BY_LOWER.get(trimmed.toLocaleLowerCase());
    if (exactEntry) {
      const localized = exactEntry[language === "gu" ? 0 : 1];
      return leading + localized + trailing;
    }

    let result = trimmed;
    for (const [english, localizations] of PHRASE_TRANSLATIONS) {
      const localized = localizations[language === "gu" ? 0 : 1];
      if (localized === undefined) continue;
      const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(^|[^A-Za-z0-9])${escaped}(?=$|[^A-Za-z0-9])`, "gi");
      result = result.replace(pattern, (_match, before) => before + localized);
    }
    for (const [english, localizations] of WORD_BOUNDARY_TRANSLATIONS) {
      const localized = localizations[language === "gu" ? 0 : 1];
      const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(^|[^A-Za-z0-9])${escaped}(?=$|[^A-Za-z0-9])`, "gi");
      result = result.replace(pattern, (_match, before) => before + localized);
    }
    const names = {
      "Priya Sharma": ["પ્રિયા શર્મા", "प्रिया शर्मा"], "Rahul Patel": ["રાહુલ પટેલ", "राहुल पटेल"],
      "Fatima Shaikh": ["ફાતિમા શેખ", "फ़ातिमा शेख"], "Aarav Patel": ["આરવ પટેલ", "आरव पटेल"],
      "Diya Shah": ["દિયા શાહ", "दिया शाह"], "Krishna Joshi": ["કૃષ્ણા જોશી", "कृष्णा जोशी"],
      "Ananya Desai": ["અનન્યા દેસાઈ", "अनन्या देसाई"], "Vivaan Mehta": ["વિવાન મહેતા", "विवान मेहता"],
      "Ishita Parmar": ["ઇશિતા પરમાર", "इशिता परमार"], "Arjun Patel": ["અર્જુન પટેલ", "अर्जुन पटेल"],
      "Sara Khan": ["સારા ખાન", "सारा खान"], "Reyansh Shah": ["રેયાંશ શાહ", "रेयांश शाह"],
      "Mira Joshi": ["મીરા જોશી", "मीरा जोशी"], "Kabir Desai": ["કબીર દેસાઈ", "कबीर देसाई"],
      "Riya Patel": ["રિયા પટેલ", "रिया पटेल"], "Zoya Shaikh": ["ઝોયા શેખ", "ज़ोया शेख"], "Dev Shah": ["દેવ શાહ", "देव शाह"]
    };
    // Extra demo names (parents, children) and places.
    Object.assign(names, {
      "Rakesh Patel": ["\u0ab0\u0abe\u0a95\u0ac7\u0ab6 \u0aaa\u0a9f\u0ac7\u0ab2", "\u0930\u093e\u0915\u0947\u0936 \u092a\u091f\u0947\u0932"],
      "Nisha Patel": ["\u0aa8\u0abf\u0ab6\u0abe \u0aaa\u0a9f\u0ac7\u0ab2", "\u0928\u093f\u0936\u093e \u092a\u091f\u0947\u0932"],
      "Kirit Shah": ["\u0a95\u0abf\u0ab0\u0ac0\u0a9f \u0ab6\u0abe\u0ab9", "\u0915\u093f\u0930\u0940\u091f \u0936\u093e\u0939"],
      "Minal Shah": ["\u0aae\u0ac0\u0aa8\u0ab2 \u0ab6\u0abe\u0ab9", "\u092e\u0940\u0928\u0932 \u0936\u093e\u0939"],
      "Mahesh Joshi": ["\u0aae\u0ab9\u0ac7\u0ab6 \u0a9c\u0acb\u0ab6\u0ac0", "\u092e\u0939\u0947\u0936 \u091c\u094b\u0936\u0940"],
      "Kavita Joshi": ["\u0a95\u0ab5\u0abf\u0aa4\u0abe \u0a9c\u0acb\u0ab6\u0ac0", "\u0915\u0935\u093f\u0924\u093e \u091c\u094b\u0936\u0940"],
      "Sanjay Desai": ["\u0ab8\u0a82\u0a9c\u0aaf \u0aa6\u0ac7\u0ab8\u0abe\u0a88", "\u0938\u0902\u091c\u092f \u0926\u0947\u0938\u093e\u0908"],
      "Pooja Desai": ["\u0aaa\u0ac2\u0a9c\u0abe \u0aa6\u0ac7\u0ab8\u0abe\u0a88", "\u092a\u0942\u091c\u093e \u0926\u0947\u0938\u093e\u0908"],
      "Janki": ["\u0a9c\u0abe\u0aa8\u0a95\u0ac0", "\u091c\u093e\u0928\u0915\u0940"],
      "Zeel": ["\u0a9d\u0ac0\u0ab2", "\u091d\u0940\u0932"],
      "Drashti": ["\u0aa6\u0acd\u0ab0\u0ab7\u0acd\u0a9f\u0abf", "\u0926\u0943\u0937\u094d\u091f\u093f"],
      "Petlad": ["\u0aaa\u0ac7\u0a9f\u0ab2\u0abe\u0aa6", "\u092a\u0947\u091f\u0932\u093e\u0926"],
      "Anand": ["\u0a86\u0aa3\u0a82\u0aa6", "\u0906\u0928\u0902\u0926"],
      "Nadiad": ["\u0aa8\u0aa1\u0abf\u0aaf\u0abe\u0aa6", "\u0928\u0921\u093f\u092f\u093e\u0926"],
      "Gujarat": ["\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4", "\u0917\u0941\u091c\u0930\u093e\u0924"]
    });
    const isGu = language === "gu";
    // "<Name>'s Parent" -> "<Name>ના વાલી" / "<Name> के अभिभावक"
    result = result.replace(/['\u2019]s Parent\b/gi, isGu ? "\u0aa8\u0abe \u0ab5\u0abe\u0ab2\u0ac0" : " \u0915\u0947 \u0905\u092d\u093f\u092d\u093e\u0935\u0915");
    // Month names in dates such as "12 March 2015"
    const months = {
      January: ["\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1\u0a86\u0ab0\u0ac0", "\u091c\u0928\u0935\u0930\u0940"], February: ["\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1\u0a86\u0ab0\u0ac0", "\u092b\u093c\u0930\u0935\u0930\u0940"],
      March: ["\u0aae\u0abe\u0ab0\u0acd\u0a9a", "\u092e\u093e\u0930\u094d\u091a"], April: ["\u0a8f\u0aaa\u0acd\u0ab0\u0abf\u0ab2", "\u0905\u092a\u094d\u0930\u0948\u0932"],
      May: ["\u0aae\u0ac7", "\u092e\u0908"], June: ["\u0a9c\u0ac2\u0aa8", "\u091c\u0942\u0928"], July: ["\u0a9c\u0ac1\u0ab2\u0abe\u0a88", "\u091c\u0941\u0932\u093e\u0908"],
      August: ["\u0a91\u0a97\u0ab8\u0acd\u0a9f", "\u0905\u0917\u0938\u094d\u0924"], September: ["\u0ab8\u0aaa\u0acd\u0a9f\u0ac7\u0aae\u0acd\u0aac\u0ab0", "\u0938\u093f\u0924\u0902\u092c\u0930"],
      October: ["\u0a91\u0a95\u0acd\u0a9f\u0acb\u0aac\u0ab0", "\u0905\u0915\u094d\u091f\u0942\u092c\u0930"], November: ["\u0aa8\u0ab5\u0ac7\u0aae\u0acd\u0aac\u0ab0", "\u0928\u0935\u0902\u092c\u0930"],
      December: ["\u0aa1\u0abf\u0eaa\u0ac7\u0aae\u0acd\u0aac\u0ab0", "\u0926\u093f\u0938\u0902\u092c\u0930"]
    };
    months.December[0] = "\u0aa1\u0abf\u0ab8\u0ac7\u0aae\u0acd\u0aac\u0ab0";
    for (const [m, loc] of Object.entries(months)) {
      result = result.replace(new RegExp("\\b" + m + "\\b", "g"), loc[isGu ? 0 : 1]);
    }
    result = result.replace(/\bNot provided\b/gi, isGu ? "\u0a86\u0aaa\u0ac7\u0ab2 \u0aa8\u0aa5\u0ac0" : "\u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902");
    for (const [name, localized] of Object.entries(names)) {
      result = result.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), localized[language === "gu" ? 0 : 1]);
    }
    // Fallback: any remaining Latin name/place (e.g. a newly added student) is
    // transliterated so the whole page stays in the chosen language.
    if (/^[A-Z][a-z]+(?:[ ,'\u2019]+[A-Z][a-z]+){0,3}$/.test(result)) {
      result = result.replace(/[A-Za-z]+/g, word => transliterateWord(word, language));
    }
    return leading + result + trailing;
  }

  function shouldSkipTranslation(node) {
    const element = node.parentElement;
    if (!element) return true;
    return Boolean(element.closest("script, style, textarea, [data-no-translate], .user-generated-content, #languageSelectLogin, #languageSelectApp"));
  }

  function translateElementAttributes(element) {
    const attributes = ["placeholder", "title", "aria-label", "alt"];
    element.__shikshaI18nAttrs ||= {};
    for (const attribute of attributes) {
      if (!element.hasAttribute(attribute)) continue;
      const current = element.getAttribute(attribute) || "";
      let record = element.__shikshaI18nAttrs[attribute];
      if (!record || current !== record.lastRendered) {
        record = { original: current, lastRendered: current };
        element.__shikshaI18nAttrs[attribute] = record;
      }
      const target = translatePlainText(record.original, state.language);
      if (current !== target) element.setAttribute(attribute, target);
      record.lastRendered = target;
    }
  }

  function applyLanguageToDom(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    for (const node of textNodes) {
      if (shouldSkipTranslation(node)) continue;
      if (node.__shikshaEnglishText === undefined) node.__shikshaEnglishText = node.nodeValue;
      const translated = translatePlainText(node.__shikshaEnglishText, state.language);
      if (node.nodeValue !== translated) node.nodeValue = translated;
    }

    const elements = root.querySelectorAll ? root.querySelectorAll("*") : [];
    elements.forEach(translateElementAttributes);
    if (root.nodeType === Node.ELEMENT_NODE) translateElementAttributes(root);
    document.documentElement.lang = state.language === "gu" ? "gu" : state.language === "hi" ? "hi" : "en";
    document.title = translatePlainText("ShikshaSetu | Smart School Administration", state.language);

    ["languageSelectLogin", "languageSelectApp"].forEach(id => {
      const selector = document.getElementById(id);
      if (selector) selector.value = state.language || "en";
    });
  }

  function setWebsiteLanguage(language) {
    const allowed = ["en", "gu", "hi"];
    state.language = allowed.includes(language) ? language : "en";
    try { localStorage.setItem("shikshasetu_language", state.language); } catch (_) { }
    // Match the draft dropdown to the website language by default. A user may
    // still choose a different language just for a single generated draft.
    const draftLanguage = document.querySelector('#assistantForm select[name="language"]');
    if (draftLanguage) draftLanguage.value = state.language;
    applyLanguageToDom(document.body);
  }

  function startLanguageObserver() {
    if (languageObserver || !document.body || typeof MutationObserver === "undefined") return;
    languageObserver = new MutationObserver(mutations => {
      const shouldRun = mutations.some(mutation =>
        mutation.type === "childList" || mutation.type === "attributes");
      if (shouldRun) applyLanguageToDom(document.body);
    });
    languageObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label", "alt"]
    });
  }

  function translateKnownDraftInput(value, language) {
    // Translate only complete known phrases. Do not translate arbitrary user
    // sentences word-by-word, which can produce awkward mixed-language text.
    const source = String(value ?? "").trim();
    if (!source || language === "en") return source;
    const known = UI_TRANSLATIONS_BY_LOWER.get(source.toLocaleLowerCase());
    return known ? known[language === "gu" ? 0 : 1] : source;
  }

  function localizedDate(language) {
    return new Intl.DateTimeFormat(LANGUAGE_LOCALES[language] || "en-IN", {
      day: "numeric", month: "long", year: "numeric"
    }).format(new Date());
  }


  const ACADEMIC_SUBJECTS_KEY = "shikshasetu_academic_subjects_v1";
  const ACADEMIC_MARKS_KEY = "shikshasetu_academic_marks_v1";
  const APP_STORAGE_KEY = "shikshasetu_demo_data";

  // Shared sample menu shown in both Teacher and Parent portals.
  const WEEKLY_MEAL_MENU = [
    ["Monday", "Roti, dal, seasonal vegetable"],
    ["Tuesday", "Rice, chana curry"],
    ["Wednesday", "Khichdi and vegetables"],
    ["Thursday", "Roti, dal and vegetables"],
    ["Friday", "Vegetable pulao and fruit"]
  ];

  // Sample faculty directory shown on the Parent Dashboard. Replace these demo
  // contact numbers with verified school-approved numbers before live use.
  const PARENT_FACULTY_MEMBERS = [
    { id: "TCH0001", name: "Priya Sharma", subject: "Mathematics · Class 5A", mobile: "90000 00001" },
    { id: "TCH0002", name: "Rahul Patel", subject: "Science · Class 4B", mobile: "90000 00002" },
    { id: "TCH0003", name: "Fatima Shaikh", subject: "English · Class 3A", mobile: "90000 00003" }
  ];

  const today = () => {
    const d = new Date();
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  };

  // Return the fixed school menu for a date; teachers do not type menu text.
  function getMealMenuForDate(dateValue) {
    if (!dateValue) return "Select a date to view the menu.";
    const parts = String(dateValue).split("-").map(Number);
    if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) {
      return "Select a date to view the menu.";
    }
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayIndex = date.getDay(); // Sunday = 0, Monday = 1, ... Saturday = 6
    if (dayIndex < 1 || dayIndex > 5) return "No meal menu scheduled for this day.";
    return WEEKLY_MEAL_MENU[dayIndex - 1][1];
  }

  function getDayNameForDate(dateValue) {
    if (!dateValue) return "selected day";
    const parts = String(dateValue).split("-").map(Number);
    if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) return "selected day";
    return new Intl.DateTimeFormat("en", { weekday: "long" }).format(
      new Date(parts[0], parts[1] - 1, parts[2])
    );
  }

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
      state.attendanceConfirmed = saved.attendanceConfirmed || {};
      state.absenceAlerts = saved.absenceAlerts || {};
      state.meals = saved.meals || {};
      state.notices = Array.isArray(saved.notices) ? saved.notices : [];
      state.lastDraft = saved.lastDraft || null;
      state.assistantDrafts = Array.isArray(saved.assistantDrafts) ? saved.assistantDrafts : [];
      // Migrate the previous single-draft format into the new title list.
      if (state.lastDraft && !state.assistantDrafts.some(d => d.id && d.id === state.lastDraft.id)) {
        if (!state.lastDraft.id) state.lastDraft.id = `DRAFT-${state.lastDraft.createdAt || Date.now()}`;
        state.assistantDrafts.unshift({
          id: state.lastDraft.id, topic: state.lastDraft.topic || "School Notice",
          kind: state.lastDraft.kind || "notice", createdAt: state.lastDraft.createdAt,
          expiresAt: state.lastDraft.expiresAt, published: !!state.lastDraft.published,
          noticeId: state.lastDraft.noticeId || null
        });
      }
      state.tasks = (saved.tasks || defaultTasks.map(task => ({ ...task })))
        .filter(task => !/report progress|review student progress|submit attendance report|update midday meal register/i.test(task.title || ""));
      state.chatClearedAtByUser = saved.chatClearedAtByUser && typeof saved.chatClearedAtByUser === "object"
        ? saved.chatClearedAtByUser : {};
      state.parentNoticeSeenByUser = saved.parentNoticeSeenByUser && typeof saved.parentNoticeSeenByUser === "object"
        ? saved.parentNoticeSeenByUser : {};
      state.messages = saved.messages || state.messages;
      state.messages = state.messages.map((message, index) => ({
        ...message,
        id: message.id || `legacy-${index}-${message.time || "message"}-${message.sender || "sender"}`,
        createdAt: Number.isFinite(Number(message.createdAt)) ? Number(message.createdAt) : 0,
        hiddenFor: Array.isArray(message.hiddenFor) ? message.hiddenFor : [],
        seen: message.seen === true
      }));
      cleanupExpiredDrafts(false);
    } catch (error) {
      console.warn("Could not load demo data.", error);
    }
  }

  function saveData() {
    try {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
        attendance: state.attendance,
        attendanceConfirmed: state.attendanceConfirmed,
        absenceAlerts: state.absenceAlerts,
        meals: state.meals,
        notices: state.notices,
        lastDraft: state.lastDraft,
        assistantDrafts: state.assistantDrafts,
        tasks: state.tasks,
        chatClearedAtByUser: state.chatClearedAtByUser || {},
        parentNoticeSeenByUser: state.parentNoticeSeenByUser || {},
        messages: state.messages
      }));
      return true;
    } catch (error) {
      showToast("Could not save data in this browser.");
      return false;
    }
  }

  // Each assistant draft and its linked Parent School Notice expire 24 hours after creation.
  function cleanupExpiredDrafts(shouldSave = true) {
    const now = Date.now();
    let changed = false;
    const drafts = Array.isArray(state.assistantDrafts) ? state.assistantDrafts : [];
    const expiredDrafts = drafts.filter(draft => draft.expiresAt && new Date(draft.expiresAt).getTime() <= now);
    const expiredIds = new Set(expiredDrafts.map(draft => String(draft.id)));
    const linkedNoticeIds = new Set(expiredDrafts.map(draft => draft.noticeId).filter(Boolean).map(String));

    if (expiredIds.size) {
      state.assistantDrafts = drafts.filter(draft => !expiredIds.has(String(draft.id)));
      changed = true;
    } else {
      state.assistantDrafts = drafts;
    }

    if (state.lastDraft?.expiresAt && new Date(state.lastDraft.expiresAt).getTime() <= now) {
      if (state.lastDraft.noticeId) linkedNoticeIds.add(String(state.lastDraft.noticeId));
      state.lastDraft = null;
      changed = true;
    }

    const previousCount = state.notices.length;
    state.notices = state.notices.filter(notice => {
      const expiry = notice.expiresAt || (notice.createdAt ? new Date(new Date(notice.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString() : null);
      const stillValid = !expiry || new Date(expiry).getTime() > now;
      return stillValid && !linkedNoticeIds.has(String(notice.id));
    });
    if (state.notices.length !== previousCount) changed = true;

    if (changed && shouldSave) saveData();
    // If the teacher stays on Smart Assistant past the expiry time, remove the preview immediately.
    if (changed && state.page === "assistant") {
      const result = document.getElementById("assistantResult");
      if (result) result.innerHTML = renderAssistantDraftPreview(state.lastDraft);
    }
    return changed;
  }

  function renderAssistantDraftPreview(draft) {
    if (!draft || (draft.expiresAt && new Date(draft.expiresAt).getTime() <= Date.now())) return "";
    const published = !!draft.published;
    return `
      <section class="assistant-result">
        <div class="panel-header">
          <div>
            <h3>${published ? "Published Draft" : "Draft — Please Review"}</h3>
            <p class="muted">This draft and its linked parent notice are automatically deleted 24 hours after creation.</p>
          </div>
        </div>
        <textarea id="draftText" rows="12" maxlength="10000" aria-label="Draft text" readonly>${escapeHTML(draft.body || "")}</textarea>
        <div class="panel-actions">
          ${published ? "" : '<button type="button" class="btn btn-primary" id="publishDraft">Publish</button>'}
          ${published ? "" : '<button type="button" class="btn btn-secondary" id="editDraft">Edit</button>'}
          <button type="button" class="btn danger" id="deleteDraft">Delete</button>
        </div>
        <p id="publishDraftStatus" class="muted small" role="status">${published ? "Published to Parent School Notice." : ""}</p>
      </section>`;
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
    const error = $("#loginError");
    const normalizedId = id.trim().toUpperCase();
    const normalizedEmail = id.trim().toLowerCase();
    const account = selectedLoginRole === "parent"
      ? Object.values(parents).find(parent => parent.email.toLowerCase() === normalizedEmail)
      : teachers[normalizedId];

    if (!account || account.password !== password) {
      if (error) {
        error.textContent = selectedLoginRole === "parent"
          ? "Invalid Parent's Email ID or password. Please try again."
          : "Invalid Teacher ID or PIN. Please try again.";
        error.classList.remove("hidden");
      }
      return;
    }

    state.teacher = account;
    state.userType = selectedLoginRole;
    if (error) { error.textContent = ""; error.classList.add("hidden"); }
    $("#loginScreen")?.classList.add("hidden");
    $("#app")?.classList.remove("hidden");

    const sidebar = $("#sidebar");
    // Only hide the original teacher navigation buttons. Parent navigation
    // buttons live inside #parentNavigation and must remain visible.
    $$("#sidebar > .nav-btn[data-page]").forEach(button => { button.hidden = state.userType === "parent"; });
    document.body.classList.toggle("parent-mode", state.userType === "parent");
    let parentNav = $("#parentNavigation");
    if (state.userType === "parent") {
      if (!parentNav && sidebar) {
        parentNav = document.createElement("div");
        parentNav.id = "parentNavigation";
        parentNav.innerHTML = `<div class="nav-label">Parent Portal</div>
          <button type="button" class="nav-btn" data-page="parentDashboard"><span class="ico">⌂</span>Dashboard</button>
          <button type="button" class="nav-btn" data-page="parentAttendance"><span class="ico">✓</span>Attendance</button>
          <button type="button" class="nav-btn" data-page="parentMeals"><span class="ico">♨</span>Midday Meals</button>
          <button type="button" class="nav-btn" data-page="parentHolidayList"><span class="ico">▦</span>Holiday List</button>
          <button type="button" class="nav-btn" data-page="parentFaculty"><span class="ico">♙</span>Faculty Members</button>
          <button type="button" class="nav-btn" data-page="parentProfile"><span class="ico">◉</span>Student's Information</button>
          <button type="button" class="nav-btn" data-page="parentChat"><span class="ico">☏</span>Parent–Teacher Chat</button>
          <div class="nav-label">Account</div>
          <button type="button" class="nav-btn teacher-identity-nav parent-identity-nav" data-page="parentFamilyProfile" aria-label="Open parent profile">
            <span class="avatar teacher-nav-avatar" id="navParentAvatar">AP</span>
            <span class="teacher-nav-details"><strong id="navParentName">Aarav Patel's Parent</strong><small id="navParentId">PAR0001</small></span>
          </button>`;
        sidebar.insertBefore(parentNav, $(".sidebar-bottom", sidebar));
      }
      if (parentNav) parentNav.hidden = false;
      $("#pageTitle").textContent = "Dashboard";
      $("#pageSubtitle").textContent = "Your child's school updates in one place.";
    } else {
      if (parentNav) parentNav.hidden = true;
    }
    updateTeacherDetails();
    // Keep the duplicate name/ID footer hidden for both roles. The clickable
    // identity item in the navigation remains available to open each profile.
    $("#sidebarProfileMini")?.classList.add("hidden");
    navigate(state.userType === "parent" ? "parentDashboard" : "dashboard");
    showToast(`Welcome, ${account.name}!`);
  }

  function logout() {
    state.teacher = null;
    state.userType = "teacher";
    document.body.classList.remove("parent-mode");
    $$("#sidebar > .nav-btn[data-page]").forEach(button => { button.hidden = false; });
    if ($("#parentNavigation")) $("#parentNavigation").hidden = true;
    $("#app")?.classList.add("hidden");
    $("#loginScreen")?.classList.remove("hidden");
    $("#loginForm")?.reset();
    $("#loginError")?.classList.add("hidden");
    closeSidebar();
  }

  function getSavedTeacherProfile(teacherId) {
    if (!teacherId) return {};
    try {
      return JSON.parse(localStorage.getItem("shikshasetu_profile_" + teacherId) || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function getTeacherProfilePhoto(teacherId) {
    const storedProfile = getSavedTeacherProfile(teacherId);
    const teacherAccount = teachers[teacherId];
    return storedProfile.photo || teacherAccount?.profile?.photo || "";
  }

  // Read the parent's own saved photo so it can be reused everywhere the
  // parent identity appears (header, sidebar and Parent Profile page).
  function getParentProfilePhoto(parentId) {
    if (!parentId) return "";
    const savedProfile = readJSON("shikshasetu_parent_profile_" + parentId, {});
    return savedProfile && typeof savedProfile === "object" ? (savedProfile.photo || "") : "";
  }

  function setAvatarPhoto(element, photo, name) {
    if (!element) return;
    const fallback = initials(name || "Teacher");
    if (photo) {
      element.innerHTML = `<img class="avatar-photo" src="${escapeHTML(photo)}" alt="${escapeHTML(name || "Profile photo")}" />`;
      element.classList.add("has-avatar-photo");
      element.setAttribute("aria-label", `${name || "Profile"} photo`);
    } else {
      element.textContent = fallback;
      element.classList.remove("has-avatar-photo");
      element.removeAttribute("aria-label");
    }
  }

  function updateTeacherDetails() {
    if (!state.teacher) return;

    const account = state.teacher;
    const isParent = state.userType === "parent";
    const profilePhoto = isParent
      ? getParentProfilePhoto(account.id)
      : getTeacherProfilePhoto(account.id);

    if (account.profile == null && !isParent) {
      account.profile = getSavedTeacherProfile(account.id);
    }

    // Keep the common header/identity area in sync with whichever account is logged in.
    if ($("#sideName")) $("#sideName").textContent = account.name;
    if ($("#sideRole")) $("#sideRole").textContent = `${account.role || (isParent ? "Parent" : "Teacher")} · ${isParent ? (account.email || account.id) : account.id}`;
    setAvatarPhoto($("#sideAvatar"), profilePhoto, account.name);
    setAvatarPhoto($("#topAvatar"), profilePhoto, account.name);

    // Teacher identity appears in the teacher navigation; parent identity appears in Parent Portal navigation.
    if ($("#navTeacherName")) $("#navTeacherName").textContent = account.name;
    if ($("#navTeacherId")) $("#navTeacherId").textContent = account.id;
    setAvatarPhoto($("#navTeacherAvatar"), isParent ? "" : profilePhoto, account.name);

    if ($("#navParentName")) $("#navParentName").textContent = account.name;
    if ($("#navParentId")) $("#navParentId").textContent = account.email || account.id;
    if ($("#navParentAvatar")) setAvatarPhoto($("#navParentAvatar"), isParent ? profilePhoto : "", account.name);
  }

  // ---------- NAVIGATION ----------

  const pageInfo = {
    dashboard: ["Dashboard", "Your school day at a glance"],
    classes: ["My Classes", "Manage students and class information"],
    attendance: ["Attendance", "Record and review student attendance"],
    meals: ["Midday Meals", "Maintain daily meal records"],
    reports: ["My Reports", "Prepare school administration reports"],
    assistant: ["Smart Assistant", "Draft administrative content for review"],
    chat: ["Teacher Chat", "Share updates with your teaching team"],
    profile: ["My Profile", "View your teacher information"],
    notifications: ["View Notifications", "Pending tasks and reminders"],
    parentDashboard: ["Dashboard", "Attendance and school updates"],
    parentAttendance: ["Attendance", "Your child's attendance summary"],
    parentProfile: ["Student's Information", "Your child's information"],
    parentFamilyProfile: ["Parent Profile", "Father's and mother's contact information"],
    parentChat: ["Parent–Teacher Chat", "Contact your child's teacher"],
    parentMeals: ["Meal Menu", "This week's school meal menu"],
    parentHolidayList: ["Holiday List", "Student holidays and vacation dates for academic year 2026–27"],
    parentFaculty: ["Faculty Members", "Teacher names, subjects and contact numbers"]
  };

  function getPendingTasks() {
    const tasks = (state.tasks || []).filter(task => !task.done);

    // Attendance is a pending item until every student has an explicitly saved
    // Present/Absent value for today's register. An unchecked UI box alone is
    // not treated as saved attendance.
    if (state.userType !== "parent" && state.teacher) {
      const students = classStudents();
      const records = state.attendance[today()] || {};
      const confirmed = new Set(state.attendanceConfirmed[today()] || []);
      const attendanceComplete = students.length > 0 && students.every(student =>
        confirmed.has(student.id) && (records[student.id] === "Present" || records[student.id] === "Absent")
      );
      if (students.length > 0 && !attendanceComplete) {
        tasks.unshift({
          id: "__attendance_pending__",
          title: "Complete today's attendance",
          due: "Today",
          done: false,
          kind: "attendance"
        });
      }
    }
    // Midday meal register is also pending until today's meal record is saved.
    if (state.userType !== "parent" && state.teacher) {
      const students = classStudents();
      const meal = state.meals[today()];
      const mealRecords = meal?.students || {};
      const mealComplete = !!meal && meal.status === "Recorded" &&
        students.length > 0 && students.every(student =>
          mealRecords[student.id] === "Served" || mealRecords[student.id] === "Not Served"
        );
      if (students.length > 0 && !mealComplete) {
        tasks.unshift({
          id: "__meal_pending__",
          title: "Complete today's midday meal record",
          due: "Today",
          done: false,
          kind: "meals"
        });
      }
    }
    return tasks;
  }

  function getUnseenParentNotices() {
    if (state.userType !== "parent" || !state.teacher) return [];
    const seen = state.parentNoticeSeenByUser?.[getChatUserKey()] || [];
    return (state.notices || []).filter(notice => notice && notice.id && !seen.includes(notice.id));
  }

  function markParentNoticesSeen() {
    if (state.userType !== "parent" || !state.teacher) return;
    state.parentNoticeSeenByUser ||= {};
    const key = getChatUserKey();
    const seen = new Set(state.parentNoticeSeenByUser[key] || []);
    (state.notices || []).forEach(notice => { if (notice?.id) seen.add(notice.id); });
    state.parentNoticeSeenByUser[key] = Array.from(seen);
    saveData();
  }

  function getUnseenIncomingMessages() {
    return (state.messages || []).filter(message =>
      isMessageVisibleToCurrentUser(message) &&
      message.sender !== state.teacher?.name && message.seen !== true
    );
  }

  function markChatMessagesSeen() {
    let changed = false;
    (state.messages || []).forEach(message => {
      if (isMessageVisibleToCurrentUser(message) && message.sender !== state.teacher?.name && message.seen !== true) {
        message.seen = true;
        changed = true;
      }
    });
    if (changed) saveData();
  }

  function updateTaskNotification() {
    const pendingTasks = getPendingTasks().length;
    const unseenMessages = getUnseenIncomingMessages().length;
    const unseenNotices = getUnseenParentNotices().length;
    const totalNotifications = pendingTasks + unseenMessages + unseenNotices;
    const button = $("#notificationBtn");
    if (!button) return;
    const dot = button.querySelector(".dot");
    if (dot) dot.style.display = totalNotifications > 0 ? "inline-block" : "none";
    button.setAttribute("aria-label", totalNotifications > 0
      ? `Notifications: ${pendingTasks} pending tasks, ${unseenMessages} unread messages, ${unseenNotices} new school notices`
      : "Notifications");
    button.classList.toggle("has-notifications", totalNotifications > 0);
  }

  function navigate(page) {
    if (!pageInfo[page]) page = "dashboard";
    if (!state.teacher) return;

    state.page = page;
    if (page === "chat" || page === "parentChat") markChatMessagesSeen();


    $$(".nav-btn[data-page]").forEach(button => {
      button.classList.toggle("active", button.dataset.page === page);
    });

    $("#pageTitle").textContent = pageInfo[page][0];
    $("#pageSubtitle").textContent = (page === "notifications" && state.userType === "parent") ? "New messages and school notices" : pageInfo[page][1];
    $("#pageContent").innerHTML = renderPage(page);
    updateTaskNotification();

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
    const pendingTasks = getPendingTasks().length;

    return `
      <section class="stats-grid">
        <article class="stat-card">
          <span class="stat-label">Total Students</span>
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

    `;
  }

  function renderNotifications() {
    const pending = getPendingTasks();
    const unseenMessages = getUnseenIncomingMessages();
    const unseenNotices = getUnseenParentNotices();
    if (!pending.length && !unseenMessages.length && !unseenNotices.length) {
      return `<section class="panel notification-empty-panel">
        <div class="notification-empty-icon" aria-hidden="true">✓</div>
        <h3>You're all caught up</h3>
        <p>No pending tasks or unread messages.</p>
      </section>`;
    }
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleDateString("en", { month: "short" });
    return `<section class="notification-list" aria-label="Pending task and unread message notifications">
      ${unseenNotices.map(notice => `
        <article class="notification-card notification-message-card">
          <div class="notification-date"><strong>${day}</strong><span>${month}</span></div>
          <div class="notification-content">
            <h3>New school notice: ${escapeHTML(notice.title || "School Notice")}</h3>
            <p>${escapeHTML(notice.body || "")}</p>
            <button type="button" class="btn btn-secondary" data-go="parentDashboard" data-mark-notices="1">View school notice</button>
          </div>
          <span class="notification-status-icon" aria-hidden="true">!</span>
        </article>`).join("")}
      ${unseenMessages.map(message => `
        <article class="notification-card notification-message-card">
          <div class="notification-date"><strong>${day}</strong><span>${month}</span></div>
          <div class="notification-content">
            <h3>New chat message from ${escapeHTML(message.sender || "Chat")}</h3>
            <p>${escapeHTML(message.text || (message.type === "image" ? "Photo message" : message.type === "audio" ? "Voice message" : "New message"))}</p>
            <button type="button" class="btn btn-secondary" data-go="${state.userType === 'parent' ? 'parentChat' : 'chat'}">Open chat</button>
          </div>
          <span class="notification-status-icon" aria-hidden="true">✉</span>
        </article>`).join("")}
      ${pending.map(task => `
        <article class="notification-card">
          <div class="notification-date"><strong>${day}</strong><span>${month}</span></div>
          <div class="notification-content">
            <h3>${escapeHTML(task.title)}</h3>
            <p>Your task is still pending. Due: ${escapeHTML(task.due || "No due date")}.</p>
            ${task.kind === "attendance"
        ? `<button type="button" class="task-complete-btn" data-go="attendance">Mark attendance</button>`
        : task.kind === "meals"
          ? `<button type="button" class="task-complete-btn" data-go="meals">Complete meal record</button>`
          : `<button type="button" class="task-complete-btn" data-complete-task="${task.id}">Mark complete</button>`}
          </div>
          <span class="notification-status-icon" aria-hidden="true">!</span>
        </article>`).join("")}
    </section>`;
  }

  function renderTasks() {
    if (!state.tasks.length) return `<p class="empty-state">No tasks yet.</p>`;

    return `<div class="task-list">
      ${state.tasks.map(task => `
        <div class="task-row">
          <span class="task-row-status ${task.done ? "is-done" : "is-pending"}" aria-hidden="true">${task.done ? "✓" : "•"}</span>
          <span class="${task.done ? "task-done" : ""}">${escapeHTML(task.title)}</span>
          <small>${escapeHTML(task.due || "")}</small>
          ${task.done ? `<span class="task-complete-label">Completed</span>` : `<button type="button" class="task-complete-btn" data-complete-task="${task.id}">Mark complete</button>`}
        </div>
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
                <th>Mobile No.</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((s, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${escapeHTML(s.name)}</td>
                  <td>${escapeHTML(s.mobileNo || s.parentContact || "Not provided")}</td>
                  <td>${escapeHTML(s.address || "Not provided")}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p class="muted">Sample student records for demonstration only.</p>
      </section>`;
  }

  // ---------- ATTENDANCE ----------
  // Checkbox-based layout preserved from the supplied attendance screen.
  // Checked = Present; unchecked = Absent. Changes are saved to state.attendance,
  // which is also the single source used by Weekly/Monthly/Yearly reports.

  function renderAttendance() {
    const students = classStudents();
    const records = state.attendance[today()] || {};
    const present = students.filter(student => records[student.id] === "Present").length;
    const absent = students.length - present;

    return `
      <div class="stats" style="grid-template-columns:repeat(3,minmax(0,1fr));">
        <div class="card">
          <p>Present</p>
          <h2 id="attendancePresentCount" style="color:#52734b">${present}</h2>
        </div>
        <div class="card">
          <p>Absent</p>
          <h2 id="attendanceAbsentCount" style="color:#a53535">${absent}</h2>
        </div>
        <div class="card">
          <p>Total Students</p>
          <h2 id="attendanceTotalCount">${students.length}</h2>
        </div>
      </div>

      <div class="card" style="margin-top:24px;">
        <div class="section-title">
          <div>
            <h2>Daily Attendance</h2>
            <p>${today()}</p>
          </div>
          <div class="toolbar" style="justify-content:flex-end;gap:8px;">
            <button class="btn" id="saveAttendance" type="button">Save Attendance</button>
            <button class="btn secondary" id="exportAttendanceCSV" data-export="attendance" type="button">
              Export
            </button>
          </div>
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
              ${students.map((student, index) => {
      const isPresent = records[student.id] === "Present";
      const status = isPresent ? "Present" : "Absent";
      const statusColor = isPresent ? "#52734b" : "#a53535";
      return `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHTML(student.name)}</td>
                    <td>
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
                        <input
                          type="checkbox"
                          class="attendance-checkbox"
                          data-student="${escapeHTML(student.id)}"
                          ${isPresent ? "checked" : ""}
                          aria-label="Mark ${escapeHTML(student.name)} present"
                          style="width:19px;height:19px;accent-color:#52734b;"
                        >
                        <span id="attendanceLabel-${escapeHTML(student.id)}" style="color:${statusColor}">
                          ${escapeHTML(status)}
                        </span>
                      </label>
                    </td>
                  </tr>`;
    }).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div id="absenceAlertsCard">${renderAbsenceAlertsCard()}</div>
    `;
  }

  // ---------- ABSENT-STUDENT PARENT ALERTS (SMS + AI CALL) ----------
  // A browser cannot send SMS/phone calls by itself, and provider keys must never
  // be placed in frontend code. So this frontend sends the list of absent students
  // to YOUR backend (see /backend/server.js), which talks to the SMS/voice provider.
  // While NOTIFY_CONFIG.endpoint is empty the app runs in DEMO mode: nothing is
  // really sent, the result is only simulated and shown on screen.
  const NOTIFY_CONFIG = Object.assign({
    endpoint: "",                 // e.g. "https://your-server.example.com/api/notify-absent"
    language: "gu",               // language of the SMS / voice message: "gu" | "hi" | "en"
    schoolName: "Government Primary School",
    apiKey: "",
    timeoutMs: 20000
  }, window.SHIKSHASETU_CONFIG || {});

  function tt(en, gu, hi) {
    return state.language === "gu" ? gu : state.language === "hi" ? hi : en;
  }

  function normalizeIndianMobile(value) {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
    return /^[6-9]\d{9}$/.test(digits) ? "+91" + digits : null;
  }

  function buildAbsenceMessage(student, dateKey, language = NOTIFY_CONFIG.language) {
    const school = NOTIFY_CONFIG.schoolName;
    if (language === "gu") return `${school}: આપનું બાળક ${student.name} આજે (${dateKey}) શાળામાં ગેરહાજર છે. કૃપા કરીને ગેરહાજરીનું કારણ શિક્ષકને જણાવો.`;
    if (language === "hi") return `${school}: आपका बच्चा ${student.name} आज (${dateKey}) स्कूल में अनुपस्थित है। कृपया अनुपस्थिति का कारण शिक्षक को बताएँ।`;
    return `${school}: Your child ${student.name} is absent from school today (${dateKey}). Please inform the teacher of the reason.`;
  }

  async function sendAbsenceAlerts(dateKey, absentStudents) {
    const log = { ...(state.absenceAlerts[dateKey] || {}) };
    // Do not call a parent again on attendance saves while the earlier call is active or done.
    const pending = absentStudents.filter(student => {
      const entry = log[student.id];
      return !(entry && ["sent", "queued", "initiated", "ringing", "answered", "completed", "demo"].includes(entry.status));
    });

    if (pending.length) {
      let results;
      if (!NOTIFY_CONFIG.endpoint) {
        // DEMO mode: simulate success, nothing is actually sent.
        results = pending.map(student => normalizeIndianMobile(student.mobileNo || student.parentContact)
          ? { studentId: student.id, sms: "demo", call: "demo", status: "demo" }
          : { studentId: student.id, sms: "-", call: "no-number", status: "no-number" });
      } else {
        const consentKey = "shikshaSetuAutomatedCallConsentSeen";
        if (!localStorage.getItem(consentKey)) {
          const accepted = window.confirm(tt(
            "Parents must have consented to automated calls.",
            "વાલીઓએ સ્વચાલિત કૉલ માટે સંમતિ આપી હોવી જરૂરી છે.",
            "अभिभावकों ने स्वचालित कॉल के लिए सहमति दी होनी चाहिए।"
          ));
          if (!accepted) {
            showToast(tt("Call not sent", "કૉલ મોકલાયો નથી", "कॉल नहीं की गई"));
            return;
          }
          localStorage.setItem(consentKey, "1");
        }
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), NOTIFY_CONFIG.timeoutMs);
          const students = pending.map(student => {
            const parent = Object.values(parents).find(record => record.child.name === student.name);
            return {
              id: student.id,
              name: student.name,
              parentName: parent?.name || "",
              mobile: student.mobileNo || student.parentContact || "",
              language: student.alertLanguage || NOTIFY_CONFIG.language,
              className: student.className
            };
          });
          const response = await fetch(NOTIFY_CONFIG.endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(NOTIFY_CONFIG.apiKey ? { "X-API-Key": NOTIFY_CONFIG.apiKey } : {})
            },
            body: JSON.stringify({
              date: dateKey,
              className: state.teacher?.className || "",
              schoolName: NOTIFY_CONFIG.schoolName,
              language: NOTIFY_CONFIG.language,
              students
            }),
            signal: controller.signal
          });
          clearTimeout(timer);
          if (!response.ok) throw new Error("HTTP " + response.status);
          results = (await response.json()).results || [];
        } catch (error) {
          console.warn("Absence alert request failed.", error);
          results = pending.map(student => ({ studentId: student.id, sms: "not-sent", call: "failed", status: "failed" }));
        }
      }
      pending.forEach(student => {
        const r = results.find(item => String(item.studentId) === String(student.id)) || { sms: "not-sent", call: "failed", status: "failed" };
        const phone = normalizeIndianMobile(student.mobileNo || student.parentContact);
        log[student.id] = {
          name: student.name,
          phone: phone || "",
          sms: r.sms || "not-sent",
          call: r.call || r.status || "failed",
          callSid: r.callSid || null,
          error: r.error || "",
          warning: r.warning || "",
          time: Date.now(),
          status: r.status || (r.call === "demo" ? "demo" : r.call === "no-number" ? "no-number" : r.call === "queued" ? "queued" : "failed")
        };
      });
    }

    state.absenceAlerts[dateKey] = log;
    saveData();
    refreshAbsenceAlertsCard();

    const entries = absentStudents.map(student => log[student.id]).filter(Boolean);
    const okCount = entries.filter(e => ["sent", "demo", "queued", "ringing", "answered", "completed"].includes(e.status)).length;
    const failed = entries.filter(e => e.status === "failed").length;
    const noNumber = entries.filter(e => e.status === "no-number").length;
    if (!absentStudents.length) return;
    const demo = !NOTIFY_CONFIG.endpoint ? tt(" (demo mode, nothing really sent)", " (ડેમો મોડ, ખરેખર કંઈ મોકલાયું નથી)", " (डेमो मोड, वास्तव में कुछ नहीं भेजा गया)") : "";
    showToast(tt(
      `Parent alerts: ${okCount} done, ${failed} failed, ${noNumber} without mobile number.${demo}`,
      `વાલી સૂચના: ${okCount} પૂર્ણ, ${failed} નિષ્ફળ, ${noNumber} મોબાઇલ નંબર વગર.${demo}`,
      `अभिभावक सूचना: ${okCount} पूर्ण, ${failed} असफल, ${noNumber} बिना मोबाइल नंबर।${demo}`
    ));
  }

  function renderAbsenceAlertsCard() {
    const log = state.absenceAlerts[today()] || {};
    const rows = Object.entries(log);
    if (!rows.length) return "";
    const label = status => ({
      sent: ["Completed", "#52734b"], demo: ["Demo (not sent)", "#8a6d1d"],
      queued: ["Queued", "#7b6417"], initiated: ["Queued", "#7b6417"], ringing: ["Ringing", "#245b82"],
      answered: ["Answered", "#245b82"], completed: ["Completed", "#52734b"],
      "no-answer": ["No answer", "#a53535"], busy: ["Busy", "#a53535"],
      failed: ["Failed", "#a53535"], "no-number": ["No mobile number", "#817773"]
    }[status] || [status, "#817773"]);
    const hasFailed = rows.some(([, entry]) => ["failed", "no-answer", "busy"].includes(entry.status) && !entry.retryScheduled);
    return `
      <div class="card" style="margin-top:24px;">
        <div class="section-title">
          <div><h2>Parent Alerts</h2><p>Automated calls for absent students</p></div>
          ${hasFailed ? `<button class="btn" id="retryAbsenceAlerts" type="button">Retry failed calls</button>` : ""}
        </div>
        <div class="table-wrap"><table>
          <thead><tr><th>Student Name</th><th>Parent Mobile</th><th>AI Call</th><th>Status</th></tr></thead>
          <tbody>${rows.map(([id, e]) => {
      const [text, color] = label(e.status);
      const gu = { Queued: "કતારમાં", Ringing: "રિંગ થઈ રહ્યું છે", Answered: "જવાબ આપ્યો", Completed: "પૂર્ણ", "No answer": "જવાબ મળ્યો નથી", Busy: "વ્યસ્ત", Failed: "નિષ્ફળ", "No mobile number": "મોબાઇલ નંબર નથી" }[text] || text;
      const hi = { Queued: "कतार में", Ringing: "रिंग हो रही है", Answered: "जवाब दिया", Completed: "पूरा हुआ", "No answer": "जवाब नहीं मिला", Busy: "व्यस्त", Failed: "असफल", "No mobile number": "मोबाइल नंबर नहीं है" }[text] || text;
      const localized = text === "Demo (not sent)"
        ? tt("Demo (not sent)", "ડેમો (મોકલાયું નથી)", "डेमो (नहीं भेजा गया)")
        : tt(text, gu, hi);
      return `<tr><td>${escapeHTML(e.name)}</td><td>${escapeHTML(e.phone || "—")}</td><td>${escapeHTML(e.error || (e.callSid ? text : "-"))}</td><td style="color:${color}">${escapeHTML(localized)}</td></tr>`;
    }).join("")}</tbody>
        </table></div>
      </div>`;
  }

  function refreshAbsenceAlertsCard() {
    const holder = $("#absenceAlertsCard");
    if (holder) holder.innerHTML = renderAbsenceAlertsCard();
  }

  function retryAbsenceAlerts() {
    const dateKey = today();
    const log = state.absenceAlerts[dateKey] || {};
    const retry = classStudents().filter(student => log[student.id] && ["failed", "no-answer"].includes(log[student.id].status));
    if (retry.length) sendAbsenceAlerts(dateKey, retry);
  }

  async function pollAbsenceCallStatuses(dateKey) {
    if (!NOTIFY_CONFIG.endpoint) return;
    const statusEndpoint = NOTIFY_CONFIG.statusEndpoint || NOTIFY_CONFIG.endpoint.replace(/notify-absent\/?$/, "call-status");
    if (statusEndpoint === NOTIFY_CONFIG.endpoint) return;
    const stopAt = Date.now() + 3 * 60 * 1000;
    while (Date.now() < stopAt) {
      const log = state.absenceAlerts[dateKey] || {};
      const pending = Object.values(log).filter(entry => entry.callSid && (entry.retryScheduled || ["queued", "initiated", "ringing", "answered"].includes(entry.status)));
      if (!pending.length) return;
      try {
        const sids = [...new Set(pending.map(entry => entry.callSid))];
        const url = new URL(statusEndpoint, window.location.href);
        url.searchParams.set("sids", sids.join(","));
        const response = await fetch(url, {
          headers: NOTIFY_CONFIG.apiKey ? { "X-API-Key": NOTIFY_CONFIG.apiKey } : {}
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();
        Object.values(log).forEach(entry => {
          const status = data.statuses?.[entry.callSid];
          if (!status) return;
          entry.status = status.status || entry.status;
          entry.call = entry.status;
          entry.callSid = status.callSid || entry.callSid;
          entry.error = status.error || entry.error;
          entry.retryScheduled = status.retryScheduled || false;
        });
        state.absenceAlerts[dateKey] = log;
        saveData();
        refreshAbsenceAlertsCard();
      } catch (error) {
        console.warn("Call status polling failed.", error);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  function saveAttendance() {
    const records = { ...(state.attendance[today()] || {}) };

    $$(".attendance-checkbox").forEach(checkbox => {
      records[checkbox.dataset.student] = checkbox.checked ? "Present" : "Absent";
    });

    state.attendance[today()] = records;
    state.attendanceConfirmed[today()] = classStudents().map(student => student.id);
    saveData();
    updateTaskNotification();
    showToast("Attendance saved successfully.");

    const absentStudents = classStudents().filter(student => records[student.id] === "Absent");
    if (absentStudents.length) {
      sendAbsenceAlerts(today(), absentStudents).then(() => pollAbsenceCallStatuses(today()));
    }
  }

  function markAllPresent() {
    const records = { ...(state.attendance[today()] || {}) };
    classStudents().forEach(student => {
      records[student.id] = "Present";
    });
    state.attendance[today()] = records;
    state.attendanceConfirmed[today()] = classStudents().map(student => student.id);
    saveData();
    navigate("attendance");
    showToast("All students marked present. Verify the attendance.");
  }
  function handleAttendanceCheckboxChange(changedCheckbox) {
    const dateKey = today();
    const records = { ...(state.attendance[dateKey] || {}) };

    if (changedCheckbox) {
      records[changedCheckbox.dataset.student] = changedCheckbox.checked ? "Present" : "Absent";
      const confirmed = new Set(state.attendanceConfirmed[dateKey] || []);
      confirmed.add(changedCheckbox.dataset.student);
      state.attendanceConfirmed[dateKey] = [...confirmed];
    }

    state.attendance[dateKey] = records;
    saveData();

    const students = classStudents();
    const present = students.filter(student => records[student.id] === "Present").length;
    const absent = students.length - present;

    const presentCount = $("#attendancePresentCount");
    const absentCount = $("#attendanceAbsentCount");
    const totalCount = $("#attendanceTotalCount");

    if (presentCount) presentCount.textContent = present;
    if (absentCount) absentCount.textContent = absent;
    if (totalCount) totalCount.textContent = students.length;

    $$(".attendance-checkbox").forEach(checkbox => {
      const label = $("#attendanceLabel-" + CSS.escape(checkbox.dataset.student));
      if (label) {
        const isPresent = checkbox.checked;
        label.textContent = isPresent ? "Present" : "Absent";
        label.style.color = isPresent ? "#52734b" : "#a53535";
      }
      checkbox.setAttribute(
        "aria-label",
        `Mark ${checkbox.closest("tr")?.querySelector("td:nth-child(2)")?.textContent.trim() || "student"} present`
      );
    });
    updateTaskNotification();
  }

  // ---------- MIDDAY MEALS ----------

  function renderMeals() {
    const date = document.getElementById("mealDateInput")?.value || today();
    const meal = state.meals[date] || {};
    const students = classStudents();
    const records = meal.students || {};
    const servedCount = students.filter(student => records[student.id] === "Served").length;
    const notServedCount = students.filter(student => records[student.id] !== "Served").length;
    const selectedMenu = getMealMenuForDate(date);

    return `
      ${renderWeeklyMealMenu()}
      <section class="panel">
        <div class="panel-header meal-register-header">
          <div><h3>Daily Midday Meal Register</h3><p class="muted">Mark each student as Served or Not Served. Counts update automatically.</p></div>
          <span class="status-pill">${meal.status ? "Recorded" : "Not recorded"}</span>
        </div>
        <form id="mealForm" class="form-grid">
          <div class="meal-info-grid full-width">
            <label class="meal-info-card" for="mealDateInput"><span>Date</span><input type="date" id="mealDateInput" name="mealDate" value="${escapeHTML(date)}" required></label>
            <div class="meal-info-card"><span>Served</span><strong id="mealServedCount" class="meal-count" style="color:#52734b">${servedCount}</strong></div>
            <div class="meal-menu-display meal-info-card" id="mealMenuDisplay" aria-live="polite">
              <span id="mealMenuDayLabel">Menu for ${escapeHTML(getDayNameForDate(date))}</span>
              <strong id="mealMenuText">${escapeHTML(selectedMenu)}</strong>
            </div>
            <div class="meal-info-card"><span>Not Served</span><strong id="mealNotServedCount" class="meal-count" style="color:#a53535">${notServedCount}</strong></div>
          </div>
          <div class="meal-top-actions full-width">
            <button class="btn btn-primary" type="submit" form="mealForm">Save Meal Record</button>
            <button class="btn btn-secondary" type="button" data-export="meals">Download Meal Report PDF</button>
          </div>
          <div class="table-wrap full-width">
            <table class="meal-student-table">
              <thead><tr><th>Roll No.</th><th>Student Name</th><th>Status</th></tr></thead>
              <tbody>${students.map((student, index) => {
      const status = records[student.id] || "Not Served";
      return `<tr>
                  <td>${index + 1}</td><td>${escapeHTML(student.name)}</td>
                  <td class="meal-status-cell"><label class="meal-status-toggle"><input type="checkbox" class="meal-status-checkbox" data-student="${escapeHTML(student.id)}" ${status === "Served" ? "checked" : ""} aria-label="${escapeHTML(student.name)} meal status"><span class="meal-status-text">${status === "Served" ? "Served" : "Not Served"}</span></label></td>
                </tr>`;
    }).join("")}</tbody>
            </table>
          </div>

        </form>
      </section>
      <section class="panel"><h3>Recent Meal Records</h3>${renderMealHistory()}</section>`;
  }

  function renderMealHistory() {
    const entries = Object.entries(state.meals).sort((a, b) => b[0].localeCompare(a[0]));
    if (!entries.length) return `<p class="empty-state">No meal records saved yet.</p>`;
    return `<div class="table-wrap"><table>
      <thead><tr><th>Date</th><th>Menu</th><th>Served</th><th>Not Served</th><th>Total Students</th></tr></thead>
      <tbody>${entries.map(([date, meal]) => {
      const values = Object.values(meal.students || {});
      const served = values.filter(value => value === "Served").length;
      const notServed = values.filter(value => value === "Not Served").length;
      return `<tr><td>${escapeHTML(date)}</td><td>${escapeHTML(meal.menu || getMealMenuForDate(date))}</td><td>${served}</td><td>${notServed}</td><td>${values.length}</td></tr>`;
    }).join("")}</tbody></table></div>`;
  }

  function updateMealCounts() {
    const students = classStudents();
    const date = $("#mealDateInput")?.value || today();
    const records = state.meals[date]?.students || {};
    const served = students.filter(student => records[student.id] === "Served").length;
    const notServed = students.filter(student => records[student.id] !== "Served").length;
    if ($("#mealServedCount")) $("#mealServedCount").textContent = served;
    if ($("#mealNotServedCount")) $("#mealNotServedCount").textContent = notServed;
    if ($("#mealTotalCount")) $("#mealTotalCount").textContent = students.length;
  }

  function saveMeal(form) {
    const data = new FormData(form);
    const date = String(data.get("mealDate") || "");
    if (!date) {
      showToast("Please select a meal date.");
      return;
    }
    const previous = state.meals[date] || {};
    const students = classStudents();
    const records = { ...(previous.students || {}) };
    students.forEach(student => {
      const checkbox = $(`.meal-status-checkbox[data-student="${CSS.escape(student.id)}"]`);
      records[student.id] = checkbox?.checked ? "Served" : "Not Served";
    });
    // A checked box means Served; an unchecked box means Not Served.
    state.meals[date] = {
      menu: getMealMenuForDate(date),
      students: records,
      served: students.filter(student => records[student.id] === "Served").length,
      notServed: students.filter(student => records[student.id] !== "Served").length,
      total: students.length,
      status: "Recorded",
      notes: ""
    };
    saveData();
    navigate("meals");
    showToast("Meal record saved.");
  }

  // ---------- REPORTS: WEEKLY, MONTHLY, YEARLY ----------

  function renderReports() {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const academicStartYear = now.getMonth() >= 5 ? now.getFullYear() : now.getFullYear() - 1;
    const yearOptions = Array.from({ length: 9 }, (_, index) => academicStartYear - 5 + index)
      .map(year => `<option value="${year}" ${year === academicStartYear ? "selected" : ""}>${year}–${year + 1}</option>`)
      .join("");

    return `
      <section class="panel attendance-report-panel">
        <h3>Generate Attendance Report</h3>
        <p class="muted">Choose a report period to view saved student attendance and calculate each student's percentage.</p>

        <div class="report-type-filter">
          <label for="reportType">Report Type</label>
          <select id="reportType">
            <option value="weekly">Weekly Attendance</option>
            <option value="monthly" selected>Monthly Attendance</option>
            <option value="yearly">Yearly Attendance (June–May)</option>
          </select>
        </div>

        <div id="weeklyReportFields" class="form-grid report-date-fields hidden">
          <label for="reportStartDate">Start Date
            <input type="date" id="reportStartDate" value="${today()}" required>
          </label>
          <label for="reportEndDate">End Date
            <input type="date" id="reportEndDate" value="${today()}" required>
          </label>
        </div>

        <div id="monthlyReportFields" class="form-grid report-date-fields report-filter-single">
          <label for="reportMonth">Select Month
            <input type="month" id="reportMonth" value="${currentMonth}" required>
          </label>
        </div>

        <div id="yearlyReportFields" class="form-grid report-date-fields report-filter-single hidden">
          <label for="reportYear">Select Academic Year (June–May)
            <select id="reportYear">${yearOptions}</select>
          </label>
        </div>

        <div class="panel-actions">
          <button type="button" class="btn btn-primary" id="previewReport">Preview Report</button>
          <button type="button" class="btn btn-secondary" id="exportReport">Download</button>
        </div>

        <div id="reportPreview" lass="report-preview">
          <p class="empty-state">Select a period and click Preview Report.</p>
        </div>
      </section>`;
  }

  function updateReportFields() {
    const type = $("#reportType")?.value || "monthly";
    $("#weeklyReportFields")?.classList.toggle("hidden", type !== "weekly");
    $("#monthlyReportFields")?.classList.toggle("hidden", type !== "monthly");
    $("#yearlyReportFields")?.classList.toggle("hidden", type !== "yearly");
  }

  function reportDateKey(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function reportDateFromKey(key) {
    return new Date(`${key}T12:00:00`);
  }

  function getAttendanceCode(dateKey, studentId) {
    const records = state.attendance[dateKey] || {};
    if (records[studentId] === "Present") return "P";
    if (records[studentId] === "Absent") return "A";
    return "";
  }

  function getReportOptionsFromUI() {
    const type = $("#reportType")?.value || "monthly";

    if (type === "weekly") {
      return {
        type,
        startDate: $("#reportStartDate")?.value || "",
        endDate: $("#reportEndDate")?.value || ""
      };
    }

    if (type === "monthly") {
      return { type, month: $("#reportMonth")?.value || "" };
    }

    return { type, year: $("#reportYear")?.value || "" };
  }

  function getReportPeriod(options) {
    let startDate;
    let endDate;
    let title;
    let periodText;

    if (options.type === "weekly") {
      startDate = options.startDate;
      endDate = options.endDate;
      if (!startDate || !endDate || startDate > endDate) return null;
      title = "Weekly Attendance Report";
      periodText = `${startDate} to ${endDate}`;
    } else if (options.type === "monthly") {
      if (!/^\d{4}-\d{2}$/.test(options.month || "")) return null;
      const [yearText, monthText] = options.month.split("-");
      const year = Number(yearText);
      const monthIndex = Number(monthText) - 1;
      if (monthIndex < 0 || monthIndex > 11) return null;
      startDate = reportDateKey(new Date(year, monthIndex, 1, 12));
      endDate = reportDateKey(new Date(year, monthIndex + 1, 0, 12));
      title = "Monthly Attendance Report";
      periodText = new Date(year, monthIndex, 1, 12).toLocaleDateString("en-IN", {
        month: "long", year: "numeric"
      });
    } else if (options.type === "yearly") {
      const academicYear = Number(options.year);
      if (!Number.isInteger(academicYear) || academicYear < 1900 || academicYear > 2200) return null;
      // Match the supplied yearly format: June through the following May.
      startDate = reportDateKey(new Date(academicYear, 5, 1, 12));
      endDate = reportDateKey(new Date(academicYear + 1, 4, 31, 12));
      title = "Yearly Attendance Report";
      periodText = `June ${academicYear} – May ${academicYear + 1}`;
    } else {
      return null;
    }

    const first = reportDateFromKey(startDate);
    const last = reportDateFromKey(endDate);
    if (Number.isNaN(first.getTime()) || Number.isNaN(last.getTime()) || first > last) return null;

    const dateKeys = [];
    const cursor = new Date(first);
    while (cursor <= last) {
      dateKeys.push(reportDateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return { startDate, endDate, dateKeys, title, periodText };
  }

  function getReportRows(type, selection) {
    const options = { ...selection, type };
    const period = getReportPeriod(options);
    if (!period) return null;

    const students = classStudents();
    const dateKeys = period.dateKeys;
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const attendanceCode = (dateKey, student) => getAttendanceCode(dateKey, student.id);

    // A date is counted as a working/recorded day only when at least one
    // student has an explicitly saved Present or Absent value on that date.
    const workingDateSet = new Set(dateKeys.filter(dateKey =>
      students.some(student => attendanceCode(dateKey, student) !== "")
    ));
    const totalWorkingDays = workingDateSet.size;
    const totalSavedMarks = dateKeys.reduce((sum, dateKey) =>
      sum + students.filter(student => attendanceCode(dateKey, student) !== "").length, 0);

    function studentCounts(student, dates) {
      let present = 0;
      let absent = 0;
      dates.forEach(dateKey => {
        const code = attendanceCode(dateKey, student);
        if (code === "P") present++;
        if (code === "A") absent++;
      });
      const markedDays = present + absent;
      const percentage = markedDays ? (present / markedDays * 100) : null;
      return { present, absent, markedDays, percentage };
    }

    let rows;
    let summaryRowIndex = null;

    if (type === "weekly" || type === "monthly") {
      const dateHeaders = dateKeys.map(dateKey => {
        const date = reportDateFromKey(dateKey);
        return type === "weekly"
          ? `${weekdayNames[date.getDay()]}\n${date.getDate()}-${String(date.getMonth() + 1).padStart(2, "0")}`
          : `${date.getDate()}\n${weekdayNames[date.getDay()]}`;
      });

      const headers = [
        "Roll No.", "Student Name", ...dateHeaders,
        "Present Days", "Absent Days", "Total Working Days", "Days Marked", "Attendance %"
      ];

      rows = [headers, ...students.map((student, index) => {
        const counts = studentCounts(student, dateKeys);
        return [
          index + 1,
          student.name,
          ...dateKeys.map(dateKey => attendanceCode(dateKey, student)),
          counts.present,
          counts.absent,
          totalWorkingDays,
          counts.markedDays,
          counts.percentage === null ? "—" : `${counts.percentage.toFixed(2)}%`
        ];
      })];
    } else {
      const monthPeriods = Array.from({ length: 12 }, (_, index) => {
        const monthIndex = (5 + index) % 12;
        const monthYear = Number(options.year) + (monthIndex < 5 ? 1 : 0);
        const lastDay = new Date(monthYear, monthIndex + 1, 0).getDate();
        const dates = Array.from({ length: lastDay }, (_, dayIndex) =>
          reportDateKey(new Date(monthYear, monthIndex, dayIndex + 1, 12))
        );
        return {
          year: monthYear,
          month: monthIndex,
          label: new Date(monthYear, monthIndex, 1, 12).toLocaleDateString("en-IN", { month: "short" }),
          dates,
          workingDays: dates.filter(dateKey => workingDateSet.has(dateKey)).length
        };
      });

      const headers = [
        "Roll No.", "Student Name", ...monthPeriods.map(month => month.label),
        "Total Days Present", "Total Working Days", "Days Marked", "Attendance %"
      ];

      const summaryRow = [
        "", "Total monthly working days",
        ...monthPeriods.map(month => month.workingDays),
        "", totalWorkingDays, "", ""
      ];
      summaryRowIndex = 1;

      rows = [headers, summaryRow, ...students.map((student, index) => {
        const counts = studentCounts(student, dateKeys);
        const monthlyPresent = monthPeriods.map(month =>
          studentCounts(student, month.dates).present
        );
        return [
          index + 1,
          student.name,
          ...monthlyPresent,
          counts.present,
          totalWorkingDays,
          counts.markedDays,
          counts.percentage === null ? "—" : `${counts.percentage.toFixed(2)}%`
        ];
      })];
    }

    rows.reportMeta = {
      title: period.title,
      periodText: period.periodText,
      studentCount: students.length,
      totalWorkingDays,
      totalSavedMarks,
      summaryRowIndex,
      type
    };
    return rows;
  }

  function previewReport() {
    const preview = $("#reportPreview");
    const options = getReportOptionsFromUI();
    if (!preview) return;

    const rows = getReportRows(options.type, options);
    if (!rows) {
      preview.innerHTML = `<p class="empty-state">Please select a valid date range, month or academic year.</p>`;
      return;
    }

    const meta = rows.reportMeta;
    if (meta.totalSavedMarks === 0) {
      preview.innerHTML = `
        <h3>${escapeHTML(meta.title)}</h3>
        <p class="muted">${escapeHTML(meta.periodText)}</p>
        <p class="empty-state">No attendance has been saved for this period. Go to Attendance, mark Present/Absent, press Save Attendance, and then preview this report again.</p>`;
      return;
    }

    preview.innerHTML = `
      <h3>${escapeHTML(meta.title)}</h3>
      <p class="muted">${escapeHTML(meta.periodText)}</p>
      <p class="muted">P = Present · A = Absent · Blank = attendance not marked</p>
      <div class="table-wrap attendance-report-wrap">
        <table class="attendance-report-table ${options.type}-attendance-table">
          <thead><tr>${rows[0].map(cell => `<th>${escapeHTML(cell)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.slice(1).map((row, index) => {
      const isSummary = meta.summaryRowIndex === index + 1;
      return `<tr class="${isSummary ? "monthly-working-summary" : ""}">${row.map(cell => `<td>${escapeHTML(cell ?? "")}</td>`).join("")}</tr>`;
    }).join("")}
          </tbody>
        </table>
      </div>
      <p class="muted">Working/recorded days: ${meta.totalWorkingDays}. Attendance percentage is calculated from each student's explicitly marked Present/Absent days, so blank days are not counted as Absent.</p>`;
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
            <option value="en" ${state.language === "en" ? "selected" : ""}>English</option>
            <option value="gu" ${state.language === "gu" ? "selected" : ""}>ગુજરાતી</option>
            <option value="hi" ${state.language === "hi" ? "selected" : ""}>हिंदी</option>
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

      <p class="muted full-width">
        Draft template follows the selected language.
      </p>

      <div id="assistantResult">${renderAssistantDraftPreview(state.lastDraft)}</div>

      <p class="muted">
        Review the draft before publishing it.
      </p>
    </section>
  `;
  }

  function makeDraft(kind, topic, details, language = state.language || "en") {
    const lang = ["en", "gu", "hi"].includes(language) ? language : "en";
    const pick = (english, gujarati, hindi) => lang === "gu" ? gujarati : lang === "hi" ? hindi : english;
    const name = state.teacher?.name || "Teacher";
    const school = state.teacher?.school || "School";
    const className = translateKnownDraftInput(state.teacher?.className || "", lang);
    const topicText = translateKnownDraftInput(topic, lang);
    const detailsText = translateKnownDraftInput(details, lang);
    const date = localizedDate(lang);
    const detailsBlock = detailsText
      ? `\n\n${pick("Additional details", "વધારાની વિગતો", "अतिरिक्त विवरण")}:\n${detailsText}`
      : "";

    const templates = {
      notice: () => `${pick("SCHOOL NOTICE", "શાળાની સૂચના", "विद्यालय सूचना")}\n\n${pick("Subject", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        `This is to inform all concerned about ${topicText}. Please follow the relevant arrangements.`,
        `આથી તમામ સંબંધિત લોકોને ${topicText} અંગે જાણ કરવામાં આવે છે. કૃપા કરીને સંબંધિત વ્યવસ્થાનું પાલન કરો.`,
        `सभी संबंधित लोगों को ${topicText} के बारे में सूचित किया जाता है। कृपया संबंधित व्यवस्था का पालन करें।`
      )}${detailsBlock}\n\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${pick("Issued by", "જારી કરનાર", "जारीकर्ता")}: ${name}`,
      parent: () => `${pick("PARENT MESSAGE", "વાલી માટેનો સંદેશ", "अभिभावक संदेश")}\n\n${pick("Dear Parent,", "પ્રિય વાલી,", "प्रिय अभिभावक,")}\n\n${pick(
        `This message is about ${topicText}. Please review the information below.`,
        `આ સંદેશ ${topicText} અંગે છે. કૃપા કરીને નીચેની માહિતી તપાસો.`,
        `यह संदेश ${topicText} के बारे में है। कृपया नीचे दी गई जानकारी देखें।`
      )}${detailsBlock}\n\n${pick("Thank you,", "આભાર,", "धन्यवाद,")}\n${name}\n${school}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}`,
      meeting: () => `${pick("MEETING SUMMARY DRAFT", "બેઠકના સારાંશનો ડ્રાફ્ટ", "बैठक सारांश ड्राफ्ट")}\n\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n\n${pick("Discussion points:", "ચર્ચાના મુદ્દાઓ:", "चर्चा के बिंदु:")}\n1. ${topicText}\n2. ${pick("Key observations and updates", "મુખ્ય અવલોકનો અને અપડેટ્સ", "मुख्य अवलोकन और अपडेट")}\n3. ${pick("Actions and follow-up", "કાર્યવાહી અને અનુસરણ", "कार्रवाई और अनुवर्ती कार्य")}\n\n${pick("Please confirm action items with participants.", "કૃપા કરીને સહભાગીઓ સાથે કાર્ય મુદ્દાઓની પુષ્ટિ કરો.", "कृपया प्रतिभागियों के साथ कार्य बिंदुओं की पुष्टि करें।")}${detailsBlock}`,
      leave: () => `${pick("LEAVE APPLICATION DRAFT", "રજાની અરજીનો ડ્રાફ્ટ", "छुट्टी आवेदन ड्राफ्ट")}\n\n${pick("To,", "પ્રતિ,", "सेवा में,")}\n${pick("The Head Teacher", "આચાર્યશ્રી", "प्रधान शिक्षक")}\n${school}\n\n${pick("Subject: Leave request", "વિષય: રજાની વિનંતી", "विषय: छुट्टी का अनुरोध")} — ${topicText}\n\n${pick("Respected Sir/Madam,", "માનનીય સાહેબ/મેડમ,", "आदरणीय महोदय/महोदया,")}\n\n${pick(
        "I would like to request leave for the reason stated below. Kindly consider my request.",
        "નીચે જણાવેલ કારણસર હું રજાની વિનંતી કરું છું. કૃપા કરીને મારી વિનંતી ધ્યાનમાં લેશો.",
        "मैं नीचे बताए गए कारण से छुट्टी का अनुरोध करता/करती हूँ। कृपया मेरे अनुरोध पर विचार करें।"
      )}\n\n${detailsText || pick("[Add dates and relevant details]", "[તારીખ અને જરૂરી વિગતો ઉમેરો]", "[तारीख और आवश्यक विवरण जोड़ें]")}\n\n${pick("Thank you.", "આભાર.", "धन्यवाद।")}\n\n${pick("Yours sincerely,", "આપનો વિશ્વાસુ,", "सादर,")}\n${name}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}`,
      announcement: () => `${pick("SCHOOL ANNOUNCEMENT", "શાળાની જાહેરાત", "स्कूल की घोषणा")}\n\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        `The school announces the following update: ${topicText}. Please take note and follow any instructions shared by the school.`,
        `શાળા નીચેની જાણ કરે છે: ${topicText}. કૃપા કરીને નોંધ લો અને શાળા દ્વારા આપવામાં આવેલી સૂચનાઓનું પાલન કરો.`,
        `स्कूल निम्नलिखित सूचना जारी करता है: ${topicText}। कृपया ध्यान दें और स्कूल द्वारा दिए गए निर्देशों का पालन करें।`
      )}${detailsBlock}\n\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${school}`,
      attendance: () => `${pick("ATTENDANCE SUMMARY DRAFT", "હાજરી સારાંશનો ડ્રાફ્ટ", "उपस्थिति सारांश ड्राफ्ट")}\n\n${pick("Class", "વર્ગ", "कक्षा")}: ${className}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        "Verify the attendance register and totals before submitting.",
        "સબમિટ કરતા પહેલાં હાજરી રજિસ્ટર અને કુલ આંકડા ચકાસો.",
        "जमा करने से पहले उपस्थिति रजिस्टर और कुल संख्या की जाँच करें।"
      )}${detailsBlock}`,
      meal: () => `${pick("MIDDAY MEAL SUMMARY DRAFT", "મધ્યાહ્ન ભોજન સારાંશનો ડ્રાફ્ટ", "मध्याह्न भोजन सारांश ड्राफ्ट")}\n\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        "Verify the menu, service details and number of students served against the official register.",
        "સત્તાવાર રજિસ્ટર સાથે મેનૂ, ભોજન વિતરણની વિગતો અને ભોજન મેળવનારા વિદ્યાર્થીઓની સંખ્યા ચકાસો.",
        "आधिकारिक रजिस्टर से मेनू, भोजन वितरण का विवरण और भोजन पाने वाले विद्यार्थियों की संख्या की जाँच करें।"
      )}${detailsBlock}`
    };

    return (templates[kind] || templates.notice)();
  }

  // ---------- TEACHER CHAT ----------

  function renderChat() {
    return `
      <section class="panel teacher-chat-panel">
        <div class="chat-header">
          <div class="chat-group-avatar">👩‍🏫</div>
          <div class="chat-heading-copy">
            <h3>Teacher Group Chat</h3>
            <p class="muted">Share messages, photos and voice notes</p>
            <p class="chat-selection-status muted" data-chat-selection-status aria-live="polite"></p>
          </div>
          <div class="chat-menu-wrap">
            <button type="button" class="chat-menu-trigger" data-chat-menu-trigger aria-label="More options" title="More options">⋮</button>
            <div class="chat-menu hidden" data-chat-menu role="menu">${renderChatMenu()}</div>
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

          <input type="file" id="chatPhotoInput" accept="image/*" multiple hidden>
          <input type="text" name="message" id="chatMessageInput" maxlength="500"
            placeholder="Type a message..." autocomplete="off">
          <button type="button" id="recordVoiceBtn" class="chat-icon-btn"
            title="Record voice message" aria-label="Record voice message">🎙️</button>
          <button type="submit" class="chat-send-btn">➤</button>
        </form>

        <div id="voiceRecordingStatus" class="voice-status" aria-live="polite"></div>
        <p class="muted chat-footnote">Demo mode · Messages are stored in this browser only.</p>
      </section>
    `;
  }

  function renderChatMenu() {
    const selected = (state.messages || []).find(message => message.id === selectedChatMessageId && isMessageVisibleToCurrentUser(message));
    if (!selected) {
      return `<button type="button" class="chat-menu-item" role="menuitem" data-chat-menu-action="clear">Clear chat</button>`;
    }

    const isMine = isCurrentUserMessage(selected);
    const canCopy = Boolean(selected.text);
    const canEdit = isMine && Boolean(selected.text) && selected.type !== "image" && selected.type !== "audio";
    return `
      ${canCopy ? `<button type="button" class="chat-menu-item" role="menuitem" data-chat-menu-action="copy">Copy</button>` : ""}
      ${canEdit ? `<button type="button" class="chat-menu-item" role="menuitem" data-chat-menu-action="edit">Edit</button>` : ""}
      <button type="button" class="chat-menu-item" role="menuitem" data-chat-menu-action="delete-me">Delete for me</button>
      ${isMine ? `<button type="button" class="chat-menu-item danger" role="menuitem" data-chat-menu-action="delete-everyone">Delete for everyone</button>` : ""}
    `;
  }

  function renderMessages() {
    const visibleMessages = (state.messages || []).filter(isMessageVisibleToCurrentUser);
    if (!visibleMessages.length) {
      return `<p class="empty-state">No messages yet. Start a conversation!</p>`;
    }

    return visibleMessages.map(message => {
      const isMine = isCurrentUserMessage(message);
      const isSelected = message.id === selectedChatMessageId;
      let attachment = "";

      if (message.type === "image" && message.dataUrl) {
        attachment = `<img class="chat-photo" src="${escapeHTML(message.dataUrl)}" alt="Shared photo" loading="lazy">`;
      } else if (message.type === "audio" && message.dataUrl) {
        attachment = `<audio class="chat-audio" controls preload="metadata" src="${escapeHTML(message.dataUrl)}"></audio>`;
      }

      return `
        <article class="chat-message ${isMine ? "my-message" : ""} ${isSelected ? "selected-message" : ""}"
          data-chat-message-id="${escapeHTML(message.id)}" aria-selected="${isSelected ? "true" : "false"}" tabindex="0" role="button">
          <div class="chat-message-heading">
            <strong>${escapeHTML(translatePlainText(message.sender))}</strong>
            <small>${escapeHTML(message.time || "")}</small>
          </div>
          ${message.text ? `<p class="chat-message-text">${escapeHTML(message.text)}${message.edited ? ` <small class="chat-edited-label">(Edited)</small>` : ""}</p>` : ""}
          ${attachment}
        </article>
      `;
    }).join("");
  }

  function refreshChatView({ preserveScroll = true } = {}) {
    const messages = $("#chatMessages");
    if (messages) {
      const oldScrollTop = messages.scrollTop;
      messages.innerHTML = renderMessages();
      if (preserveScroll) messages.scrollTop = Math.min(oldScrollTop, messages.scrollHeight);
      else messages.scrollTop = messages.scrollHeight;
    }
    const menu = $("[data-chat-menu]");
    if (menu) {
      menu.innerHTML = renderChatMenu();
      menu.classList.toggle("hidden", !chatMenuOpen);
    }
    const status = $("[data-chat-selection-status]");
    const selected = (state.messages || []).find(message => message.id === selectedChatMessageId && isMessageVisibleToCurrentUser(message));
    if (!selected) selectedChatMessageId = null;
    if (status) status.textContent = selected ? translatePlainText("Message selected") : "";
  }

  async function copySelectedChatMessage() {
    const message = (state.messages || []).find(item => item.id === selectedChatMessageId && isMessageVisibleToCurrentUser(item));
    if (!message?.text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message.text);
      } else {
        const helper = document.createElement("textarea");
        helper.value = message.text;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand("copy");
        helper.remove();
        if (!copied) throw new Error("Clipboard copy failed");
      }
      showToast(translatePlainText("Message copied.", state.language));
    } catch (_) {
      showToast(translatePlainText("Could not copy the message.", state.language));
    }
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
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      sender: state.teacher.name,
      senderId: state.teacher.id || state.teacher.name,
      senderType: state.userType,
      text: text.trim(),
      type,
      dataUrl,
      hiddenFor: [],
      seen: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    saveData();
    updateTaskNotification();

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

    // Persisted profile values are the source of truth after the first entry.
    const profile = {
      ...(teacher.profile || {}),
      ...savedProfile
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
            ${profile.photo
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

        <div class="profile-details" id="profileCoreDetails">
          <div>
            <span><i class="profile-detail-icon">▣</i> Teacher ID</span>
            <strong>${escapeHTML(profile.displayId || teacher.id || "-")}</strong>
          </div>
          <div>
            <span><i class="profile-detail-icon">◆</i> School</span>
            <strong>${escapeHTML(profile.school || teacher.school || "-")}</strong>
          </div>
          <div>
            <span><i class="profile-detail-icon">●</i> Assigned Class</span>
            <strong>${escapeHTML(profile.className || teacher.className || "-")}</strong>
          </div>
          <div>
            <span><i class="profile-detail-icon">▣</i> Subject</span>
            <strong>${escapeHTML(profile.subject || teacher.subject || "-")}</strong>
          </div>
        </div>

        <div class="profile-details profile-extra-details" id="profileExtraDetails">
          <div><span><i class="profile-detail-icon" aria-hidden="true">✉</i> Email ID</span><strong>${escapeHTML(profile.email || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">☎</i> Contact Number</span><strong>${escapeHTML(profile.contact || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">🎓</i> Qualification</span><strong>${escapeHTML(profile.qualification || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">◷</i> Teaching Experience</span><strong>${escapeHTML(profile.experience || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">★</i> Additional Role</span><strong>${escapeHTML(profile.additionalRole || "-")}</strong></div>
        </div>

        <form id="profileForm" class="form-grid profile-form" hidden>
          <label>Teacher ID<input type="text" name="displayId" maxlength="30" value="${escapeHTML(profile.displayId || teacher.id || "")}" placeholder="e.g. TCH0001"></label>
          <label>School<input type="text" name="school" maxlength="150" value="${escapeHTML(profile.school || teacher.school || "")}" placeholder="Enter school name"></label>
          <label>Assigned Class<input type="text" name="className" maxlength="50" value="${escapeHTML(profile.className || teacher.className || "")}" placeholder="e.g. Class 5A"></label>
          <label>Subject<input type="text" name="subject" maxlength="100" value="${escapeHTML(profile.subject || teacher.subject || "")}" placeholder="e.g. Mathematics"></label>
          <label>Email ID<input type="email" name="email" value="${escapeHTML(profile.email || "")}" placeholder="teacher@example.com"></label>
          <label>Contact Number<input type="tel" name="contact" maxlength="15" value="${escapeHTML(profile.contact || "")}" placeholder="Enter contact number"></label>
          <label>Qualification<input type="text" name="qualification" maxlength="150" value="${escapeHTML(profile.qualification || "")}" placeholder="e.g. B.Ed., M.A."></label>
          <label>Teaching Experience<input type="text" name="experience" maxlength="100" value="${escapeHTML(profile.experience || "")}" placeholder="e.g. 5 years"></label>
          <label class="full-width">Additional Role<input type="text" name="additionalRole" maxlength="150" value="${escapeHTML(profile.additionalRole || "")}" placeholder="e.g. Examination Coordinator"></label>
          <div class="panel-actions full-width">
            <button type="submit" class="btn btn-primary">Save Profile</button>
            <button type="button" class="btn btn-secondary" id="cancelProfileEditBtn">Cancel</button>
          </div>
        </form>

        <div class="profile-actions full-width profile-actions-bottom">
          <button type="button" class="btn btn-primary" id="editProfileBtn">Edit Profile</button>
          <button type="button" class="btn btn-secondary" id="downloadProfileBtn">Download Profile PDF</button>
        </div>
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
      if (a.complete !== b.complete) {
        return a.complete ? -1 : 1;
      }

      if (a.complete && b.complete) {
        return (
          b.percentage - a.percentage ||
          b.total - a.total ||
          Number(a.id) - Number(b.id)
        );
      }

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

    downloadCSV(rows, "shikshasetu-academic-reports.pdf");
  }

  // ---------- PDF EXPORT ----------

  function downloadCSV(rows, filename) {
    const safeRows = Array.isArray(rows) ? rows : [];
    const title = String(filename || "shikshasetu-report").replace(/\.(csv|pdf)$/i, "").replace(/[-_]+/g, " ");
    const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
    const language = state.language === "gu" ? "gu" : state.language === "hi" ? "hi" : "en";
    const logoSrc = "data:image/jpeg;base64,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/deJkgAAgkgggggggAgkoWc3fb9SggsggggggggggggggggkggggAAkgAgu6ueJ8gggggggggggggggAggggJDMcfT2QggghkggggggghgggggggggAAgglZ0ff0ggggggggggggggggggggggggkuu/bpigggggggggogggggggggggggglqkX8QgggkgggggggggggggggggggghioEjdvRgggggggggggggggggggggggp3VkoggggggggggggggggggggggggggqcgooAtbTjgggggggggkggggggggggMKUI0ggggggggggggggghgggggggggggu9ggkAJU/Zoggggggggkggggggggjjvd8Qggggggggkggggggggggggggggggqn4ziggAo7AYSgggggggggggggggggOaoQggggggggggggggggggggggggggjjVqXQEygEAF4yWwggggggggggggoggQqcAggggggggggggghie99rfTEOpDgulocffWUgCgggsAR5QggggggggggggmSVoAgggiggggggghxqM1dohDrujuouIzvti/f5IoggggglJ3zQgggggggggghFqfAggkggggggggvjm1Dbl7YMwo0PPBffpqZNd8ggggghgkHXeiggggkgggggpSTYggggggggggGZaaOfRcgAgggggggokmNDotIQggggggggkm7KQgggggggggo+9wgggggggghIkWuiQAggggEhgghAggggsoit1ggggggggggpvXyggggggggNoUoggggggkghs5xD4gggggAhZIQL3ObzwgghgnMszggggggggkl3dQggggggALwVAggggggghlFoEQAgggght2XfffU6coAgggkqRpGTAgggggggs/eyggloggiOdwggggggghL+PQgAggAAl5HXffffa3gggggkt5EhNo4AggggggknKPgghgggnpWQgggggogprNQgBAggBtzvffffPfZkgggggkk0wkp4KxgggggggCkRAggggltqagggggggmCgQgggggmSIfffffe/6a6gggggglKgggtPZwgggggghuGCggggrIQggggggghpIIwgggggnJziutRkwFyagggggpn8MAgggjxxgggggggi8aggggtwXggggggghfYAgggghihkksNvpBznWtwggggoneYAggggt2yggggigqTWQgggEAyAgggggBE7gggggggghoqkLpiRfffYbwggkVfaQhggggoFrAgggggp+fgAglvgYgggggguuRAgggggggg6SAkALPfffQUYihpvfYgggkggkGAQggggghirAAgod7AggggggjFQAgggggggkpHQgovvfPPAHihovffRgggggggrWLggggggmsgkgsqOggggggkimQgggggggoscC6gki9fPPLXYvy/faUggggggggkPwgggggtfQQgslEwggggglwqgggggggggh/wDd4IYjn3ylLDm/3308IIIIIIIILd8IIIIoJn2MIK3zQIIIIIKBoIIIIIIIK/oc4/xHIItKriGg3333UkIIIIIIIIL00AIIIIIzmpIbnx8IIIIIL80IIIIIIJKINzPX39ryxrJ4wX3331UIIIIIIIIIKPRIIIIIKoEAIKzz0KIIIIJzIIIIIIIIIIIKPdP3326evLX3333YIIIIIIIIIIJKOEIIoIKsF0IKvz0IIIIIJakIIIIIIIIIIIIIr3333k4FX33378IIIIIIIIIIIKvDKIIIKj1AIY7wcIIIIIIkIIIIIIIIIIIIIIICX333kEFGEEUIIIIIIIIIIIIKIAIIIIJ/2sIKPS8IIIIIIGgBH8kS/EYYYIIIIKL5X20FW0HrAIIIAYEXJnbY4IBEIIIIJ/mF4JBG4AIIIKIQwaDgDzy4xAQk4YIJAP3331n3OMIIIWqW7774IoUaaIKIIYJ65oIII7sAIIIIIID/AOc8888sc8eMhOCCHd9999+HGGHO+uG+662+WbqGCCCCCSXjiWCSw8gCCCCCAaT888+88888889YCCCc9995YQpQK2eySGiqCCua4oCCCCCstdCCCCm8+CCCCCA9vJIYK3LJT/gw88eCAD999wCY8CG++tAJJ+hTSXtCCiCCCv8AbwgggkvPgggggAluDolbS0sfhTuMnLOgkmPec+nbnu/TmTMSAgVtVOjjwgggnPUAkggBnqogggivTCABDCAAFPLTSHPL+0TivYUWvoSvpHWAAHADHAPOI5wgghX04gggggnfRggAGFfIFHPLEh1MPIAaN03RnTalH/gLYofUdHAN/POPPABMCggrGfgkggggsKHAghmEO3YbX+bZOVy2zolRHlos8l/7UQlxksLa7IaXFD1ZO2BAgltyQggggggl4xwkaM9t/icEY0ZQZiA7jNJH8FWA3w5836DId6fUXgJwcjjeIwquUggggghiokgSTgpsjUHbQQQQTQQdaQVT0m1Zyu/RbThTfeQQcaQQQTVXXC4pgI8wggggggggky+evLQeYSyg6OyhIgTkcRfS+xc1TxicN/eNVhOiqZgTEsUDeetaMggggggggggD7V1U+UckggggggggsoTP9fQHPqhSRw/s9AsggggkovAq+T23ruAggggghggggkeQgggggggggggggggggggmoRokdcKIggggggggggggggAkjc7Qgggggggggggt9tdAgAAgigggggigggggks98UbnMgggggggggggggggghoWdkgggogggggggggmVt7QggkggggggogggggguokI8YgggggggogggggggggrGeswggggggigkgggggueyogggggggkguggggggggggggggggggggoggggggjtt+m4ggggggggggggggggv76qAgggggggggggggggggggggggggggggggggghpTwowggggggggggggkgggggq71oigggggggggggggggggggggggggggggggggipdrggggggggggggggggggggghDnXTggggggggggggggggkggggggggggggklSfcewggggggggggggggggggggggi9PbVCggggggggggggggggggggggggggBg7TQOQgggglgggkggggggggggggggkoX+TzwAgghgggggggggggggggggggjmGSc0gggggggggkgggggggggkoggghggggndvbhQzggggggggggggggggggikTDc7KwggggggggggkgggggghggggggggggggkqRXfb1pwggggAAggggggjkPPH/d3QggggogggggggggggggggggghggggggggggohvH/AH2nsP6Y8g8tnlZXJXnp7goIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIBLAjU7TSY1kF3W93z8V6IGIIIIIIIIIJIIJKIIIIIIIIIIIIIoIIIIIIIIIIIIIIACKKPY1y4vYqhwOBIIIIoIIIIIIIIIIIIIIKIIIIIIIIIKIIIIIIIIIIIIIIIIIIIIIIADAIoAJIIIIIIIIKIIIIIIIKIIIIIIIIIIb/xAAC/9oADAMBAAIA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";
    const isMealReport = /midday-meal-register/i.test(String(filename || ""));
    const isMonthlyAttendance = /monthly[\s_-]*attendance/i.test(String(filename || "")) && safeRows.length > 1 && Array.isArray(safeRows[0]) && safeRows[0].length > 20;
    const makeTable = (indexes, rows, heading = "") => `${heading ? `<h2 class="section-title">${esc(heading)}</h2>` : ""}<table class="${isMonthlyAttendance ? "attendance-table" : ""}"><colgroup>${indexes.map((idx, pos) => `<col class="${pos === 0 ? "roll-col" : pos === 1 ? "name-col" : ""}">`).join("")}</colgroup><thead><tr>${indexes.map(idx => `<th>${esc(safeRows[0][idx])}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${indexes.map((idx, pos) => `<td class="${pos === 0 ? "roll-cell" : pos === 1 ? "student-name" : ""}">${esc(row[idx])}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    let table;
    if (isMealReport) {
      const entries = Object.entries(state.meals || {}).sort((a, b) => a[0].localeCompare(b[0]));
      const students = classStudents();
      table = entries.length ? entries.map(([date, meal]) => {
        const records = meal.students || {};
        const menu = meal.menu || getMealMenuForDate(date);
        const body = students.map((student, index) => {
          const served = records[student.id] === "Served";
          return `<tr><td>${index + 1}</td><td class="student-name">${esc(student.name)}</td><td class="meal-mark">${served ? "✓" : ""}</td><td class="meal-mark">${served ? "" : "✓"}</td></tr>`;
        }).join("");
        return `<section class="meal-date-section"><div class="meal-date-heading"><h2>Date: ${esc(date)}</h2><p><strong>Menu:</strong> ${esc(menu)}</p></div><table class="meal-report-table"><thead><tr><th>Sr. No.</th><th>Student Name</th><th>Served</th><th>Not Served</th></tr></thead><tbody>${body}</tbody></table></section>`;
      }).join("") : `<p>No saved meal records available.</p>`;
    } else if (isMonthlyAttendance) {
      // Keep roll number and student name on every page; split the month into two readable panels.
      // This prevents the wide 35+ column register from being clipped at either edge.
      const last = safeRows[0].length - 1;
      const dayStart = 2;
      const dayEnd = Math.min(last, 33);
      const totalStart = Math.min(34, safeRows[0].length);
      const firstDays = Array.from({ length: Math.min(16, Math.max(0, dayEnd - dayStart + 1)) }, (_, i) => dayStart + i);
      const secondDays = Array.from({ length: Math.max(0, dayEnd - (dayStart + firstDays.length) + 1) }, (_, i) => dayStart + firstDays.length + i);
      const totals = Array.from({ length: Math.max(0, safeRows[0].length - totalStart) }, (_, i) => totalStart + i);
      const rows = safeRows.slice(1);
      table = `<div class="attendance-page">${makeTable([0, 1, ...firstDays], rows, "Monthly Attendance Register — Days 1–16")}</div>` +
        `<div class="attendance-page second-attendance-page">${makeTable([0, 1, ...secondDays, ...totals], rows, "Monthly Attendance Register — Days 17–End & Summary")}</div>`;
    } else {
      const indexes = safeRows.length && Array.isArray(safeRows[0]) ? safeRows[0].map((_, i) => i) : [0];
      table = makeTable(indexes, safeRows.slice(1));
    }
    const html = `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><title>${esc(title)}</title><style>
      *{box-sizing:border-box}html,body{width:100%;margin:0;padding:0}body{font-family:Arial,"Noto Sans Gujarati","Noto Sans Devanagari",sans-serif;color:#443331;background:#fff;padding:0}
      .report-head{display:flex;align-items:center;gap:6mm;width:100%;max-width:100%;border-bottom:3px solid #8b3935;padding:0 0 4mm;margin:0 0 4mm;break-inside:avoid;page-break-inside:avoid;min-height:25mm;overflow:visible}
      .logo-frame{width:25mm;height:25mm;flex:0 0 25mm;display:flex;align-items:center;justify-content:center;overflow:visible}.logo{display:block;width:23mm;height:23mm;max-width:23mm;object-fit:contain;object-position:center}.brand{font-size:9pt;color:#98736c;margin:0 0 1mm;font-weight:700;letter-spacing:.4px}.school-name{font-size:11pt;color:#443331;font-weight:700;margin:0 0 1mm}.report-head h1{font-size:15pt;color:#984843;margin:0 0 1mm;overflow-wrap:anywhere}.meta{font-size:8pt;color:#7d716e;margin:0}.section-title{font-size:10pt;color:#984843;margin:0 0 2mm}
      table{width:100%;max-width:100%;border-collapse:collapse;table-layout:auto;font-size:8pt;margin:0 0 3mm}th,td{border:1px solid #d8c4bd;padding:1.6mm 1.2mm;text-align:center;vertical-align:middle;overflow-wrap:break-word;word-break:normal;white-space:normal}th{background:#8b3935!important;color:#fff!important;font-weight:700;-webkit-print-color-adjust:exact;print-color-adjust:exact}.roll-col{width:14mm}.name-col{width:38mm}td.roll-cell{width:14mm;white-space:nowrap;font-weight:600}td.student-name{width:38mm;min-width:30mm;text-align:left;white-space:nowrap;overflow-wrap:normal;word-break:keep-all;font-weight:500}.attendance-table{font-size:7.4pt;table-layout:fixed}.attendance-table th,.attendance-table td{padding:1.5mm .9mm;line-height:1.15}.attendance-table th:first-child,.attendance-table td:first-child{width:14mm}.attendance-table th:nth-child(2),.attendance-table td:nth-child(2){width:38mm}.attendance-table th:nth-child(n+3){font-size:7.2pt}.attendance-table td:nth-child(n+3){white-space:nowrap}.attendance-page{width:100%;max-width:100%;overflow:visible;break-inside:avoid;page-break-inside:avoid}.second-attendance-page{break-before:page;page-break-before:always}tbody tr:nth-child(even) td{background:#fbf5f2;-webkit-print-color-adjust:exact;print-color-adjust:exact}tr{break-inside:avoid;page-break-inside:avoid}
      .meal-date-section{break-before:page;page-break-before:always;break-inside:auto}.meal-date-section:first-of-type{break-before:auto;page-break-before:auto}.meal-date-heading{background:#fbf5f2;border:1px solid #d8c4bd;border-left:4px solid #8b3935;padding:3mm 4mm;margin:0 0 3mm;break-after:avoid}.meal-date-heading h2{font-size:12pt;color:#984843;margin:0 0 1.5mm}.meal-date-heading p{font-size:9pt;margin:0}.meal-report-table{font-size:9pt;table-layout:fixed}.meal-report-table th:nth-child(1){width:18mm}.meal-report-table th:nth-child(2){width:95mm}.meal-report-table td.student-name{text-align:left;white-space:nowrap}.meal-report-table .meal-mark{font-size:15pt;font-weight:700;color:#52734b;width:35mm}.meal-report-table th:nth-child(4),.meal-report-table td:nth-child(4){color:#a53535}.meal-date-section tr{break-inside:avoid;page-break-inside:avoid}
      @page{size:A4 portrait;margin:12mm}@media print{html,body{width:auto;padding:0}.report-head{break-inside:avoid}.attendance-page{width:100%}table{break-inside:auto}thead{display:table-header-group}tfoot{display:table-footer-group}}
      </style></head><body><header class="report-head"><div class="logo-frame"><img class="logo" src="${logoSrc}" alt="School logo"></div><div><p class="brand">SHIKSHASETU · SMART SCHOOL ADMIN</p><p class="school-name">GOVERNMENT PRIMARY SCHOOL</p><h1>${esc(title)}</h1><p class="meta">${esc(new Date().toLocaleString(LANGUAGE_LOCALES[language] || "en-IN"))}</p></div></header>${table}</body></html>`;

    const pdfName = String(filename || "shikshasetu-report.pdf").replace(/\.csv$/i, ".pdf");
    // Parse the report body and styles separately. Inserting a complete HTML document
    // into a div makes browsers move its head/styles elsewhere and can produce blank PDFs.
    if (typeof window.html2pdf === "function") {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const container = document.createElement("div");
      container.setAttribute("aria-hidden", "true");
      container.style.cssText = "position:fixed;left:0;top:0;width:1400px;max-width:1400px;z-index:2147483000;background:#fff;color:#443331;padding:30px;overflow:visible;";
      const style = document.createElement("style");
      style.textContent = parsed.head.querySelector("style")?.textContent || "";
      container.appendChild(style);
      const reportBody = document.createElement("div");
      reportBody.style.cssText = "display:block;width:100%;max-width:100%;margin:0;padding:0;background:#fff;overflow:visible;";
      reportBody.innerHTML = parsed.body.innerHTML;
      container.appendChild(reportBody);
      document.body.appendChild(container);
      const logo = container.querySelector("img.logo");
      const makePdf = () => window.html2pdf().set({
        margin: 10,
        filename: pdfName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0, windowWidth: 1400, logging: false },
        jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
        pagebreak: { mode: ["css", "legacy"] }
      }).from(reportBody).save();
      const ready = logo && !logo.complete ? new Promise(resolve => { logo.onload = resolve; logo.onerror = resolve; }) : Promise.resolve();
      ready.then(() => makePdf()).then(() => {
        container.remove();
        showToast(language === "gu" ? "PDF ડાઉનલોડ થઈ ગયો." : language === "hi" ? "PDF डाउनलोड हो गया।" : "PDF downloaded.");
      }).catch(() => {
        container.remove();
        openPrintFallback(html, language);
      });
      return;
    }
    openPrintFallback(html, language);
  }

  function openPrintFallback(html, language) {
    const win = window.open("", "_blank");
    if (!win) {
      showToast(language === "gu" ? "PDF માટે પોપ-અપની મંજૂરી આપો." : language === "hi" ? "PDF के लिए पॉप-अप की अनुमति दें।" : "Allow pop-ups to create your PDF.");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.addEventListener("load", () => { win.focus(); setTimeout(() => win.print(), 400); }, { once: true });
    showToast(language === "gu" ? "પ્રિન્ટ વિન્ડોમાં Save as PDF પસંદ કરો." : language === "hi" ? "प्रिंट विंडो में Save as PDF चुनें।" : "Choose Save as PDF in the print window.");
  }

  function exportData(type) {
    let rows;
    let filename;

    if (type === "students") {
      rows = [
        ["Roll No.", "Student Name", "Mobile No.", "Address", "Class"],
        ...classStudents().map((student, index) => [
          index + 1, student.name, student.mobileNo || student.parentContact || "Not provided",
          student.address || "Not provided", student.className
        ])
      ];
      filename = "shikshasetu-students.pdf";
    } else if (type === "attendance") {
      const date = today();
      const records = state.attendance[date] || {};
      rows = [
        ["Roll No.", "Student Name", "Attendance"],
        ...classStudents().map((student, index) => [
          index + 1,
          student.name,
          records[student.id] === "Present" ? "Present" : "Absent"
        ])
      ];
      filename = `attendance-${date}.pdf`;
    } else if (type === "meals") {
      downloadCSV([], "shikshasetu-midday-meal-register.pdf");
      return;
    } else {
      const options = getReportOptionsFromUI();
      rows = getReportRows(options.type, options);
      if (!rows) {
        showToast("Please select a valid report period.");
        return;
      }
      if (rows.reportMeta.totalSavedMarks === 0) {
        showToast("No saved attendance is available for this period.");
        return;
      }
      const periodKey = options.type === "weekly"
        ? `${options.startDate}-to-${options.endDate}`
        : options.type === "monthly"
          ? options.month
          : `academic-year-${options.year}-${Number(options.year) + 1}`;
      filename = `shikshasetu-${options.type}-attendance-${periodKey}.pdf`;
    }

    downloadCSV(rows, filename);
  }

  // ---------- PARENT PORTAL ----------
  function renderParentDashboard() {
    const child = state.teacher?.child || { name: "Aarav Patel", className: "Class 5A", roll: "1" };

    const notices = (Array.isArray(state.notices) ? state.notices : [])
      .slice()
      .sort((a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
      );

    const locale = state.language === "gu" ? "gu-IN" : state.language === "hi" ? "hi-IN" : "en-IN";
    const noticeMarkup = notices.length
      ? `<div class="parent-published-notices">${notices.map(notice => {
        let publishedLabel = "";
        if (notice.publishedAt) {
          const publishedDate = new Date(notice.publishedAt);
          if (!Number.isNaN(publishedDate.getTime())) {
            publishedLabel = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(publishedDate);
          }
        }
        const body = escapeHTML(notice.body || "").replace(/\r?\n/g, "<br>");
        return `<article class="parent-published-notice">
            <div class="parent-published-notice-heading">
              <h4>${escapeHTML(notice.title || "School Notice")}</h4>
              <span class="pill green">Published</span>
            </div>
            <div class="parent-published-notice-body">${body}</div>
            <p class="muted small parent-published-notice-meta">${escapeHTML(notice.author || "School Teacher")}${publishedLabel ? ` · ${escapeHTML(publishedLabel)}` : ""}</p>
          </article>`;
      }).join("")}</div>`
      : `<div class="parent-notices-empty"><p>No school notices have been published yet.</p><p class="muted small">Notices published by the teacher will appear here.</p></div>`;

    return `<section class="parent-welcome panel">
        <p class="muted">PARENT PORTAL</p>
        <h2>Welcome, ${escapeHTML(state.teacher.name)}</h2>
        <p>Here are the latest updates for <strong>${escapeHTML(child.name)}</strong>.</p>
      </section>
      <section class="panel parent-quick-access-panel">
        <div class="panel-heading"><h3>Quick Access</h3></div>
        <div class="parent-quick-links">
          <button class="action-card parent-action-card" data-go="parentProfile" title="View Student's Information">
            <span>◉</span><strong>Student's Information</strong><small>View your child's details</small>
          </button>
          <button class="action-card parent-action-card" data-go="parentChat" title="Message Teacher">
            <span>☏</span><strong>Message Teacher</strong><small>Contact the class teacher</small>
          </button>
          <button class="action-card parent-action-card" data-go="parentMeals" title="View Meal Menu">
            <span>🍲</span><strong>Meal Menu</strong><small>View this week's meals</small>
          </button>
        </div>
      </section>
      <section class="panel parent-school-notice">
        <div class="panel-header"><h3>School Notice</h3><span class="muted small">${notices.length} notice${notices.length === 1 ? "" : "s"}</span></div>
        ${noticeMarkup}
      </section>`;
  }

  function renderParentFaculty() {
    return `<section class="panel parent-faculty-panel">
        <div class="panel-header">
          <div>
            <h3>Faculty Members</h3>
            <p class="muted">Teacher names, subjects and contact numbers</p>
          </div>
        </div>
        <div class="parent-faculty-grid">
          ${PARENT_FACULTY_MEMBERS.map(member => {
      const photo = getTeacherProfilePhoto(member.id);
      const avatar = photo
        ? `<img class="parent-faculty-avatar-img" src="${escapeHTML(photo)}" alt="${escapeHTML(member.name)} profile photo">`
        : `<div class="parent-faculty-avatar" aria-hidden="true">${escapeHTML(initials(member.name))}</div>`;
      return `
            <article class="parent-faculty-card">
              ${avatar}
              <div class="parent-faculty-main">
                <h4>${escapeHTML(member.name)}</h4>
                <p class="parent-faculty-subject">${escapeHTML(member.subject)}</p>
                <a class="parent-faculty-phone" href="tel:${escapeHTML(member.mobile.replace(/[^+0-9]/g, ""))}">
                  <span aria-hidden="true">☎</span> ${escapeHTML(member.mobile)}
                </a>
              </div>
            </article>
          `;
    }).join("")}
        </div>
        <p class="muted small parent-faculty-note">Demo contact numbers are sample data. Replace them with your school's verified faculty numbers before using this website for real contacts.</p>
      </section>`;
  }

  // Read the same saved attendance register used by the Teacher portal.
  // A day counts only when the matching student has an explicit Present/Absent value.
  function getParentAttendanceSummary(parentAccount = state.teacher) {
    const child = parentAccount?.child || {};
    const childName = String(child.name || "").trim().toLowerCase();
    const roll = String(child.roll || "").trim();
    const student = state.students.find(item =>
      (roll && String(item.id) === roll) ||
      (childName && String(item.name || "").trim().toLowerCase() === childName)
    );

    if (!student) return { presentDays: 0, totalRecordedDays: 0, absentDays: 0, percentage: null };

    let presentDays = 0;
    let absentDays = 0;
    Object.values(state.attendance || {}).forEach(records => {
      const status = records && records[student.id];
      if (status === "Present") presentDays += 1;
      else if (status === "Absent") absentDays += 1;
    });

    const totalRecordedDays = presentDays + absentDays;
    return {
      presentDays,
      absentDays,
      totalRecordedDays,
      percentage: totalRecordedDays ? Math.round((presentDays / totalRecordedDays) * 100) : null
    };
  }


  function renderParentAttendance() {
    const child = state.teacher?.child || {};
    const summary = getParentAttendanceSummary(state.teacher);

    const percentText =
      summary.percentage === null ? "—" : `${summary.percentage}%`;

    const progressWidth =
      summary.percentage === null
        ? 0
        : Math.max(0, Math.min(100, summary.percentage));

    const recordedText = summary.totalRecordedDays
      ? `Out of ${summary.totalRecordedDays} days with attendance recorded`
      : "No attendance has been recorded by the teacher yet.";

    // Show the highlighted warning only when attendance is below 75%.
    const attendanceWarning =
      summary.percentage !== null && summary.percentage < 75
        ? `
        <article class="parent-attendance-warning" role="alert">
          <div class="attendance-warning-icon">!</div>
          <div>
            <h3>Attendance Needs Improvement</h3>
            <p>
              Your child's attendance is currently
              <strong>${summary.percentage}%</strong>, which is below
              the required 75%.
            </p>
            <p>
              Regular school attendance helps children learn better,
              participate in classroom activities, and stay on track
              with their studies. Please encourage your child to attend
              school every day.
            </p>
            <strong class="attendance-warning-footer">
              “Be present. Keep learning. Dream big. Every school day matters!”
            </strong>
          </div>
        </article>
      `
        : "";

    return `
    <section class="panel parent-attendance-panel">
      <h2>${escapeHTML(child.name || "Your Child")} — Attendance</h2>

      <p class="muted">
        Attendance summary calculated from the teacher's saved attendance register.
      </p>

      <div class="stats-grid parent-attendance-stats">
        <article class="stat-card">
          <span class="stat-label">Attendance Percentage</span>
          <strong class="stat-value">${percentText}</strong>
          <div
            class="parent-attendance-track"
            aria-label="Attendance ${percentText}"
          >
            <span style="width:${progressWidth}%"></span>
          </div>
        </article>

        <article class="stat-card">
          <span class="stat-label">Total Present Days</span>
          <strong class="stat-value">${summary.presentDays}</strong>
          <span class="muted">${escapeHTML(recordedText)}</span>
        </article>
      </div>

      ${attendanceWarning}

      <p class="muted small">
        Only dates marked Present or Absent in the teacher's register are counted.
      </p>
    </section>
  `;
  }


  function renderParentChat() {
    // Reuse the existing chat form, but label it for the parent portal.
    return renderChat()
      .replaceAll("Teacher Group Chat", "Parent–Teacher Chat")
      .replaceAll("Share messages, photos and voice notes", "Send a message to your child's class teacher");
  }

  function renderParentProfile() {
    const c = state.teacher?.child || {};
    const rows = [["Student name", c.name], ["Class", c.className], ["Roll number", c.roll], ["Date of birth", c.dob], ["Blood group", c.bloodGroup], ["Parent contact", c.guardianPhone], ["Address", c.address]];
    return `<section class="panel"><h2>Student's Information</h2><p class="muted">Student details linked to this demo parent account.</p><div class="parent-info-grid">${rows.map(([label, value]) => `<div class="parent-info-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value || "Not provided")}</strong></div>`).join("")}</div></section>`;
  }

  function getParentProfileDetails() {
    const parent = state.teacher;
    const child = parent?.child || {};
    const parentDefaults = {
      PAR0001: {
        fatherName: "Rakesh Patel", fatherMobile: "9876543211", fatherEmail: "father.par0001@example.com",
        motherName: "Nisha Patel", motherMobile: "9876543222", motherEmail: "mother.par0001@example.com"
      },
      PAR0002: {
        fatherName: "Kirit Shah", fatherMobile: "9876500001", fatherEmail: "father.par0002@example.com",
        motherName: "Minal Shah", motherMobile: "9876500002", motherEmail: "mother.par0002@example.com"
      },
      PAR0003: {
        fatherName: "Mahesh Joshi", fatherMobile: "9876502345", fatherEmail: "father.par0003@example.com",
        motherName: "Kavita Joshi", motherMobile: "9876502346", motherEmail: "mother.par0003@example.com"
      },
      PAR0004: {
        fatherName: "Sanjay Desai", fatherMobile: "9876503456", fatherEmail: "father.par0004@example.com",
        motherName: "Pooja Desai", motherMobile: "9876503457", motherEmail: "mother.par0004@example.com"
      },
      PAR0005: {
        fatherName: "", fatherMobile: "7863082585", fatherEmail: "father.par0005@example.com",
        motherName: "", motherMobile: "", motherEmail: "mother.par0005@example.com"
      },
      PAR0006: {
        fatherName: "", fatherMobile: "9723647071", fatherEmail: "father.par0006@example.com",
        motherName: "", motherMobile: "", motherEmail: "mother.par0006@example.com"
      },
      PAR0007: {
        fatherName: "", fatherMobile: "7284880281", fatherEmail: "father.par0007@example.com",
        motherName: "", motherMobile: "", motherEmail: "mother.par0007@example.com"
      }
    };
    const defaults = {
      ...(parentDefaults[parent?.id] || parentDefaults.PAR0001),
      address: child.address || "Petlad, Gujarat"
    };
    const saved = readJSON("shikshasetu_parent_profile_" + (parent?.id || "unknown"), {});
    return { ...defaults, ...(saved && typeof saved === "object" ? saved : {}) };
  }

  function renderParentFamilyProfile() {
    const parent = state.teacher;
    if (!parent) return "";
    const child = parent.child || {};
    const profile = getParentProfileDetails();
    const parentInitials = initials(parent.name || "Parent");

    return `
      <section class="panel profile-card parent-family-profile-card">
        <div class="profile-top">
          <div class="profile-avatar-wrap">
            ${profile.photo
        ? `<img src="${escapeHTML(profile.photo)}" class="profile-photo" alt="Parent profile photo">`
        : `<div class="profile-avatar">${escapeHTML(parentInitials)}</div>`}
            <label class="profile-camera-btn" title="Change profile photo">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <input type="file" id="parentProfilePhotoInput" accept="image/*" hidden>
            </label>
          </div>
          <h2>${escapeHTML(parent.name || "Parent Profile")}</h2>
          <p>Parent / Guardian</p>
          <small class="muted">Tap the camera icon to change your photo.</small>
        </div>

        <div class="profile-details" id="parentCoreDetails">
          <div><span><i class="profile-detail-icon">◆</i> Student</span><strong>${escapeHTML(profile.childName || child.name || "Not provided")}</strong></div>
          <div><span><i class="profile-detail-icon">●</i> Class</span><strong>${escapeHTML(profile.className || child.className || parent.className || "Not provided")}</strong></div>
          <div><span><i class="profile-detail-icon">⌂</i> School</span><strong>${escapeHTML(profile.school || parent.school || "Not provided")}</strong></div>
        </div>

        <div class="profile-details parent-profile-readonly" id="parentProfileDetails">
          <div><span><i class="profile-detail-icon" aria-hidden="true">♙</i> Father's Name</span><strong>${escapeHTML(profile.fatherName || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">☎</i> Father's Mobile Number</span><strong>${escapeHTML(profile.fatherMobile || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">✉</i> Father's Email ID</span><strong class="profile-email">${escapeHTML(profile.fatherEmail || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">♙</i> Mother's Name</span><strong>${escapeHTML(profile.motherName || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">☎</i> Mother's Mobile Number</span><strong>${escapeHTML(profile.motherMobile || "-")}</strong></div>
          <div><span><i class="profile-detail-icon" aria-hidden="true">✉</i> Mother's Email ID</span><strong class="profile-email">${escapeHTML(profile.motherEmail || "-")}</strong></div>
          <div class="full-width"><span><i class="profile-detail-icon" aria-hidden="true">⌂</i> Home Address</span><strong>${escapeHTML(profile.address || "-")}</strong></div>
        </div>

        <form id="parentProfileForm" class="form-grid profile-form" hidden>
          <label>Student<input type="text" name="childName" maxlength="120" value="${escapeHTML(profile.childName || child.name || "")}" placeholder="Enter student's name"></label>
          <label>Class<input type="text" name="className" maxlength="50" value="${escapeHTML(profile.className || child.className || parent.className || "")}" placeholder="e.g. Class 5A"></label>
          <label>School<input type="text" name="school" maxlength="150" value="${escapeHTML(profile.school || parent.school || "")}" placeholder="Enter school name"></label>
          <h3 class="full-width parent-profile-section-title">Father's Information</h3>
          <label>Father's Name
            <input type="text" name="fatherName" maxlength="120" value="${escapeHTML(profile.fatherName || "")}" placeholder="Enter father's full name" required>
          </label>
          <label>Father's Mobile Number
            <input type="tel" name="fatherMobile" maxlength="20" value="${escapeHTML(profile.fatherMobile || "")}" placeholder="Enter father's mobile number" pattern="[0-9+()\-\s]{7,20}" required>
          </label>
          <label class="full-width">Father's Email ID
            <input type="email" name="fatherEmail" maxlength="150" value="${escapeHTML(profile.fatherEmail || "")}" placeholder="Enter father's email address" required>
          </label>

          <h3 class="full-width parent-profile-section-title">Mother's Information</h3>
          <label>Mother's Name
            <input type="text" name="motherName" maxlength="120" value="${escapeHTML(profile.motherName || "")}" placeholder="Enter mother's full name" required>
          </label>
          <label>Mother's Mobile Number
            <input type="tel" name="motherMobile" maxlength="20" value="${escapeHTML(profile.motherMobile || "")}" placeholder="Enter mother's mobile number" pattern="[0-9+()\-\s]{7,20}" required>
          </label>
          <label class="full-width">Mother's Email ID
            <input type="email" name="motherEmail" maxlength="150" value="${escapeHTML(profile.motherEmail || "")}" placeholder="Enter mother's email address" required>
          </label>

          <h3 class="full-width parent-profile-section-title">Home Address</h3>
          <label class="full-width">Address
            <textarea name="address" rows="3" maxlength="500" placeholder="Enter full home address" required>${escapeHTML(profile.address || "")}</textarea>
          </label>
          <div class="panel-actions full-width">
            <button type="submit" class="btn btn-primary">Save Parent Profile</button>
            <button type="button" class="btn btn-secondary" id="cancelParentProfileEditBtn">Cancel</button>
          </div>
        </form>
        <div class="profile-actions full-width profile-actions-bottom">
          <button type="button" class="btn btn-primary" id="editParentProfileBtn">Edit Profile</button>
          <button type="button" class="btn btn-secondary" id="downloadParentProfileBtn">Download Profile PDF</button>
        </div>
      </section>`;
  }

  function renderWeeklyMealMenu() {
    return `<section class="panel weekly-meal-menu-panel">
      <div class="panel-header"><div><h3>Weekly Midday Meal Menu</h3><p class="muted">Same weekly menu for teachers and parents.</p></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Day</th><th>Meal menu</th></tr></thead>
      <tbody>${WEEKLY_MEAL_MENU.map(([day, meal]) => `<tr><td><strong>${escapeHTML(day)}</strong></td><td>${escapeHTML(meal)}</td></tr>`).join("")}</tbody></table></div>
    </section>`;
  }

  function renderParentMeals() {
    return renderWeeklyMealMenu();
  }

  // ---------- PARENT HOLIDAY LIST ----------
  // This data is styled as a real table, rather than displaying the reference image.
  const SCHOOL_HOLIDAYS_2026_27 = [
    { month: "June 2026", date: "13 Jun 2026 (Sat)", name: "Bakri Eid", type: "Religious" },
    { month: "June 2026", date: "29 Jun 2026 (Mon)", name: "Rath Yatra", type: "Festival" },
    { month: "July 2026", date: "31 Jul 2026 (Fri)", name: "Id-ul-Zuha (Bakrid)", type: "Religious" },
    { month: "August 2026", date: "15 Aug 2026 (Sat)", name: "Independence Day", type: "National" },
    { month: "August 2026", date: "22 Aug 2026 (Sat)", name: "Raksha Bandhan", type: "Festival" },
    { month: "September 2026", date: "05 Sep 2026 (Sat)", name: "Janmashtami", type: "Religious" },
    { month: "October 2026", date: "02 Oct 2026 (Fri)", name: "Gandhi Jayanti", type: "National" },
    { month: "October 2026", date: "20 Oct 2026 (Tue)", name: "Diwali (Holiday begins)", type: "Festival" },
    { month: "November 2026", date: "21 Nov 2026 (Sat)", name: "Diwali Vacation Starts", type: "Vacation" },
    { month: "November 2026", date: "30 Nov 2026 (Mon)", name: "Diwali Vacation Ends", type: "Vacation" },
    { month: "December 2026", date: "25 Dec 2026 (Fri)", name: "Christmas", type: "Religious" },
    { month: "January 2027", date: "26 Jan 2027 (Tue)", name: "Republic Day", type: "National" },
    { month: "February 2027", date: "19 Feb 2027 (Fri)", name: "Maha Shivratri", type: "Religious" },
    { month: "March 2027", date: "11 Mar 2027 (Thu)", name: "Holi", type: "Festival" },
    { month: "April 2027", date: "02 Apr 2027 (Fri)", name: "Good Friday", type: "Religious" },
    { month: "May 2027", date: "01 May 2027 (Sat)", name: "Summer Vacation Starts", type: "Vacation" },
    { month: "May 2027", date: "31 May 2027 (Mon)", name: "Summer Vacation Ends", type: "Vacation" }
  ];

  function renderParentHolidayList() {
    const groupedMonths = [];
    SCHOOL_HOLIDAYS_2026_27.forEach(holiday => {
      let group = groupedMonths[groupedMonths.length - 1];
      if (!group || group.month !== holiday.month) {
        group = { month: holiday.month, items: [] };
        groupedMonths.push(group);
      }
      group.items.push(holiday);
    });

    const rows = groupedMonths.map(group => group.items.map((holiday, index) => `
      <tr>
        ${index === 0 ? `<td class="holiday-month-cell" rowspan="${group.items.length}"><span>${escapeHTML(group.month)}</span></td>` : ""}
        <td class="holiday-date-cell">${escapeHTML(holiday.date)}</td>
        <td class="holiday-name-cell">${escapeHTML(holiday.name)}</td>
        <td><span class="holiday-type holiday-type-${holiday.type.toLowerCase()}">${escapeHTML(holiday.type)}</span></td>
      </tr>`).join("")).join("");

    return `<div class="parent-holiday-page">
      <section class="holiday-hero">
        <div class="holiday-hero-main">
          <div class="holiday-emblem" aria-hidden="true">🏫</div>
          <div class="holiday-hero-copy">
            <p class="holiday-school-name">Government School</p>
            <h2>Student Holiday List</h2>
            <p class="holiday-academic-year">Academic Year 2026 - 27</p>
          </div>
        </div>
        <div class="holiday-calendar-tag"><span class="holiday-calendar-symbol" aria-hidden="true">▦</span><span>Holiday Calendar</span></div>
      </section>

      <section class="panel holiday-list-panel">
        <div class="panel-header holiday-list-header">
          <div>
            <h3>School Holidays</h3>
            <p class="muted">Festivals, national holidays and vacation dates</p>
          </div>
          <span class="holiday-count">${SCHOOL_HOLIDAYS_2026_27.length} Holidays</span>
        </div>
        <div class="holiday-table-wrap">
          <table class="holiday-table" aria-label="Student holiday list for academic year 2026 to 2027">
            <thead><tr><th>Month</th><th>Date / Date Range</th><th>Holiday Name</th><th>Type</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="holiday-note">Dates are shown as provided in the sample holiday schedule.</p>
      </section>
    </div>`;
  }

  // ---------- PAGE RENDERER ----------

  function renderPage(page) {
    if (!state.teacher) return "";

    // Keep the parent portal separate from teacher-only sections.
    const parentPages = ["parentDashboard", "parentAttendance", "parentProfile", "parentFamilyProfile", "parentChat", "parentMeals", "parentHolidayList", "parentFaculty"];
    if (state.userType === "parent" && page !== "notifications" && !parentPages.includes(page)) page = "parentDashboard";
    if (state.userType === "teacher" && parentPages.includes(page)) page = "dashboard";

    const pages = {
      dashboard: renderDashboard,
      classes: renderClasses,
      attendance: renderAttendance,
      meals: renderMeals,
      reports: renderReports,
      academics: renderAcademicReports,
      assistant: renderAssistant,
      chat: renderChat,
      profile: renderProfile,
      notifications: renderNotifications,
      parentDashboard: renderParentDashboard,
      parentAttendance: renderParentAttendance,
      parentProfile: renderParentProfile,
      parentFamilyProfile: renderParentFamilyProfile,
      parentChat: renderParentChat,
      parentMeals: renderParentMeals,
      parentHolidayList: renderParentHolidayList,
      parentFaculty: renderParentFaculty
    };

    const html = pages[page] ? pages[page]() : renderDashboard();
    // Keep an in-page Back button on detail pages for both user roles.
    if (state.userType === "parent" && page !== "parentDashboard") {
      return `<div class="parent-back-row"><button type="button" class="btn btn-secondary parent-back-btn" data-go="parentDashboard">← Back to Dashboard</button></div>${html}`;
    }
    if (state.userType === "teacher" && page !== "dashboard") {
      return `<div class="teacher-back-row"><button type="button" class="btn btn-secondary teacher-back-btn" data-go="dashboard">← Back to Dashboard</button></div>${html}`;
    }
    return html;
  }

  // ---------- EVENT HANDLERS ----------

  function bindEvents() {
    ["languageSelectLogin", "languageSelectApp"].forEach(id => {
      const selector = document.getElementById(id);
      selector?.addEventListener("change", event => setWebsiteLanguage(event.target.value));
    });

    // Save attendance whenever a checkbox changes.
    document.addEventListener("change", event => {
      const languageSelect = event.target instanceof Element
        ? event.target.closest(".parent-call-language")
        : null;
      if (languageSelect) {
        const student = state.students.find(item => String(item.id) === String(languageSelect.dataset.student));
        if (student) {
          student.alertLanguage = languageSelect.value;
          saveData();
        }
        return;
      }
      const checkbox = event.target instanceof Element
        ? event.target.closest(".attendance-checkbox")
        : null;
      if (!checkbox) return;
      handleAttendanceCheckboxChange(checkbox);
    });

    // Midday meal: each student can be either Served or Not Served.
    document.addEventListener("change", event => {
      const checkbox = event.target instanceof Element ? event.target.closest(".meal-status-checkbox") : null;
      if (!checkbox) return;
      const date = $("#mealDateInput")?.value || today();
      const studentId = checkbox.dataset.student;
      // One attendance-style checkbox: checked = Served, unchecked = Not Served.
      const meal = state.meals[date] || { menu: getMealMenuForDate(date), students: {}, notes: "" };
      meal.students = { ...(meal.students || {}) };
      const status = checkbox.checked ? "Served" : "Not Served";
      meal.students[studentId] = status;
      const statusText = checkbox.closest("label")?.querySelector(".meal-status-text");
      if (statusText) statusText.textContent = status;
      const students = classStudents();
      meal.served = students.filter(student => meal.students[student.id] === "Served").length;
      meal.notServed = students.filter(student => meal.students[student.id] !== "Served").length;
      meal.total = students.length;
      state.meals[date] = meal;
      saveData();
      updateMealCounts();
    });

    // Profile: save teacher details.
    document.addEventListener("submit", event => {
      if (event.target.id === "parentProfileForm") {
        event.preventDefault();
        if (!state.teacher || state.userType !== "parent") return;

        const formData = new FormData(event.target);
        const existingParentProfile = readJSON("shikshasetu_parent_profile_" + state.teacher.id, {});
        const parentProfile = {
          photo: existingParentProfile.photo || "",
          childName: String(formData.get("childName") || "").trim(),
          className: String(formData.get("className") || "").trim(),
          school: String(formData.get("school") || "").trim(),
          fatherName: String(formData.get("fatherName") || "").trim(),
          fatherMobile: String(formData.get("fatherMobile") || "").trim(),
          fatherEmail: String(formData.get("fatherEmail") || "").trim(),
          motherName: String(formData.get("motherName") || "").trim(),
          motherMobile: String(formData.get("motherMobile") || "").trim(),
          motherEmail: String(formData.get("motherEmail") || "").trim(),
          address: String(formData.get("address") || "").trim()
        };
        if (writeJSON("shikshasetu_parent_profile_" + state.teacher.id, parentProfile)) {
          showToast("Parent profile saved successfully!");
          navigate("parentFamilyProfile");
        }
        return;
      }

      if (event.target.id !== "profileForm") return;

      event.preventDefault();

      const teacher = state.teacher;
      if (!teacher) return;

      teacher.profile = teacher.profile || {};
      const formData = new FormData(event.target);

      teacher.profile.displayId = String(formData.get("displayId") || "").trim();
      teacher.profile.school = String(formData.get("school") || "").trim();
      teacher.profile.className = String(formData.get("className") || "").trim();
      teacher.profile.subject = String(formData.get("subject") || "").trim();
      teacher.profile.email = formData.get("email") || "";
      teacher.profile.contact = formData.get("contact") || "";
      teacher.profile.qualification = formData.get("qualification") || "";
      teacher.profile.experience = formData.get("experience") || "";
      teacher.profile.additionalRole = formData.get("additionalRole") || "";

      try {
        localStorage.setItem("shikshasetu_profile_" + teacher.id, JSON.stringify(teacher.profile));
      } catch (error) {
        showToast("Profile could not be saved on this device.");
        return;
      }
      saveData();
      navigate("profile");
      showToast("Profile saved successfully!");
    });

    // Teacher chat: select and send photos.
    document.addEventListener("change", event => {
      if (event.target.id !== "chatPhotoInput") return;

      const files = Array.from(event.target.files || []);
      event.target.value = "";
      sendChatPhotos(files);
    });

    // Teacher profile actions: details stay read-only until Edit Profile is clicked.
    document.addEventListener("click", event => {
      if (event.target.closest("#editParentProfileBtn")) {
        const form = document.getElementById("parentProfileForm");
        const details = document.getElementById("parentProfileDetails");
        const coreDetails = document.getElementById("parentCoreDetails");
        if (form) form.hidden = false;
        if (details) details.hidden = true;
        if (coreDetails) coreDetails.hidden = true;
        event.target.closest("#editParentProfileBtn").hidden = true;
        return;
      }
      if (event.target.closest("#cancelParentProfileEditBtn")) { navigate("parentFamilyProfile"); return; }
      if (event.target.closest("#downloadParentProfileBtn")) { downloadParentProfilePDF(); return; }
      const editButton = event.target.closest("#editProfileBtn");
      if (editButton) {
        const form = document.getElementById("profileForm");
        const details = document.getElementById("profileExtraDetails");
        const coreDetails = document.getElementById("profileCoreDetails");
        if (form) form.hidden = false;
        if (details) details.hidden = true;
        if (coreDetails) coreDetails.hidden = true;
        editButton.hidden = true;
        const camera = document.querySelector(".profile-camera-btn");
        if (camera) camera.hidden = false;
        return;
      }
      if (event.target.closest("#cancelProfileEditBtn")) {
        navigate("profile");
        return;
      }
      if (event.target.closest("#downloadProfileBtn")) {
        downloadTeacherProfilePDF();
      }
    });

    function downloadParentProfilePDF() {
      const parent = state.teacher;
      if (!parent) return;
      const profile = getParentProfileDetails();
      const esc = value => String(value ?? "-").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
      const logo = document.querySelector(".brand-icon img")?.src || "logo.png";
      const photo = profile.photo || "";
      const child = parent.child || {};
      const fields = [["Parent / Guardian Name", parent.name], ["School", profile.school || parent.school], ["Student Name", profile.childName || child.name], ["Student Class", profile.className || child.className || parent.className], ["Father's Name", profile.fatherName], ["Father's Mobile Number", profile.fatherMobile], ["Father's Email ID", profile.fatherEmail], ["Mother's Name", profile.motherName], ["Mother's Mobile Number", profile.motherMobile], ["Mother's Email ID", profile.motherEmail], ["Home Address", profile.address]];
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Parent Profile</title><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#443331;margin:0;background:#fff;padding:14mm}.head{display:flex;align-items:center;gap:8mm;border-bottom:3px solid #8b3935;padding-bottom:7mm;margin-bottom:8mm}.logo{width:28mm;height:28mm;object-fit:contain}.brand{font-size:10pt;letter-spacing:1px;color:#98736c;font-weight:bold;margin:0 0 2mm}.school{font-size:15pt;color:#702b28;font-weight:bold;margin:0 0 2mm}.title{font-size:11pt;color:#8b3935;margin:0}.content{display:flex;gap:10mm;align-items:flex-start}.photo-wrap{width:43mm;flex:0 0 43mm;text-align:center}.photo{width:38mm;height:38mm;object-fit:cover;border-radius:50%;border:3px solid #f0ded7}.no-photo{width:38mm;height:38mm;border-radius:50%;background:#7c2634;color:white;display:flex;align-items:center;justify-content:center;font-size:22pt;font-weight:bold;margin:auto}.grid{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0 7mm}.item{padding:4mm 1mm;border-bottom:1px solid #e4d2cb;break-inside:avoid}.label{display:block;color:#98736c;font-size:9pt;margin-bottom:1.5mm}.value{display:block;font-size:11pt;font-weight:bold;overflow-wrap:anywhere}.foot{margin-top:10mm;border-top:1px solid #d8c4bd;padding-top:3mm;font-size:8pt;color:#8a716d}@page{size:A4 portrait;margin:0}@media print{body{padding:14mm}.head,.item{break-inside:avoid}}</style></head><body><header class="head"><img class="logo" src="${esc(logo)}"><div><p class="brand">SHIKSHASETU · SMART SCHOOL ADMIN</p><p class="school">GOVERNMENT PRIMARY SCHOOL</p><p class="title">Parent / Guardian Profile</p></div></header><main class="content"><div class="photo-wrap">${photo ? `<img class="photo" src="${esc(photo)}" alt="Parent profile photo">` : `<div class="no-photo">${esc((parent.name || "P").split(/\s+/).map(x => x[0] || "").join("").slice(0, 2).toUpperCase())}</div>`}<p>${esc(parent.name)}</p></div><section class="grid">${fields.map(([label, value]) => `<div class="item"><span class="label">${esc(label)}</span><span class="value">${esc(value || "-")}</span></div>`).join("")}</section></main><footer class="foot">Official parent profile · Generated ${esc(new Date().toLocaleDateString())}</footer></body></html>`;
      const filename = `shikshasetu-parent-profile-${String(parent.id || "profile").replace(/[^a-z0-9_-]/gi, "-")}.pdf`;
      if (typeof window.html2pdf === "function") {
        const container = document.createElement("div"); container.style.cssText = "position:fixed;left:-10000px;top:0;width:794px;background:#fff;z-index:-1";
        const parsed = new DOMParser().parseFromString(html, "text/html"); const style = document.createElement("style"); style.textContent = parsed.head.querySelector("style")?.textContent || ""; container.appendChild(style); const body = document.createElement("div"); body.innerHTML = parsed.body.innerHTML; container.appendChild(body); document.body.appendChild(container);
        const imgs = Array.from(container.querySelectorAll("img")); Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }))).then(() => window.html2pdf().set({ margin: 0, filename, image: { type: "jpeg", quality: .98 }, html2canvas: { scale: 2, useCORS: true, backgroundColor: "#fff" }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(body).save()).then(() => container.remove()).catch(() => { container.remove(); openPrintFallback(html, state.language || "en"); });
      } else openPrintFallback(html, state.language || "en");
    }

    function downloadTeacherProfilePDF() {
      const teacher = state.teacher;
      if (!teacher) return;
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem("shikshasetu_profile_" + teacher.id) || "{}"); } catch (_) { }
      const profile = { ...(teacher.profile || {}), ...saved };
      const esc = value => String(value ?? "-").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
      const logo = document.querySelector(".brand-icon img")?.src || "logo.png";
      const photo = profile.photo || "";
      const fields = [
        ["Teacher Name", teacher.name], ["Designation", teacher.role || "Teacher"],
        ["Teacher ID", profile.displayId || teacher.id], ["School", profile.school || teacher.school], ["Assigned Class", profile.className || teacher.className],
        ["Subject", profile.subject || teacher.subject], ["Email ID", profile.email], ["Contact Number", profile.contact],
        ["Qualification", profile.qualification], ["Teaching Experience", profile.experience],
        ["Additional Role", profile.additionalRole]
      ];
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Teacher Profile</title><style>
        *{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#443331;margin:0;background:#fff;padding:14mm}.head{display:flex;align-items:center;gap:8mm;border-bottom:3px solid #8b3935;padding-bottom:7mm;margin-bottom:8mm}.logo{width:28mm;height:28mm;object-fit:contain}.brand{font-size:10pt;letter-spacing:1px;color:#98736c;font-weight:bold;margin:0 0 2mm}.school{font-size:15pt;color:#702b28;font-weight:bold;margin:0 0 2mm}.title{font-size:11pt;color:#8b3935;margin:0}.content{display:flex;gap:10mm;align-items:flex-start}.photo-wrap{width:43mm;flex:0 0 43mm;text-align:center}.photo{width:38mm;height:38mm;object-fit:cover;border-radius:50%;border:3px solid #f0ded7}.no-photo{width:38mm;height:38mm;border-radius:50%;background:#7c2634;color:white;display:flex;align-items:center;justify-content:center;font-size:22pt;font-weight:bold;margin:auto}.grid{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0 7mm}.item{padding:4mm 1mm;border-bottom:1px solid #e4d2cb;break-inside:avoid}.label{display:block;color:#98736c;font-size:9pt;margin-bottom:1.5mm}.value{display:block;font-size:11pt;font-weight:bold;overflow-wrap:anywhere}.foot{margin-top:10mm;border-top:1px solid #d8c4bd;padding-top:3mm;font-size:8pt;color:#8a716d}@page{size:A4 portrait;margin:0}@media print{body{padding:14mm}.head,.item{break-inside:avoid}}</style></head><body><header class="head"><img class="logo" src="${esc(logo)}"><div><p class="brand">SHIKSHASETU · SMART SCHOOL ADMIN</p><p class="school">GOVERNMENT PRIMARY SCHOOL</p><p class="title">Teacher Profile</p></div></header><main class="content"><div class="photo-wrap">${photo ? `<img class="photo" src="${esc(photo)}" alt="Teacher profile photo">` : `<div class="no-photo">${esc((teacher.name || "T").split(/\s+/).map(x => x[0] || "").join("").slice(0, 2).toUpperCase())}</div>`}<p>${esc(teacher.name)}</p></div><section class="grid">${fields.map(([label, value]) => `<div class="item"><span class="label">${esc(label)}</span><span class="value">${esc(value || "-")}</span></div>`).join("")}</section></main><footer class="foot">Official teacher profile · Generated ${esc(new Date().toLocaleDateString())}</footer></body></html>`;
      const filename = `shikshasetu-teacher-profile-${String(teacher.id || "profile").replace(/[^a-z0-9_-]/gi, "-")}.pdf`;
      if (typeof window.html2pdf === "function") {
        const parsed = new DOMParser().parseFromString(html, "text/html");
        const container = document.createElement("div");
        container.style.cssText = "position:fixed;left:-10000px;top:0;width:794px;background:#fff;z-index:-1";
        const style = document.createElement("style"); style.textContent = parsed.head.querySelector("style")?.textContent || ""; container.appendChild(style);
        const body = document.createElement("div"); body.innerHTML = parsed.body.innerHTML; container.appendChild(body); document.body.appendChild(container);
        const imgs = Array.from(container.querySelectorAll("img"));
        Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }))).then(() => window.html2pdf().set({ margin: 0, filename, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(body).save()).then(() => container.remove()).catch(() => { container.remove(); openPrintFallback(html, state.language || "en"); });
      } else openPrintFallback(html, state.language || "en");
    }

    // Profile photo upload handler for teacher and parent profiles.
    document.addEventListener("change", event => {
      const inputId = event.target.id;
      if (inputId !== "profilePhotoInput" && inputId !== "parentProfilePhotoInput") return;

      const isParentPhoto = inputId === "parentProfilePhotoInput";
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showToast("Please select an image.");
        event.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast("Choose an image smaller than 2 MB.");
        event.target.value = "";
        return;
      }

      const account = state.teacher;
      if (!account) return;
      if (isParentPhoto && state.userType !== "parent") return;
      if (!isParentPhoto && state.userType !== "teacher") return;

      const reader = new FileReader();
      reader.onload = () => {
        if (isParentPhoto) {
          const storageKey = "shikshasetu_parent_profile_" + account.id;
          const parentProfile = readJSON(storageKey, {});
          parentProfile.photo = reader.result;
          if (!writeJSON(storageKey, parentProfile)) {
            showToast("Photo could not be saved.");
            return;
          }

          // Update every parent avatar immediately, then show the profile page
          // with the same newly uploaded photo.
          updateTeacherDetails();
          navigate("parentFamilyProfile");
          showToast("Parent profile photo updated!");
          event.target.value = "";
          return;
        }

        account.profile = account.profile || {};
        account.profile.photo = reader.result;

        try {
          localStorage.setItem(
            "shikshasetu_profile_" + account.id,
            JSON.stringify(account.profile)
          );
        } catch (error) {
          showToast("Photo could not be saved.");
          return;
        }

        // Sync the uploaded teacher photo to the top-right avatar and sidebar identity avatar.
        updateTeacherDetails();

        const avatar = document.querySelector(".profile-avatar-wrap");
        if (avatar) {
          const img = document.createElement("img");
          img.src = reader.result;
          img.className = "profile-photo";
          img.alt = "Teacher profile photo";

          const oldPhoto = avatar.querySelector(".profile-photo");
          if (oldPhoto) oldPhoto.replaceWith(img);
          else avatar.prepend(img);

          // Keep the existing camera control intact so another photo can be selected.
          const cameraInput = avatar.querySelector("#profilePhotoInput");
          if (!cameraInput) {
            const cameraLabel = document.createElement("label");
            cameraLabel.className = "profile-camera-btn";
            cameraLabel.title = "Change profile photo";
            cameraLabel.innerHTML = `
              <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg></span>
              <input type="file" id="profilePhotoInput" accept="image/*" hidden>
            `;
            avatar.appendChild(cameraLabel);
          }
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

    $$(`[data-demo]`).forEach(button => {
      button.addEventListener("click", () => {
        selectedLoginRole = button.dataset.demoRole || "teacher";
        $$(".login-role").forEach(item => item.classList.toggle("active", item.dataset.role === selectedLoginRole));
        const account = selectedLoginRole === "parent" ? parents[button.dataset.demo] : teachers[button.dataset.demo];
        if (!account) return;
        $("#teacherId").value = selectedLoginRole === "parent" ? account.email : account.id;
        $("#teacherId").type = selectedLoginRole === "parent" ? "email" : "text";
        const demoLabel = $("#loginIdLabel");
        if (demoLabel) demoLabel.textContent = selectedLoginRole === "parent" ? "Parent's Email ID" : "Teacher ID";
        $("#password").value = account.password;
        login(account.id, account.password);
      });
    });

    $("#logoutBtn")?.addEventListener("click", logout);

    $("#menuBtn")?.addEventListener("click", () => {
      const app = $("#app");
      const sidebar = $("#sidebar");
      if (!app || !sidebar) return;

      if (window.matchMedia("(max-width: 760px)").matches) {
        sidebar.classList.toggle("open");
        $("#menuBtn")?.setAttribute("aria-expanded", String(sidebar.classList.contains("open")));
      } else {
        app.classList.toggle("sidebar-collapsed");
        $("#menuBtn")?.setAttribute("aria-expanded", String(!app.classList.contains("sidebar-collapsed")));
      }
    });

    $("#notificationBtn")?.addEventListener("click", () => {
      updateTaskNotification();
      navigate("notifications");
    });

    // Delegated click handlers for dynamically rendered content.
    document.addEventListener("click", event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const nav = target.closest("[data-page]");
      if (nav) {
        navigate(nav.dataset.page);
        if (window.matchMedia("(max-width: 760px)").matches) {
          $("#sidebar")?.classList.remove("open");
          $("#menuBtn")?.setAttribute("aria-expanded", "false");
        }
        return;
      }

      const go = target.closest("[data-go]");
      if (go) {
        if (go.dataset.markNotices) markParentNoticesSeen();
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

      if (target.closest("#retryAbsenceAlerts")) {
        retryAbsenceAlerts();
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

      if (target.closest("#editDraft")) {
        if (!state.lastDraft || state.lastDraft.published) return;
        const textarea = document.getElementById("draftText");
        const button = target.closest("#editDraft");
        if (!textarea || !button) return;

        if (textarea.readOnly) {
          textarea.readOnly = false;
          button.textContent = "Save Edit";
          textarea.focus();
          showToast("Edit the draft, then click Save Edit.");
          return;
        }

        const updatedBody = textarea.value.trim();
        if (!updatedBody) {
          showToast("Draft text cannot be empty.");
          textarea.focus();
          return;
        }
        const oldBody = state.lastDraft.body;
        state.lastDraft.body = updatedBody;
        const historyEntry = (state.assistantDrafts || []).find(draft => String(draft.id) === String(state.lastDraft.id));
        if (historyEntry) historyEntry.body = updatedBody;
        if (!saveData()) {
          state.lastDraft.body = oldBody;
          if (historyEntry) historyEntry.body = oldBody;
          return;
        }
        textarea.readOnly = true;
        button.textContent = "Edit Draft";
        showToast("Draft changes saved.");
        return;
      }

      if (target.closest("#deleteDraft")) {
        const draftToDelete = state.lastDraft;
        if (!draftToDelete) {
          showToast("There is no draft to delete.");
          return;
        }

        const previousNotices = Array.isArray(state.notices) ? state.notices.slice() : [];
        const linkedNoticeId = draftToDelete.noticeId;

        // Remove the matching Parent School Notice as well, if this draft was published.
        if (linkedNoticeId) {
          state.notices = previousNotices.filter(
            notice => String(notice.id) !== String(linkedNoticeId)
          );
        }

        state.assistantDrafts = (state.assistantDrafts || []).filter(d => String(d.id) !== String(draftToDelete.id));
        state.lastDraft = null;
        if (!saveData()) {
          state.notices = previousNotices;
          state.lastDraft = draftToDelete;
          if (!state.assistantDrafts.some(d => String(d.id) === String(draftToDelete.id))) state.assistantDrafts.unshift({ id: draftToDelete.id, topic: draftToDelete.topic, kind: draftToDelete.kind, createdAt: draftToDelete.createdAt, expiresAt: draftToDelete.expiresAt, published: draftToDelete.published, noticeId: draftToDelete.noticeId });
          return;
        }

        const result = document.getElementById("assistantResult");
        if (result) {
          result.innerHTML = `
            <div class="empty-state assistant-empty-state">
              <h3>No draft created yet.</h3>
              <p class="muted small">Create a draft to preview it here.</p>
            </div>
          `;
        }

        showToast(linkedNoticeId
          ? "Draft and Parent School Notice deleted."
          : "Draft deleted.");
        return;
      }

      if (target.closest("#publishDraft")) {
        if (state.userType !== "teacher" || !state.teacher) {
          showToast("Only a teacher can publish a school notice.");
          return;
        }
        const draftBody = $("#draftText")?.value.trim() || "";
        if (!draftBody) {
          showToast("Create or enter draft text before publishing.");
          return;
        }
        if (state.lastDraft?.published) {
          showToast("This draft has already been published.");
          return;
        }
        const kindLabels = {
          notice: "School Notice",
          parent: "Parent Message",
          meeting: "Meeting Summary",
          leave: "Leave Application",
          announcement: "School Announcement",
          attendance: "Attendance Summary",
          meal: "Midday Meal Summary"
        };
        const title = state.lastDraft?.topic || kindLabels[state.lastDraft?.kind] || "School Notice";
        const newNotice = {
          id: `NOTICE-${Date.now()}`,
          title,
          kind: state.lastDraft?.kind || "notice",
          language: state.lastDraft?.language || state.language || "en",
          body: draftBody,
          author: state.teacher.name,
          authorId: state.teacher.id,
          createdAt: state.lastDraft?.createdAt || new Date().toISOString(),
          expiresAt: state.lastDraft?.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          publishedAt: new Date().toISOString()
        };
        state.notices = Array.isArray(state.notices) ? state.notices : [];
        state.notices.unshift(newNotice);
        if (!saveData()) {
          state.notices.shift();
          return;
        }
        if (state.lastDraft) {
          state.lastDraft.published = true;
          state.lastDraft.body = draftBody;
          state.lastDraft.noticeId = newNotice.id;
          state.lastDraft.expiresAt = state.lastDraft.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          const historyEntry = state.assistantDrafts.find(d => String(d.id) === String(state.lastDraft.id));
          if (historyEntry) { historyEntry.published = true; historyEntry.noticeId = newNotice.id; }
          saveData();
        }
        const assistantResult = document.getElementById("assistantResult");
        if (assistantResult) assistantResult.innerHTML = renderAssistantDraftPreview(state.lastDraft);
        showToast("Draft published to Parent School Notice.");
        return;
      }

      if (target.closest("#downloadDraft")) {
        const draft = $("#draftText")?.value || "";
        downloadCSV([["Administrative Draft"], [draft]], "shikshasetu-draft.pdf");
      }
    });

    // Update report filter controls.
    document.addEventListener("change", event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.id === "reportType") updateReportFields();

      if (target.id === "mealDateInput") {
        const selectedDate = target.value;
        const menuText = $("#mealMenuText");
        const dayLabel = $("#mealMenuDayLabel");
        if (menuText) menuText.textContent = getMealMenuForDate(selectedDate);
        if (dayLabel) dayLabel.textContent = `Menu for ${getDayNameForDate(selectedDate)}`;
        const meal = state.meals[selectedDate] || {};
        const records = meal.students || {};
        $$('.meal-status-checkbox').forEach(box => {
          const status = records[box.dataset.student] || "Not Served";
          box.checked = status === "Served";
          const statusText = box.closest("label")?.querySelector(".meal-status-text");
          if (statusText) statusText.textContent = status;
        });
        updateMealCounts();
      }
    });

    // Complete tasks and process chat menu actions.
    document.addEventListener("click", async event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const chatMenuTrigger = target.closest("[data-chat-menu-trigger]");
      if (chatMenuTrigger) {
        const menu = $("[data-chat-menu]");
        if (!menu) return;
        chatMenuOpen = !chatMenuOpen;
        refreshChatView();
        return;
      }

      const chatMenuAction = target.closest("[data-chat-menu-action]");
      if (chatMenuAction) {
        const action = chatMenuAction.dataset.chatMenuAction;
        const selected = (state.messages || []).find(message => message.id === selectedChatMessageId && isMessageVisibleToCurrentUser(message));
        chatMenuOpen = false;
        if (action === "clear") {
          if (!window.confirm(translatePlainText("Clear all messages in this chat?", state.language))) {
            refreshChatView();
            return;
          }
          state.chatClearedAtByUser ||= {};
          // Clear only the current account's view; other users retain their messages.
          state.chatClearedAtByUser[getChatUserKey()] = Date.now();
          selectedChatMessageId = null;
          saveData();
          refreshChatView({ preserveScroll: false });
          showToast(translatePlainText("Chat cleared.", state.language));
          return;
        }
        if (!selected) {
          selectedChatMessageId = null;
          refreshChatView();
          return;
        }
        if (action === "copy") {
          await copySelectedChatMessage();
          refreshChatView();
          return;
        }
        if (action === "edit") {
          if (!isCurrentUserMessage(selected) || !selected.text || ["image", "audio"].includes(selected.type)) return;
          const revised = window.prompt(translatePlainText("Edit message", state.language), selected.text);
          if (revised !== null) {
            if (!revised.trim()) {
              showToast(translatePlainText("Message cannot be empty.", state.language));
            } else {
              selected.text = revised.trim();
              selected.edited = true;
              saveData();
            }
          }
          refreshChatView();
          return;
        }
        if (action === "delete-me") {
          if (!window.confirm(translatePlainText("Delete this message for you only?", state.language))) {
            refreshChatView();
            return;
          }
          selected.hiddenFor = Array.isArray(selected.hiddenFor) ? selected.hiddenFor : [];
          const userKey = getChatUserKey();
          if (!selected.hiddenFor.includes(userKey)) selected.hiddenFor.push(userKey);
          selectedChatMessageId = null;
          saveData();
          refreshChatView();
          showToast(translatePlainText("Message deleted for you.", state.language));
          return;
        }
        if (action === "delete-everyone") {
          if (!isCurrentUserMessage(selected)) {
            showToast(translatePlainText("Only your own messages can be deleted for everyone.", state.language));
            refreshChatView();
            return;
          }
          if (!window.confirm(translatePlainText("Delete this message for everyone?", state.language))) {
            refreshChatView();
            return;
          }
          state.messages = state.messages.filter(message => message.id !== selected.id);
          selectedChatMessageId = null;
          saveData();
          refreshChatView();
          showToast(translatePlainText("Message deleted for everyone.", state.language));
          return;
        }
      }

      const chatMessageCard = target.closest("[data-chat-message-id]");
      if (chatMessageCard) {
        const clickedMessageId = chatMessageCard.dataset.chatMessageId;
        selectedChatMessageId = selectedChatMessageId === clickedMessageId ? null : clickedMessageId;
        chatMenuOpen = false;
        refreshChatView();
        return;
      }

      // Clicking away closes the chat menu and clears current selection only if the click was outside a message/menu.
      if (chatMenuOpen && !target.closest(".chat-menu-wrap")) {
        chatMenuOpen = false;
        refreshChatView();
      }
      const completeButton = target.closest("[data-complete-task]");
      if (!completeButton) return;
      const task = state.tasks.find(item => String(item.id) === completeButton.dataset.completeTask);
      if (!task || task.done) return;
      task.done = true;
      task.completedAt = new Date().toISOString();
      saveData();
      updateTaskNotification();
      navigate(state.page === "notifications" ? "notifications" : state.page);
      showToast("Task completed. Its notification has been cleared.");
    });

    document.addEventListener("keydown", event => {
      const card = event.target instanceof Element ? event.target.closest("[data-chat-message-id]") : null;
      if (!card || !["Enter", " "].includes(event.key)) return;
      if (event.target !== card) return;
      event.preventDefault();
      selectedChatMessageId = selectedChatMessageId === card.dataset.chatMessageId ? null : card.dataset.chatMessageId;
      chatMenuOpen = false;
      refreshChatView();
    });

    document.addEventListener("input", event => {
      if (event.target.id === "academicSearch") {
        filterAcademicReports();
      }
    });

    document.addEventListener("submit", event => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      if (form.id === "assistantForm") {
        event.preventDefault();

        if (state.userType !== "teacher" || !state.teacher) {
          showToast("Only a teacher can create a draft.");
          return;
        }

        const formData = new FormData(form);
        const kind = String(formData.get("kind") || "notice");
        const language = String(formData.get("language") || state.language || "en");
        const topic = String(formData.get("topic") || "").trim();
        const details = String(formData.get("details") || "").trim();

        if (!topic) {
          showToast("Please enter a topic.");
          form.querySelector('[name="topic"]')?.focus();
          return;
        }

        const draftBody = makeDraft(kind, topic, details, language);
        const createdAt = new Date().toISOString();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const draftId = `DRAFT-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        // Every new draft stays unpublished until the teacher explicitly clicks Publish.
        state.lastDraft = { id: draftId, kind, topic, language, body: draftBody, createdAt, expiresAt, published: false, noticeId: null };
        state.assistantDrafts = Array.isArray(state.assistantDrafts) ? state.assistantDrafts : [];
        state.assistantDrafts.unshift({ id: draftId, kind, topic, createdAt, expiresAt, published: false, noticeId: null, body: draftBody });

        if (!saveData()) return;
        showToast("Draft created. Review it, then publish it when ready.");

        const result = document.getElementById("assistantResult");
        if (result) result.innerHTML = renderAssistantDraftPreview(state.lastDraft);
        return;
      }

      if (form.id === "mealForm") {
        event.preventDefault();
        saveMeal(form);
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

  // ---------- INITIALIZATION ----------

  function init() {
    loadSavedData();
    updateTaskNotification();
    cleanupExpiredDrafts(true);
    window.setInterval(() => cleanupExpiredDrafts(true), 60 * 1000);
    window.addEventListener("focus", () => cleanupExpiredDrafts(true));
    try {
      const savedLanguage = localStorage.getItem("shikshasetu_language");
      if (["en", "gu", "hi"].includes(savedLanguage)) state.language = savedLanguage;
    } catch (_) { }
    bindEvents();
    startLanguageObserver();
    applyLanguageToDom(document.body);

    // If the same demo is open in another tab, reload shared notices/attendance
    // when localStorage is updated so Parent and Teacher views stay in sync.
    window.addEventListener("storage", event => {
      if (event.key !== APP_STORAGE_KEY && event.key !== null) return;
      loadSavedData();
      updateTaskNotification();
      if (state.teacher && (state.page === "chat" || state.page === "parentChat" || state.page === "notifications" || state.page === "dashboard")) {
        navigate(state.page);
      } else if (state.teacher && state.userType === "parent" && ["parentDashboard", "parentAttendance"].includes(state.page)) {
        navigate(state.page);
      }
    });

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

let selectedLoginRole = "teacher";

document.querySelectorAll(".login-role").forEach(button => {
  button.addEventListener("click", () => {
    selectedLoginRole = button.dataset.role;

    document.querySelectorAll(".login-role").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    const label = document.getElementById("loginIdLabel");
    const idInput = document.getElementById("teacherId");

    if (selectedLoginRole === "teacher") {
      label.textContent = "Teacher ID";
      idInput.placeholder = "Enter Teacher ID";
      idInput.type = "text";
    } else {
      label.textContent = "Parent's Email ID";
      idInput.placeholder = "Enter Parent's Email ID";
      idInput.type = "email";
    }

    idInput.value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginError").textContent = "";
  });
});