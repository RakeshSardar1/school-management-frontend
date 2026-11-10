import type {
  IndianQualification,
  ProgressKeysTypes,
  StudentRelationTypes,
} from "../utilities/types";

//UserAccess
export const SUPER_ADMIN = "super_admin";

export const OVERVIEW = "overview";
export const SCHOOL_OVERVIEW = "School Overview";

export const FRONT_OFFICE = "front-office";
export const FRONT_OFFICE_LABEL = "Front Office";

export const STUDENT_INFO = "student-info";
export const STUDENT_INFO_LABEL = "Student Info";
export const STUDENT_DIRECTORY = "Student Directory";
export const ADMISSION_PROCESS = "Admission Process";
export const STUDENT_CATEGORIES = "Student Categories";
export const STUDENT_ADMISSION = "Student Admission";

export const PROMOTE_STUDENTS = "Promote Students";

export const ONLINE_COURSE = "online-course";
export const ONLINE_COURSE_LABEL = "Online Course";

export const MULTI_BRANCH = "multi-branch";
export const MULTI_BRANCH_LABEL = "Multi Branch";

export const LIVE_CLASSES = "live-classes";
export const LIVE_CLASSES_LABEL = "Live Classes";

export const BEHAVIOR = "behavior";
export const BEHAVIOR_RECORDS = "Behavior Records";

export const INCOME_EXPENSE = "income-expense";
export const INCOME_EXPENSE_LABEL = "Income & Expense";

export const CBSE = "cbse";
export const CBSE_EXAMINATION = "CBSE Examination";

export const EXAMINATIONS = "examinations";
export const EXAMINATIONS_LABEL = "Examinations";
export const EXAM_SCHEDULE = "Exam Schedule";
export const MARKS_REPORT_CARDS = "Marks / Report Cards";
export const ADMIT_CARDS = "Admit Cards";
export const GRADE_SETUP = "Grade Setup";

export const ATTENDANCE = "attendance";
export const ATTENDANCE_LABEL = "Attendance";

export const ONLINE_EXAMS = "online-exams";
export const ONLINE_EXAMINATIONS = "Online Examinations";

export const ACADEMICS = "academics";
export const ACADEMICS_LABEL = "Academics";
export const CLASS_TIMETABLE = "Class Timetable";
export const TEACHER_TIMETABLE = "Teacher Timetable";
export const ASSIGN_SUBJECT = "Assign Subject";
export const SUBJECTS_MASTER = "Subjects Master";

export const LESSON_PLAN = "lesson-plan";
export const LESSON_PLAN_LABEL = "Lesson Plan";

export const HR = "hr";
export const HUMAN_RESOURCE = "Human Resource";
export const STAFF_DIRECTORY = "Staff Directory";
export const STAFF_ATTENDANCE = "Staff Attendance";
export const PAYROLL_SALARY = "Payroll & Salary";
export const APPROVE_LEAVE = "Approve Leave";

export const COMMUNICATE = "communicate";
export const COMMUNICATE_LABEL = "Communicate";

export const FEES_COLLECTION = "fees-collection";
export const FEES_COLLECTION_LABEL = "Fees Collection";
export const FEE_LEDGER = "Fee Ledger";
export const COLLECT_FEES = "Collect Fees";
export const FEE_STRUCTURE = "Fee Structure";
export const DISCOUNT_TYPES = "Discount Types";

//Sidebar
export const SIDEBAR_API = {
  GET_ALL: "sidebar?select=*",
};

//Sutdents Section
export const GENDER_DATA = ["Male", "Female", "Other", "Not specified"];

export const RELIGIONS_DATA = [
  "Hinduism",
  "Islam",
  "Christianity",
  "Sikhism",
  "Buddhism",
  "Jainism",
  "Judaism",
  "Zoroastrianism",
  "Other",
  "Not Specified",
];

export const GRADES_DATA = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export const SECTIONS_DATA = [
  "Section A",
  "Section B",
  "Section C",
  "Section D",
  "Section E",
  "Section F",
];

export const CATEGORIES_DATA = [
  "General",
  "OBC",
  "SC/ST",
  "International",
  "Sports Quota",
];

export const ProgressKeys: ProgressKeysTypes[] = [
  "applied",
  "doc_verification",
  "entrance_test",
  "fee_paid",
  "enrolled",
];

export const USERS_CATEGORY: string[] = [
  "super_admin",
  "admin",
  "management",
  "principal",
  "teacher",
  "student",
  "parent",
  "clerk",
  "accountant",
  "librarian",
  "maintenance",
  "security",
  "canteen",
  "transport",
  "it_support",
];

export const INDIAN_QUALIFICATIONS: IndianQualification[] = [
  // ---- No formal education ----
  {
    level: 1,
    qualification: "Not Educated",
    duration: "—",
    entryRequirement: "—",
    isDegree: false,
  },

  // ---- School levels ----
  {
    level: 2,
    qualification: "Class 4 Pass",
    duration: "—",
    entryRequirement: "Class 3",
    isDegree: false,
  },
  {
    level: 3,
    qualification: "Class 8 Pass",
    duration: "—",
    entryRequirement: "Class 7",
    isDegree: false,
  },
  {
    level: 4,
    qualification: "Class 10 Pass (Secondary School Certificate)",
    duration: "—",
    entryRequirement: "Class 9",
    isDegree: false,
  },
  {
    level: 5,
    qualification:
      "Class 12 Pass (Higher Secondary / Senior Secondary Certificate)",
    duration: "—",
    entryRequirement: "Class 11",
    isDegree: false,
  },

  // ---- Vocational / diploma ----
  {
    level: 6,
    qualification: "ITI Pass (Industrial Training Institute)",
    duration: "6 months – 2 years",
    entryRequirement: "Class 8 or Class 10 pass",
    isDegree: false,
  },
  {
    level: 7,
    qualification: "Polytechnic Diploma",
    duration: "2 – 3 years",
    entryRequirement: "Class 10 or Class 12 pass",
    isDegree: false,
  },
  {
    level: 8,
    qualification: "Postgraduate Diploma (PG Diploma)",
    duration: "1 – 2 years",
    entryRequirement: "Bachelor's degree",
    isDegree: false,
  },

  // ---- Undergraduate degrees ----
  {
    level: 9,
    qualification: "Bachelor of Arts (BA)",
    duration: "3 years",
    entryRequirement: "Class 12 pass",
    isDegree: true,
  },
  {
    level: 9,
    qualification: "Bachelor of Science (B.Sc.)",
    duration: "3 years",
    entryRequirement: "Class 12 pass (Science stream)",
    isDegree: true,
  },
  {
    level: 9,
    qualification: "Bachelor of Commerce (B.Com.)",
    duration: "3 years",
    entryRequirement: "Class 12 pass (Commerce stream preferred)",
    isDegree: true,
  },
  {
    level: 9,
    qualification: "Bachelor of Business Administration (BBA)",
    duration: "3 years",
    entryRequirement: "Class 12 pass + entrance exam",
    isDegree: true,
  },
  {
    level: 9,
    qualification: "Bachelor of Computer Applications (BCA)",
    duration: "3 years",
    entryRequirement: "Class 12 pass (Maths preferred)",
    isDegree: true,
  },
  {
    level: 10,
    qualification: "Bachelor of Technology (B.Tech)",
    duration: "4 years",
    entryRequirement: "Class 12 pass (PCM) + JEE / entrance exam",
    isDegree: true,
  },
  {
    level: 10,
    qualification: "Bachelor of Engineering (B.E.)",
    duration: "4 years",
    entryRequirement: "Class 12 pass (PCM) + entrance exam",
    isDegree: true,
  },
  {
    level: 10,
    qualification: "Bachelor of Architecture (B.Arch)",
    duration: "5 years",
    entryRequirement: "Class 12 pass + NATA / JEE Paper 2",
    isDegree: true,
  },
  {
    level: 10,
    qualification: "Bachelor of Laws (LLB)",
    duration: "3 – 5 years",
    entryRequirement: "Class 12 pass or Bachelor's degree + CLAT / entrance",
    isDegree: true,
  },
  {
    level: 10,
    qualification: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    duration: "5.5 years (incl. internship)",
    entryRequirement: "Class 12 pass (PCB) + NEET",
    isDegree: true,
  },
  {
    level: 11,
    qualification: "Bachelor's Degree (Honours)",
    duration: "3 – 4 years",
    entryRequirement: "Class 12 pass (higher cutoff)",
    isDegree: true,
  },

  // ---- Postgraduate degrees ----
  {
    level: 12,
    qualification: "Master of Arts (MA)",
    duration: "2 years",
    entryRequirement: "Bachelor's degree (BA preferred)",
    isDegree: true,
  },
  {
    level: 12,
    qualification: "Master of Science (M.Sc.)",
    duration: "2 years",
    entryRequirement: "Bachelor's degree (B.Sc. preferred)",
    isDegree: true,
  },
  {
    level: 12,
    qualification: "Master of Commerce (M.Com.)",
    duration: "2 years",
    entryRequirement: "Bachelor's degree (B.Com. preferred)",
    isDegree: true,
  },
  {
    level: 12,
    qualification: "Master of Business Administration (MBA)",
    duration: "2 years",
    entryRequirement: "Bachelor's degree + CAT / MAT / entrance",
    isDegree: true,
  },
  {
    level: 12,
    qualification: "Master of Computer Applications (MCA)",
    duration: "2 years",
    entryRequirement: "Bachelor's degree (BCA / Maths preferred) + entrance",
    isDegree: true,
  },
  {
    level: 13,
    qualification: "Master of Technology (M.Tech)",
    duration: "2 years",
    entryRequirement: "B.Tech / B.E. + GATE",
    isDegree: true,
  },
  {
    level: 13,
    qualification: "Master of Laws (LLM)",
    duration: "1 – 2 years",
    entryRequirement: "LLB + entrance exam",
    isDegree: true,
  },

  // ---- Pre-doctoral ----
  {
    level: 14,
    qualification: "Master of Philosophy (M.Phil.) — being phased out",
    duration: "1 – 2 years",
    entryRequirement: "Master's degree",
    isDegree: true,
  },

  // ---- Doctoral ----
  {
    level: 15,
    qualification: "Doctor of Philosophy (Ph.D.)",
    duration: "3+ years",
    entryRequirement:
      "Master's degree (55%+) or 4-yr Bachelor's (75%+) + UGC-NET/entrance",
    isDegree: true,
  },
];

export const BLOOD_GROUPS_DATA = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];

export const STUDENT_RELATIONS: StudentRelationTypes[] = [
  // ---- Immediate family ----
  { value: "father", label: "Father", category: "Immediate Family" },
  { value: "mother", label: "Mother", category: "Immediate Family" },
  { value: "brother", label: "Brother", category: "Immediate Family" },
  { value: "sister", label: "Sister", category: "Immediate Family" },

  // ---- Extended family ----
  { value: "grandfather", label: "Grandfather", category: "Extended Family" },
  { value: "grandmother", label: "Grandmother", category: "Extended Family" },
  { value: "uncle", label: "Uncle", category: "Extended Family" },
  { value: "aunt", label: "Aunt", category: "Extended Family" },
  { value: "cousin", label: "Cousin", category: "Extended Family" },

  // ---- Guardian / other ----
  { value: "guardian", label: "Guardian", category: "Other" },
  { value: "other", label: "Other", category: "Other" },
];

//API Endpoints
export const ApiEndpoints = {
  //Health
  HEALTH_CHECK: "/health",

  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REGISTER: "/auth/register",
  AUTH_REFRESH_TOKEN: "/auth/refresh-token",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_UPDATE_PASSWORD: "/auth/update-password",
  AUTH_RESET_PASSWORD: "/auth/reset-password",

  // User
  USER_ME: "/auth/me",
  USER_TEAM: "/users/my-team",
  USER_PROFILE: "/api/user/profile",
  USER_UPDATE: "/api/user/update",
  USER_CHANGE_PASSWORD: "/api/user/change-password",
  USER_LIST: "/api/users",
  ADD_SUBORDINATE: "/users/subordinates",

  // Network
  NETWORK_TREE: "/api/network/tree",
  NETWORK_TEAM: "/api/network/team",
  NETWORK_DOWNLINE: "/api/network/downline",

  // Commission
  COMMISSION_LIST: "/api/commissions",
  COMMISSION_SUMMARY: "/api/commissions/summary",
  COMMISSION_WITHDRAW: "/api/commissions/withdraw",

  // Dashboard
  DASHBOARD_STATS: "/api/dashboard/stats",
  DASHBOARD_CHARTS: "/api/dashboard/charts",

  //Product
  ALL_PRODUCTS: "/products",
  MY_CART: `/products/cart`,
  ADD_MY_CART: `/products/cart/add`,

  //Payment
  CREATE_ORDER: "/payment/create-order",
  VERIFY_PAYMENT: "/payment/verify-payment",
} as const;

export const FEE_LABELS = {
  tuitionFeeTerm1: { label: "Tuition Fee (Term 1)", category: "recurring" },
  tuitionFeeTerm2: { label: "Tuition Fee (Term 2)", category: "recurring" },
  admissionFee: { label: "Admission Fee (One-time)", category: "one_time" },
  libraryLabFee: { label: "Library & Lab Fee", category: "recurring" },
  examFee: { label: "Examination Fee", category: "recurring" },
  transportFeeQuarterly: {
    label: "Transport Fee (Quarterly)",
    category: "optional",
  },
};
