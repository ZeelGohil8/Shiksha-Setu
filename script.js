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
      id: "PAR0001", password: "1234", name: "Aarav Patel's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Aarav Patel", roll: "1", className: "Class 5A", dob: "12 March 2015", bloodGroup: "B+", guardianPhone: "9876543210", address: "Petlad, Gujarat", attendancePercent: 92, presentDays: 184, totalDays: 200 }
    },
    PAR0002: {
      id: "PAR0002", password: "1234", name: "Diya Shah's Parent",
      role: "Parent", school: "Government Primary School", className: "Class 5A",
      child: { name: "Diya Shah", roll: "2", className: "Class 5A", dob: "05 July 2015", bloodGroup: "O+", guardianPhone: "9876501234", address: "Petlad, Gujarat", attendancePercent: 95, presentDays: 190, totalDays: 200 }
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
    userType: "teacher",
    page: "dashboard",
    language: "en",
    students: initialStudents,
    attendance: {},
    meals: {},
    notices: [],
    lastDraft: null,
    assistantDrafts: [],
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
    "My Reports": ["મારા અહેવાલો", "मेरी रिपोर्टें"],
    "Communication": ["સંદેશાવ્યવહાર", "संचार"],
    "Smart Assistant": ["સ્માર્ટ સહાયક", "स्मार्ट सहायक"],
    "Chat": ["ચેટ", "चैट"],
    "Account": ["એકાઉન્ટ", "खाता"],
    "My Profile": ["મારી પ્રોફાઇલ", "मेरी प्रोफ़ाइल"],
    "Log out": ["લૉગ આઉટ", "लॉग आउट"],
    "Faculty Members": ["શિક્ષક મંડળ", "शिक्षकगण"],
    "Child Personal Info": ["બાળકની વ્યક્તિગત માહિતી", "बच्चे की व्यक्तिगत जानकारी"],
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
    "My Students": ["મારા વિદ્યાર્થીઓ", "मेरे विद्यार्थी"],
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
    "My Reports": ["મારા અહેવાલો", "मेरी रिपोर्टें"],
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
    "Copy Draft": ["ડ્રાફ્ટ કૉપી કરો", "ड्राफ्ट कॉपी करें"],
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
    "Child Personal Information": ["બાળકની વ્યક્તિગત માહિતી", "बच्चे की व्यक्तिगत जानकारी"],
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
    "Child Information": ["બાળકની માહિતી", "बच्चे की जानकारी"],
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
    "View Child Information": ["બાળકની માહિતી જુઓ", "बच्चे की जानकारी देखें"],
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
    "Child Information": ["બાળકની માહિતી", "बच्चे की जानकारी"],
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
    return leading + result + trailing;
  }

  function shouldSkipTranslation(node) {
    const element = node.parentElement;
    if (!element) return true;
    return Boolean(element.closest("script, style, textarea, [data-no-translate], .chat-message-text, .chat-message-heading, .user-generated-content, #languageSelectLogin, #languageSelectApp"));
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
    try { localStorage.setItem("shikshasetu_language", state.language); } catch (_) {}
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
    { name: "Priya Sharma", subject: "Mathematics · Class 5A", mobile: "90000 00001" },
    { name: "Rahul Patel", subject: "Science · Class 4B", mobile: "90000 00002" },
    { name: "Fatima Shaikh", subject: "English · Class 3A", mobile: "90000 00003" }
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
      state.tasks = saved.tasks || defaultTasks.map(task => ({ ...task }));
      state.messages = saved.messages || state.messages;
      cleanupExpiredDrafts(false);
    } catch (error) {
      console.warn("Could not load demo data.", error);
    }
  }

  function saveData() {
    try {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
        attendance: state.attendance,
        meals: state.meals,
        notices: state.notices,
        lastDraft: state.lastDraft,
        assistantDrafts: state.assistantDrafts,
        tasks: state.tasks,
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
    const expired = drafts.filter(d => d.expiresAt && new Date(d.expiresAt).getTime() <= now);
    if (expired.length) {
      const expiredIds = new Set(expired.map(d => String(d.id)));
      const noticeIds = new Set(expired.map(d => d.noticeId).filter(Boolean).map(String));
      if (state.lastDraft && expiredIds.has(String(state.lastDraft.id))) state.lastDraft = null;
      state.assistantDrafts = drafts.filter(d => !expiredIds.has(String(d.id)));
      if (noticeIds.size) state.notices = state.notices.filter(n => !noticeIds.has(String(n.id)));
      changed = true;
    }
    if (state.lastDraft?.expiresAt && new Date(state.lastDraft.expiresAt).getTime() <= now) {
      const linkedNoticeId = state.lastDraft.noticeId;
      if (linkedNoticeId) state.notices = state.notices.filter(n => String(n.id) !== String(linkedNoticeId));
      state.assistantDrafts = state.assistantDrafts.filter(d => String(d.id) !== String(state.lastDraft.id));
      state.lastDraft = null;
      changed = true;
    }
    const previousCount = state.notices.length;
    state.notices = state.notices.filter(notice => {
      const expiry = notice.expiresAt || (notice.createdAt ? new Date(new Date(notice.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString() : null);
      return !expiry || new Date(expiry).getTime() > now;
    });
    if (state.notices.length !== previousCount) changed = true;
    if (changed && shouldSave) saveData();
    return changed;
  }

  function renderAssistantDraftCards() {
    const drafts = (state.assistantDrafts || []).filter(d => !d.expiresAt || new Date(d.expiresAt).getTime() > Date.now());
    if (!drafts.length) return `<div class="empty-state assistant-empty-state"><p class="muted">No drafts yet. Your created draft titles will appear here for 24 hours.</p></div>`;
    return `<div class="assistant-draft-list">${drafts.map(draft => {
      const expiryText = draft.expiresAt ? new Date(draft.expiresAt).toLocaleString() : "24 hours after creation";
      return `<article class="assistant-draft-card">
        <div class="assistant-draft-card-info"><h4>${escapeHTML(draft.topic || "Untitled Draft")}</h4>
          <p class="muted small">${draft.published ? "Published to Parent Dashboard" : "Draft"} · Auto-deletes: ${escapeHTML(expiryText)}</p>
        </div>
        <button type="button" class="btn danger assistant-delete-saved-draft" data-draft-id="${escapeHTML(String(draft.id))}">Delete Draft</button>
      </article>`;
    }).join("")}</div>`;
  }

  function cleanupExpiredDrafts(shouldSave = true) {
    const now = Date.now();
    let changed = false;

    if (state.lastDraft?.expiresAt && new Date(state.lastDraft.expiresAt).getTime() <= now) {
      const linkedNoticeId = state.lastDraft.noticeId;
      if (linkedNoticeId) {
        const before = state.notices.length;
        state.notices = state.notices.filter(notice => String(notice.id) !== String(linkedNoticeId));
        changed = changed || before !== state.notices.length;
      }
      state.lastDraft = null;
      changed = true;
    }

    const previousCount = state.notices.length;
    state.notices = state.notices.filter(notice => {
      const expiry = notice.expiresAt || (notice.createdAt ? new Date(new Date(notice.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString() : null);
      return !expiry || new Date(expiry).getTime() > now;
    });
    if (state.notices.length !== previousCount) changed = true;

    if (changed && shouldSave) saveData();
    return changed;
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
    const account = selectedLoginRole === "parent" ? parents[normalizedId] : teachers[normalizedId];

    if (!account || account.password !== password) {
      if (error) {
        error.textContent = selectedLoginRole === "parent"
          ? "Invalid Parent ID or password. Please try again."
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
          <button type="button" class="nav-btn" data-page="parentProfile"><span class="ico">◉</span>Child Personal Info</button>
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

  function updateTeacherDetails() {
    if (!state.teacher) return;

    $("#sideName").textContent = state.teacher.name;
    $("#sideRole").textContent =
      `${state.teacher.role} · ${state.teacher.id}`;
    $("#sideAvatar").textContent = initials(state.teacher.name);
    $("#navTeacherName").textContent = state.teacher.name;
    $("#navTeacherId").textContent = state.teacher.id;
    $("#navTeacherAvatar").textContent = initials(state.teacher.name);
    $("#topAvatar").textContent = initials(state.teacher.name);
    // The parent identity control opens the same styled profile area for parent contacts.
    if ($("#navParentName")) $("#navParentName").textContent = state.teacher.name;
    if ($("#navParentId")) $("#navParentId").textContent = state.teacher.id;
    if ($("#navParentAvatar")) $("#navParentAvatar").textContent = initials(state.teacher.name);
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
    parentDashboard: ["Dashboard", "Attendance and school updates"],
    parentAttendance: ["Attendance", "Your child's attendance summary"],
    parentProfile: ["Child Personal Info", "Your child's information"],
    parentFamilyProfile: ["Parent Profile", "Father's and mother's contact information"],
    parentChat: ["Parent–Teacher Chat", "Contact your child's teacher"],
    parentMeals: ["Meal Menu", "This week's school meal menu"],
    parentHolidayList: ["Holiday List", "Student holidays and vacation dates for academic year 2026–27"],
    parentFaculty: ["Faculty Members", "Teacher names, subjects and contact numbers"]
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
  // Checkbox-based layout preserved from the supplied attendance screen.
  // Checked = Present; unchecked = Absent. Changes are saved to state.attendance,
  // which is also the single source used by Weekly/Monthly/Yearly reports.

  function renderAttendance() {
    const students = classStudents();
    const records = state.attendance[today()] || {};
    const present = students.filter(student => records[student.id] === "Present").length;
    const absent = students.filter(student => records[student.id] === "Absent").length;

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
          <button class="btn" id="exportAttendanceCSV" data-export="attendance" type="button">
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
              ${students.map((student, index) => {
                const isPresent = records[student.id] === "Present";
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
                        <span id="attendanceLabel-${escapeHTML(student.id)}" style="color:${isPresent ? "#52734b" : "#a53535"}">
                          ${isPresent ? "Present" : "Absent"}
                        </span>
                      </label>
                    </td>
                  </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function saveAttendance() {
    const records = { ...(state.attendance[today()] || {}) };

    $$(".attendance-checkbox").forEach(checkbox => {
      records[checkbox.dataset.student] = checkbox.checked ? "Present" : "Absent";
    });

    state.attendance[today()] = records;
    saveData();
  }

  function markAllPresent() {
    const records = { ...(state.attendance[today()] || {}) };
    classStudents().forEach(student => {
      records[student.id] = "Present";
    });
    state.attendance[today()] = records;
    saveData();
    navigate("attendance");
    showToast("All students marked present. Verify the attendance.");
  }
    function handleAttendanceCheckboxChange(changedCheckbox) {
    const dateKey = today();
    const records = { ...(state.attendance[dateKey] || {}) };

    // This checkbox-style attendance format represents every unchecked box as Absent.
    // When the teacher changes a checkbox, save the visible class state together.
    $$(".attendance-checkbox").forEach(checkbox => {
      records[checkbox.dataset.student] = checkbox.checked ? "Present" : "Absent";
    });

    state.attendance[dateKey] = records;
    saveData();

    const students = classStudents();
    const present = students.filter(student => records[student.id] === "Present").length;
    const absent = students.filter(student => records[student.id] === "Absent").length;

    const presentCount = $("#attendancePresentCount");
    const absentCount = $("#attendanceAbsentCount");
    const totalCount = $("#attendanceTotalCount");

    if (presentCount) presentCount.textContent = present;
    if (absentCount) absentCount.textContent = absent;
    if (totalCount) totalCount.textContent = students.length;

    $$(".attendance-checkbox").forEach(checkbox => {
      const label = $("#attendanceLabel-" + CSS.escape(checkbox.dataset.student));
      if (label) {
        label.textContent = checkbox.checked ? "Present" : "Absent";
        label.style.color = checkbox.checked ? "#52734b" : "#a53535";
      }
      checkbox.setAttribute(
        "aria-label",
        `Mark ${checkbox.closest("tr")?.querySelector("td:nth-child(2)")?.textContent.trim() || "student"} present`
      );
    });
  }

  // ---------- MIDDAY MEALS ----------

  function renderMeals() {
    const meal = state.meals[today()] || {};
    const selectedMenu = getMealMenuForDate(today());

    return `
      ${renderWeeklyMealMenu()}
      <section class="panel">
        <div class="panel-header">
          <div><h3>Daily Midday Meal Register</h3><p class="muted">The menu is filled automatically from the selected day. Record service details below.</p></div>
          <span class="status-pill">${meal.status ? "Recorded" : "Not recorded"}</span>
        </div>
        <form id="mealForm" class="form-grid">
          <label>Date<input type="date" id="mealDateInput" name="mealDate" value="${today()}" required></label>
          <div class="meal-menu-display" id="mealMenuDisplay" aria-live="polite">
            <span id="mealMenuDayLabel">Menu for ${escapeHTML(getDayNameForDate(today()))}</span>
            <strong id="mealMenuText">${escapeHTML(selectedMenu)}</strong>
          </div>
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
        <tr><td>${escapeHTML(date)}</td><td>${escapeHTML(getMealMenuForDate(date))}</td>
        <td>${escapeHTML(meal.served)}</td><td>${escapeHTML(meal.status)}</td></tr>
      `).join("")}</tbody>
    </table></div>`;
  }

  function saveMeal(form) {
    const data = new FormData(form);
    const date = String(data.get("mealDate") || "");
    // Always save the fixed menu for the chosen weekday; it is not user-entered.
    const menu = getMealMenuForDate(date);
    const served = Number(data.get("served"));
    const status = String(data.get("status") || "");

    if (!date || !status || !Number.isInteger(served) ||
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
            <option value="gu" ${state.language === "gu" ? "selected" : ""}>Gujarati</option>
            <option value="hi" ${state.language === "hi" ? "selected" : ""}>Hindi</option>
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

      <section class="assistant-result assistant-drafts-panel">
        <div class="panel-header"><div><h3>My Created Drafts</h3><p class="muted">Each title stays here until deleted or 24 hours after creation.</p></div></div>
        <div id="assistantDraftCards">${renderAssistantDraftCards()}</div>
      </section>

      <div id="assistantResult">${state.lastDraft && state.lastDraft.expiresAt && new Date(state.lastDraft.expiresAt).getTime() > Date.now() ? `
        <section class="assistant-result">
          <div class="panel-header"><div><h3>${state.lastDraft.published ? "Published Draft" : "Draft — Please Review"}</h3><p class="muted">This draft and its linked parent notice are automatically deleted 24 hours after creation.</p></div></div>
          <textarea id="draftText" rows="12" maxlength="10000" aria-label="Draft text">${escapeHTML(state.lastDraft.body || "")}</textarea>
          <div class="panel-actions">
            <button type="button" class="btn btn-secondary" id="copyDraft">Copy Draft</button>
            <button type="button" class="btn btn-secondary" id="downloadDraft">Download Draft</button>
            <button type="button" class="btn btn-primary" id="publishDraft" ${state.lastDraft.published ? "disabled" : ""}>${state.lastDraft.published ? "Published to Parent Notice ✓" : "Publish to Parent Notice"}</button>
          </div>
          <p id="publishDraftStatus" class="muted small" role="status">${state.lastDraft.published ? "Published to Parent School Notice." : ""}</p>
        </section>` : ""}</div>

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
      )}${detailsBlock}\n\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${pick("Issued by", "જારી કરનાર", "जारीकर्ता")}: ${name}` ,
      parent: () => `${pick("PARENT MESSAGE", "વાલી માટેનો સંદેશ", "अभिभावक संदेश")}\n\n${pick("Dear Parent,", "પ્રિય વાલી,", "प्रिय अभिभावक,")}\n\n${pick(
        `This message is about ${topicText}. Please review the information below.`,
        `આ સંદેશ ${topicText} અંગે છે. કૃપા કરીને નીચેની માહિતી તપાસો.`,
        `यह संदेश ${topicText} के बारे में है। कृपया नीचे दी गई जानकारी देखें।`
      )}${detailsBlock}\n\n${pick("Thank you,", "આભાર,", "धन्यवाद,")}\n${name}\n${school}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}` ,
      meeting: () => `${pick("MEETING SUMMARY DRAFT", "બેઠકના સારાંશનો ડ્રાફ્ટ", "बैठक सारांश ड्राफ्ट")}\n\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n\n${pick("Discussion points:", "ચર્ચાના મુદ્દાઓ:", "चर्चा के बिंदु:")}\n1. ${topicText}\n2. ${pick("Key observations and updates", "મુખ્ય અવલોકનો અને અપડેટ્સ", "मुख्य अवलोकन और अपडेट")}\n3. ${pick("Actions and follow-up", "કાર્યવાહી અને અનુસરણ", "कार्रवाई और अनुवर्ती कार्य")}\n\n${pick("Please confirm action items with participants.", "કૃપા કરીને સહભાગીઓ સાથે કાર્ય મુદ્દાઓની પુષ્ટિ કરો.", "कृपया प्रतिभागियों के साथ कार्य बिंदुओं की पुष्टि करें।")}${detailsBlock}` ,
      leave: () => `${pick("LEAVE APPLICATION DRAFT", "રજાની અરજીનો ડ્રાફ્ટ", "छुट्टी आवेदन ड्राफ्ट")}\n\n${pick("To,", "પ્રતિ,", "सेवा में,")}\n${pick("The Head Teacher", "આચાર્યશ્રી", "प्रधान शिक्षक")}\n${school}\n\n${pick("Subject: Leave request", "વિષય: રજાની વિનંતી", "विषय: छुट्टी का अनुरोध")} — ${topicText}\n\n${pick("Respected Sir/Madam,", "માનનીય સાહેબ/મેડમ,", "आदरणीय महोदय/महोदया,")}\n\n${pick(
        "I would like to request leave for the reason stated below. Kindly consider my request.",
        "નીચે જણાવેલ કારણસર હું રજાની વિનંતી કરું છું. કૃપા કરીને મારી વિનંતી ધ્યાનમાં લેશો.",
        "मैं नीचे बताए गए कारण से छुट्टी का अनुरोध करता/करती हूँ। कृपया मेरे अनुरोध पर विचार करें।"
      )}\n\n${detailsText || pick("[Add dates and relevant details]", "[તારીખ અને જરૂરી વિગતો ઉમેરો]", "[तारीख और आवश्यक विवरण जोड़ें]")}\n\n${pick("Thank you.", "આભાર.", "धन्यवाद।")}\n\n${pick("Yours sincerely,", "આપનો વિશ્વાસુ,", "सादर,")}\n${name}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}` ,
      announcement: () => `${pick("SCHOOL ANNOUNCEMENT", "શાળાની જાહેરાત", "स्कूल की घोषणा")}\n\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        `The school announces the following update: ${topicText}. Please take note and follow any instructions shared by the school.`,
        `શાળા નીચેની જાણ કરે છે: ${topicText}. કૃપા કરીને નોંધ લો અને શાળા દ્વારા આપવામાં આવેલી સૂચનાઓનું પાલન કરો.`,
        `स्कूल निम्नलिखित सूचना जारी करता है: ${topicText}। कृपया ध्यान दें और स्कूल द्वारा दिए गए निर्देशों का पालन करें।`
      )}${detailsBlock}\n\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${school}` ,
      attendance: () => `${pick("ATTENDANCE SUMMARY DRAFT", "હાજરી સારાંશનો ડ્રાફ્ટ", "उपस्थिति सारांश ड्राफ्ट")}\n\n${pick("Class", "વર્ગ", "कक्षा")}: ${className}\n${pick("Date", "તારીખ", "दिनांक")}: ${date}\n${pick("Topic", "વિષય", "विषय")}: ${topicText}\n\n${pick(
        "Verify the attendance register and totals before submitting.",
        "સબમિટ કરતા પહેલાં હાજરી રજિસ્ટર અને કુલ આંકડા ચકાસો.",
        "जमा करने से पहले उपस्थिति रजिस्टर और कुल संख्या की जाँच करें।"
      )}${detailsBlock}` ,
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

    downloadCSV(rows, "shikshasetu-academic-reports.csv");
  }

  // ---------- CSV EXPORT ----------

  function downloadCSV(rows, filename) {
    const csv = rows.map(row => row.map(value => {
      let cell = String(value ?? "");
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

    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("CSV export prepared.");
  }

  function exportData(type) {
    let rows;
    let filename;

    if (type === "students") {
      rows = [
        ["Roll No.", "Student Name", "Class"],
        ...classStudents().map((student, index) => [index + 1, student.name, student.className])
      ];
      filename = "shikshasetu-students.csv";
    } else if (type === "attendance") {
      const date = today();
      const records = state.attendance[date] || {};
      rows = [
        ["Roll No.", "Student Name", "Attendance"],
        ...classStudents().map((student, index) => [
          index + 1,
          student.name,
          records[student.id] || "Not Marked"
        ])
      ];
      filename = `attendance-${date}.csv`;
    } else if (type === "meals") {
      rows = [
        ["Date", "Menu", "Students Served", "Status", "Notes"],
        ...Object.entries(state.meals).sort((a, b) => a[0].localeCompare(b[0])).map(([date, meal]) => [
          date, meal.menu, meal.served, meal.status, meal.notes || ""
        ])
      ];
      filename = "shikshasetu-meal-records.csv";
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
      filename = `shikshasetu-${options.type}-attendance-${periodKey}.csv`;
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
          <button class="action-card parent-action-card" data-go="parentProfile" title="View Child Information">
            <span>◉</span><strong>Child Information</strong><small>View your child's details</small>
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
          ${PARENT_FACULTY_MEMBERS.map(member => `
            <article class="parent-faculty-card">
              <div class="parent-faculty-avatar" aria-hidden="true">${escapeHTML(initials(member.name))}</div>
              <div class="parent-faculty-main">
                <h4>${escapeHTML(member.name)}</h4>
                <p class="parent-faculty-subject">${escapeHTML(member.subject)}</p>
                <a class="parent-faculty-phone" href="tel:${escapeHTML(member.mobile.replace(/[^+0-9]/g, ""))}">
                  <span aria-hidden="true">☎</span> ${escapeHTML(member.mobile)}
                </a>
              </div>
            </article>
          `).join("")}
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
    const rows = [["Student name",c.name],["Class",c.className],["Roll number",c.roll],["Date of birth",c.dob],["Blood group",c.bloodGroup],["Parent contact",c.guardianPhone],["Address",c.address]];
    return `<section class="panel"><h2>Child Personal Information</h2><p class="muted">Student details linked to this demo parent account.</p><div class="parent-info-grid">${rows.map(([label,value])=>`<div class="parent-info-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value || "Not provided")}</strong></div>`).join("")}</div></section>`;
  }

  function getParentProfileDetails() {
    const parent = state.teacher;
    const child = parent?.child || {};
    const defaults = parent?.id === "PAR0002" ? {
      fatherName: "Kirit Shah",
      fatherMobile: "9876500001",
      fatherEmail: "father.par0002@example.com",
      motherName: "Minal Shah",
      motherMobile: "9876500002",
      motherEmail: "mother.par0002@example.com",
      address: child.address || "Petlad, Gujarat"
    } : {
      fatherName: "Rakesh Patel",
      fatherMobile: "9876543211",
      fatherEmail: "father.par0001@example.com",
      motherName: "Nisha Patel",
      motherMobile: "9876543222",
      motherEmail: "mother.par0001@example.com",
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

        <div class="profile-details">
          <div><span><i class="profile-detail-icon">▣</i> Parent ID</span><strong>${escapeHTML(parent.id)}</strong></div>
          <div><span><i class="profile-detail-icon">◆</i> Child</span><strong>${escapeHTML(child.name || "Not provided")}</strong></div>
          <div><span><i class="profile-detail-icon">●</i> Class</span><strong>${escapeHTML(child.className || parent.className || "Not provided")}</strong></div>
          <div><span><i class="profile-detail-icon">⌂</i> School</span><strong>${escapeHTML(parent.school || "Not provided")}</strong></div>
        </div>

        <form id="parentProfileForm" class="form-grid profile-form">
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
          </div>
        </form>
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
    if (state.userType === "parent" && !parentPages.includes(page)) page = "parentDashboard";
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
      const checkbox = event.target instanceof Element
        ? event.target.closest(".attendance-checkbox")
        : null;
      if (!checkbox) return;
      handleAttendanceCheckboxChange(checkbox);
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
        }
        return;
      }

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

    // Teacher chat: select and send photos.
    document.addEventListener("change", event => {
      if (event.target.id !== "chatPhotoInput") return;

      const files = Array.from(event.target.files || []);
      event.target.value = "";
      sendChatPhotos(files);
    });

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
        $("#teacherId").value = account.id;
        $("#password").value = account.password;
        login(account.id, account.password);
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

      const savedDraftDeleteButton = target.closest(".assistant-delete-saved-draft");
      if (savedDraftDeleteButton) {
        const draftId = savedDraftDeleteButton.dataset.draftId;
        const entry = (state.assistantDrafts || []).find(d => String(d.id) === String(draftId));
        if (!entry) return;
        const previousDrafts = state.assistantDrafts.slice();
        const previousNotices = state.notices.slice();
        const previousLastDraft = state.lastDraft;
        state.assistantDrafts = state.assistantDrafts.filter(d => String(d.id) !== String(draftId));
        if (entry.noticeId) state.notices = state.notices.filter(n => String(n.id) !== String(entry.noticeId));
        if (state.lastDraft && String(state.lastDraft.id) === String(draftId)) state.lastDraft = null;
        if (!saveData()) {
          state.assistantDrafts = previousDrafts; state.notices = previousNotices; state.lastDraft = previousLastDraft;
          return;
        }
        const cards = document.getElementById("assistantDraftCards");
        if (cards) cards.innerHTML = renderAssistantDraftCards();
        const result = document.getElementById("assistantResult");
        if (previousLastDraft && String(previousLastDraft.id) === String(draftId) && result) result.innerHTML = "";
        showToast(entry.noticeId ? "Draft and Parent School Notice deleted." : "Draft deleted.");
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

        const cards = document.getElementById("assistantDraftCards");
        if (cards) cards.innerHTML = renderAssistantDraftCards();
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
          const cards = document.getElementById("assistantDraftCards");
          if (cards) cards.innerHTML = renderAssistantDraftCards();
        }
        const publishButton = target.closest("#publishDraft");
        publishButton.disabled = true;
        publishButton.textContent = "Published to Parent Notice ✓";
        const status = $("#publishDraftStatus");
        if (status) status.textContent = "Published. This notice will appear on the Parent Dashboard when the parent logs in in this browser.";
        showToast("Draft published to Parent School Notice.");
        return;
      }

      if (target.closest("#downloadDraft")) {
        const draft = $("#draftText")?.value || "";
        downloadCSV([["Administrative Draft"], [draft]], "shikshasetu-draft.csv");
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
      }
    });

    // Handle dashboard task checkboxes.
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
        state.lastDraft = { id: draftId, kind, topic, language, body: draftBody, createdAt, expiresAt, published: false, noticeId: null };
        state.assistantDrafts = Array.isArray(state.assistantDrafts) ? state.assistantDrafts : [];
        state.assistantDrafts.unshift({ id: draftId, kind, topic, createdAt, expiresAt, published: false, noticeId: null });
        saveData();
        const cards = document.getElementById("assistantDraftCards");
        if (cards) cards.innerHTML = renderAssistantDraftCards();

        const result = document.getElementById("assistantResult");
        if (result) {
          const autoPublished = kind === "notice" || kind === "announcement";
          result.innerHTML = `
            <section class="assistant-result">
              <div class="panel-header">
                <div>
                  <h3>Draft — Please Review</h3>
                  <p class="muted">Review or edit the draft before using it.</p>
                </div>
              </div>
              <textarea id="draftText" rows="12" maxlength="10000" aria-label="Draft text">${escapeHTML(draftBody)}</textarea>
              <div class="panel-actions">
                <button type="button" class="btn btn-secondary" id="copyDraft">Copy Draft</button>
                <button type="button" class="btn btn-secondary" id="downloadDraft">Download Draft</button>
                    <button type="button" class="btn btn-primary" id="publishDraft" ${autoPublished ? "disabled" : ""}>${autoPublished ? "Publishing..." : "Publish to Parent Notice"}</button>
              </div>
              <p id="publishDraftStatus" class="muted small" role="status"></p>
            </section>
          `;
        }

        // Publish notices and announcements to the Parent Dashboard automatically.
        if (kind === "notice" || kind === "announcement") {
          const newNotice = {
            id: `NOTICE-${Date.now()}`,
            title: topic,
            kind,
            language,
            body: draftBody,
            author: state.teacher.name || "School Teacher",
            authorId: state.teacher.id,
            createdAt,
            expiresAt,
            publishedAt: new Date().toISOString()
          };

          state.notices = Array.isArray(state.notices) ? state.notices : [];
          state.notices.unshift(newNotice);
          state.lastDraft.noticeId = newNotice.id;
          const historyEntry = state.assistantDrafts.find(d => String(d.id) === String(state.lastDraft.id));
          if (historyEntry) { historyEntry.noticeId = newNotice.id; historyEntry.published = true; }

          if (saveData()) {
            state.lastDraft.published = true;
            state.lastDraft.body = draftBody;
            saveData();
            const cards = document.getElementById("assistantDraftCards");
            if (cards) cards.innerHTML = renderAssistantDraftCards();
            const publishButton = document.getElementById("publishDraft");
            if (publishButton) {
              publishButton.disabled = true;
              publishButton.textContent = "Published to Parent Notice ✓";
            }
            const status = document.getElementById("publishDraftStatus");
            if (status) status.textContent = "Published to Parent School Notice.";
            showToast("Draft created and added to Parent School Notice.");
          } else {
            state.notices.shift();
            state.lastDraft.noticeId = null;
            const publishButton = document.getElementById("publishDraft");
            if (publishButton) {
              publishButton.disabled = false;
              publishButton.textContent = "Publish to Parent Notice";
            }
            const status = document.getElementById("publishDraftStatus");
            if (status) status.textContent = "Draft created, but it could not be saved to Parent School Notice. Try publishing again.";
            showToast("Draft created, but the notice could not be saved.");
          }
        } else {
          showToast("Draft created. Review it before publishing.");
        }
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
    cleanupExpiredDrafts(true);
    window.setInterval(() => cleanupExpiredDrafts(true), 60 * 1000);
    window.addEventListener("focus", () => cleanupExpiredDrafts(true));
    try {
      const savedLanguage = localStorage.getItem("shikshasetu_language");
      if (["en", "gu", "hi"].includes(savedLanguage)) state.language = savedLanguage;
    } catch (_) {}
    bindEvents();
    startLanguageObserver();
    applyLanguageToDom(document.body);

    // If the same demo is open in another tab, reload shared notices/attendance
    // when localStorage is updated so Parent and Teacher views stay in sync.
    window.addEventListener("storage", event => {
      if (event.key !== APP_STORAGE_KEY && event.key !== null) return;
      loadSavedData();
      if (state.teacher && state.userType === "parent" && ["parentDashboard", "parentAttendance"].includes(state.page)) {
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
    } else {
      label.textContent = "Parent ID";
      idInput.placeholder = "Enter Parent ID";
    }

    idInput.value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginError").textContent = "";
  });
});