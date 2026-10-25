// ============================================
// CONSTANTS FILE - School Management System
// ============================================

// ========== APP CONFIGURATION ==========
export const APP_CONFIG = {
  APP_NAME: "School Management System",
  APP_VERSION: "1.0.0",
  APP_SHORT_NAME: "SMS",
  COMPANY_NAME: "Your School Name",
  COMPANY_LOGO: "/assets/images/logo.png",
  FAVICON: "/assets/images/favicon.ico",
  COPYRIGHT_YEAR: new Date().getFullYear(),
  COPYRIGHT_TEXT: `© ${new Date().getFullYear()} School Management System. All rights reserved.`,
  DEFAULT_THEME: "light",
  THEMES: ["light", "dark", "system"],
};

// ========== API BASE URLS ==========
export const API_BASE = {
  DEVELOPMENT: "http://localhost:3000/api",
  STAGING: "https://staging-api.school.com/api",
  PRODUCTION: "https://api.school.com/api",
};

// ========== STORAGE KEYS ==========
export const STORAGE_KEYS = {
  TOKEN: "school_auth_token",
  REFRESH_TOKEN: "school_refresh_token",
  USER: "school_user",
  THEME: "school_theme",
  LANGUAGE: "school_language",
  REMEMBER_ME: "school_remember_me",
  NOTIFICATIONS: "school_notifications",
  DASHBOARD_PREFERENCES: "school_dashboard_prefs",
  LAST_LOGIN: "school_last_login",
  DEVICE_ID: "school_device_id",
  OFFLINE_DATA: "school_offline_data",
};

// ========== USER ROLES ==========
export const USER_ROLES = {
  ADMIN: "admin",
  PRINCIPAL: "principal",
  TEACHER: "teacher",
  STAFF: "staff",
  PARENT: "parent",
  STUDENT: "student",
};

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: "Administrator",
  [USER_ROLES.PRINCIPAL]: "Principal",
  [USER_ROLES.TEACHER]: "Teacher",
  [USER_ROLES.STAFF]: "Staff",
  [USER_ROLES.PARENT]: "Parent",
  [USER_ROLES.STUDENT]: "Student",
};

export const ROLE_COLORS = {
  [USER_ROLES.ADMIN]: "#dc2626",
  [USER_ROLES.PRINCIPAL]: "#ea580c",
  [USER_ROLES.TEACHER]: "#059669",
  [USER_ROLES.STAFF]: "#6b7280",
  [USER_ROLES.PARENT]: "#3b82f6",
  [USER_ROLES.STUDENT]: "#8b5cf6",
};

// ========== ATTENDANCE STATUS ==========
export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  HALF_DAY: "half_day",
  HOLIDAY: "holiday",
  ON_LEAVE: "on_leave",
};

export const ATTENDANCE_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: "Present",
  [ATTENDANCE_STATUS.ABSENT]: "Absent",
  [ATTENDANCE_STATUS.LATE]: "Late",
  [ATTENDANCE_STATUS.HALF_DAY]: "Half Day",
  [ATTENDANCE_STATUS.HOLIDAY]: "Holiday",
  [ATTENDANCE_STATUS.ON_LEAVE]: "On Leave",
};

export const ATTENDANCE_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: "#22c55e",
  [ATTENDANCE_STATUS.ABSENT]: "#ef4444",
  [ATTENDANCE_STATUS.LATE]: "#eab308",
  [ATTENDANCE_STATUS.HALF_DAY]: "#f97316",
  [ATTENDANCE_STATUS.HOLIDAY]: "#8b5cf6",
  [ATTENDANCE_STATUS.ON_LEAVE]: "#6b7280",
};

// ========== FEE STATUS ==========
export const FEE_STATUS = {
  PAID: "paid",
  PENDING: "pending",
  PARTIAL: "partial",
  OVERDUE: "overdue",
};

export const FEE_LABELS = {
  [FEE_STATUS.PAID]: "Paid",
  [FEE_STATUS.PENDING]: "Pending",
  [FEE_STATUS.PARTIAL]: "Partial",
  [FEE_STATUS.OVERDUE]: "Overdue",
};

export const FEE_COLORS = {
  [FEE_STATUS.PAID]: "#22c55e",
  [FEE_STATUS.PENDING]: "#eab308",
  [FEE_STATUS.PARTIAL]: "#3b82f6",
  [FEE_STATUS.OVERDUE]: "#ef4444",
};

// ========== PAYMENT METHODS ==========
export const PAYMENT_METHODS = {
  CASH: "cash",
  CHEQUE: "cheque",
  CARD: "card",
  ONLINE: "online",
  BANK_TRANSFER: "bank_transfer",
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: "Cash",
  [PAYMENT_METHODS.CHEQUE]: "Cheque",
  [PAYMENT_METHODS.CARD]: "Card",
  [PAYMENT_METHODS.ONLINE]: "Online",
  [PAYMENT_METHODS.BANK_TRANSFER]: "Bank Transfer",
};

// ========== EXAM TYPES ==========
export const EXAM_TYPES = {
  UNIT_TEST: "unit_test",
  QUARTERLY: "quarterly",
  HALF_YEARLY: "half_yearly",
  ANNUAL: "annual",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  PRE_BOARD: "pre_board",
  BOARD: "board",
};

export const EXAM_TYPE_LABELS = {
  [EXAM_TYPES.UNIT_TEST]: "Unit Test",
  [EXAM_TYPES.QUARTERLY]: "Quarterly Exam",
  [EXAM_TYPES.HALF_YEARLY]: "Half Yearly Exam",
  [EXAM_TYPES.ANNUAL]: "Annual Exam",
  [EXAM_TYPES.WEEKLY]: "Weekly Test",
  [EXAM_TYPES.MONTHLY]: "Monthly Test",
  [EXAM_TYPES.PRE_BOARD]: "Pre Board Exam",
  [EXAM_TYPES.BOARD]: "Board Exam",
};

// ========== RESULT STATUS ==========
export const RESULT_STATUS = {
  PASS: "pass",
  FAIL: "fail",
  ABSENT: "absent",
  SUPPLEMENTARY: "supplementary",
  AWAITING: "awaiting",
};

export const RESULT_LABELS = {
  [RESULT_STATUS.PASS]: "Pass",
  [RESULT_STATUS.FAIL]: "Fail",
  [RESULT_STATUS.ABSENT]: "Absent",
  [RESULT_STATUS.SUPPLEMENTARY]: "Supplementary",
  [RESULT_STATUS.AWAITING]: "Awaiting Results",
};

export const RESULT_COLORS = {
  [RESULT_STATUS.PASS]: "#22c55e",
  [RESULT_STATUS.FAIL]: "#ef4444",
  [RESULT_STATUS.ABSENT]: "#6b7280",
  [RESULT_STATUS.SUPPLEMENTARY]: "#f97316",
  [RESULT_STATUS.AWAITING]: "#eab308",
};

// ========== GRADE SYSTEM ==========
export const GRADE_SYSTEM = [
  { min: 90, max: 100, grade: "A+", points: 4.0, remark: "Outstanding" },
  { min: 80, max: 89, grade: "A", points: 3.7, remark: "Excellent" },
  { min: 70, max: 79, grade: "B+", points: 3.3, remark: "Very Good" },
  { min: 60, max: 69, grade: "B", points: 3.0, remark: "Good" },
  { min: 55, max: 59, grade: "C+", points: 2.7, remark: "Above Average" },
  { min: 50, max: 54, grade: "C", points: 2.3, remark: "Average" },
  { min: 45, max: 49, grade: "D", points: 2.0, remark: "Below Average" },
  { min: 40, max: 44, grade: "E", points: 1.5, remark: "Pass" },
  { min: 0, max: 39, grade: "F", points: 0.0, remark: "Fail" },
];

// ========== LEAVE TYPES ==========
export const LEAVE_TYPES = {
  SICK: "sick",
  CASUAL: "casual",
  EARNED: "earned",
  EMERGENCY: "emergency",
  OTHER: "other",
};

export const LEAVE_TYPE_LABELS = {
  [LEAVE_TYPES.SICK]: "Sick Leave",
  [LEAVE_TYPES.CASUAL]: "Casual Leave",
  [LEAVE_TYPES.EARNED]: "Earned Leave",
  [LEAVE_TYPES.EMERGENCY]: "Emergency Leave",
  [LEAVE_TYPES.OTHER]: "Other",
};

export const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const LEAVE_STATUS_LABELS = {
  [LEAVE_STATUS.PENDING]: "Pending",
  [LEAVE_STATUS.APPROVED]: "Approved",
  [LEAVE_STATUS.REJECTED]: "Rejected",
};

export const LEAVE_STATUS_COLORS = {
  [LEAVE_STATUS.PENDING]: "#eab308",
  [LEAVE_STATUS.APPROVED]: "#22c55e",
  [LEAVE_STATUS.REJECTED]: "#ef4444",
};

// ========== GENDER ==========
export const GENDER = {
  MALE: "M",
  FEMALE: "F",
  OTHER: "O",
};

export const GENDER_LABELS = {
  [GENDER.MALE]: "Male",
  [GENDER.FEMALE]: "Female",
  [GENDER.OTHER]: "Other",
};

// ========== BLOOD GROUPS ==========
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ========== RELIGIONS ==========
export const RELIGIONS = [
  "Hindu",
  "Muslim",
  "Sikh",
  "Christian",
  "Jain",
  "Buddhist",
  "Other",
];

// ========== DAYS OF WEEK ==========
export const DAYS_OF_WEEK = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
};

export const DAYS_OF_WEEK_LABELS = {
  [DAYS_OF_WEEK.MONDAY]: "Monday",
  [DAYS_OF_WEEK.TUESDAY]: "Tuesday",
  [DAYS_OF_WEEK.WEDNESDAY]: "Wednesday",
  [DAYS_OF_WEEK.THURSDAY]: "Thursday",
  [DAYS_OF_WEEK.FRIDAY]: "Friday",
  [DAYS_OF_WEEK.SATURDAY]: "Saturday",
  [DAYS_OF_WEEK.SUNDAY]: "Sunday",
};

// ========== FREQUENCY TYPES ==========
export const FREQUENCY_TYPES = {
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  HALF_YEARLY: "half_yearly",
  YEARLY: "yearly",
  ONE_TIME: "one_time",
};

export const FREQUENCY_LABELS = {
  [FREQUENCY_TYPES.MONTHLY]: "Monthly",
  [FREQUENCY_TYPES.QUARTERLY]: "Quarterly",
  [FREQUENCY_TYPES.HALF_YEARLY]: "Half Yearly",
  [FREQUENCY_TYPES.YEARLY]: "Yearly",
  [FREQUENCY_TYPES.ONE_TIME]: "One Time",
};

// ========== HOMEWORK SUBMISSION STATUS ==========
export const HOMEWORK_STATUS = {
  SUBMITTED: "submitted",
  LATE: "late",
  NOT_SUBMITTED: "not_submitted",
};

export const HOMEWORK_STATUS_LABELS = {
  [HOMEWORK_STATUS.SUBMITTED]: "Submitted",
  [HOMEWORK_STATUS.LATE]: "Late",
  [HOMEWORK_STATUS.NOT_SUBMITTED]: "Not Submitted",
};

export const HOMEWORK_STATUS_COLORS = {
  [HOMEWORK_STATUS.SUBMITTED]: "#22c55e",
  [HOMEWORK_STATUS.LATE]: "#eab308",
  [HOMEWORK_STATUS.NOT_SUBMITTED]: "#ef4444",
};

// ========== NOTIFICATION TARGETS ==========
export const NOTIFICATION_TARGETS = {
  ALL: "all",
  ADMIN: "admin",
  TEACHERS: "teachers",
  PARENTS: "parents",
  STUDENTS: "students",
  STAFF: "staff",
};

export const NOTIFICATION_TARGET_LABELS = {
  [NOTIFICATION_TARGETS.ALL]: "Everyone",
  [NOTIFICATION_TARGETS.ADMIN]: "Admin Only",
  [NOTIFICATION_TARGETS.TEACHERS]: "Teachers",
  [NOTIFICATION_TARGETS.PARENTS]: "Parents",
  [NOTIFICATION_TARGETS.STUDENTS]: "Students",
  [NOTIFICATION_TARGETS.STAFF]: "Staff",
};

// ========== PAGINATION ==========
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
  MAX_LIMIT: 100,
};

// ========== DATE FORMATS ==========
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  DISPLAY_TIME: "DD/MM/YYYY HH:mm",
  API: "YYYY-MM-DD",
  API_TIME: "YYYY-MM-DD HH:mm:ss",
  MONTH_YEAR: "MMMM YYYY",
  YEAR: "YYYY",
  TIME: "HH:mm",
  SHORT: "DD/MM/YY",
};

// ========== FILE UPLOAD ==========
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024,
  MAX_SIZE_LABEL: "5MB",
  ACCEPTED_IMAGES: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  ACCEPTED_DOCUMENTS: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  ACCEPTED_ALL: [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf",
  ],
};

// ========== ROUTES ==========
export const ROUTES = {
  // Public
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Student
  STUDENTS: "/students",
  STUDENT_DETAILS: "/students/:id",
  STUDENT_CREATE: "/students/create",
  STUDENT_EDIT: "/students/:id/edit",

  // Teacher
  TEACHERS: "/teachers",
  TEACHER_DETAILS: "/teachers/:id",
  TEACHER_CREATE: "/teachers/create",
  TEACHER_EDIT: "/teachers/:id/edit",

  // Class
  CLASSES: "/classes",
  CLASS_DETAILS: "/classes/:id",
  CLASS_CREATE: "/classes/create",
  CLASS_EDIT: "/classes/:id/edit",
  CLASS_TIMETABLE: "/classes/:id/timetable",

  // Attendance
  ATTENDANCE: "/attendance",
  ATTENDANCE_MARK: "/attendance/mark",
  ATTENDANCE_REPORT: "/attendance/report",

  // Fee
  FEES: "/fees",
  FEE_STRUCTURE: "/fees/structure",
  FEE_COLLECTION: "/fees/collection",
  FEE_REPORT: "/fees/report",

  // Exam
  EXAMS: "/exams",
  EXAM_CREATE: "/exams/create",
  EXAM_RESULTS: "/exams/:id/results",
  MARKSHEET: "/exams/marksheet",

  // Homework
  HOMEWORK: "/homework",
  HOMEWORK_CREATE: "/homework/create",

  // Leave
  LEAVE: "/leave",
  LEAVE_REQUEST: "/leave/request",

  // Notifications
  NOTIFICATIONS: "/notifications",

  // Parent Portal
  PARENT_PORTAL: "/parent",

  // Reports
  REPORTS: "/reports",

  // Settings
  SETTINGS: "/settings",
  SETTINGS_GENERAL: "/settings/general",
  SETTINGS_ACADEMIC: "/settings/academic",
  SETTINGS_USERS: "/settings/users",

  // Profile
  PROFILE: "/profile",

  // Others
  TRANSPORT: "/transport",
  LIBRARY: "/library",
  HOSTEL: "/hostel",
  INVENTORY: "/inventory",
  ID_CARD: "/id-card",
  LEADS: "/leads",
  DOCUMENTS: "/documents",
};

// ========== SIDEBAR MENU ==========
export const SIDEBAR_MENU = {
  ADMIN: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
    { name: "Students", icon: "Users", path: "/students" },
    { name: "Teachers", icon: "ChalkboardUser", path: "/teachers" },
    { name: "Classes", icon: "School", path: "/classes" },
    { name: "Attendance", icon: "CalendarCheck", path: "/attendance" },
    { name: "Fee Management", icon: "Wallet", path: "/fees" },
    { name: "Examinations", icon: "ClipboardList", path: "/exams" },
    { name: "Homework", icon: "BookOpen", path: "/homework" },
    { name: "Leave", icon: "CalendarDays", path: "/leave" },
    { name: "Transport", icon: "Bus", path: "/transport" },
    { name: "Library", icon: "Library", path: "/library" },
    { name: "Hostel", icon: "Building2", path: "/hostel" },
    { name: "Inventory", icon: "Package", path: "/inventory" },
    { name: "ID Cards", icon: "IdCard", path: "/id-card" },
    { name: "Leads", icon: "UsersRound", path: "/leads" },
    { name: "Reports", icon: "FileText", path: "/reports" },
    { name: "Settings", icon: "Settings", path: "/settings" },
  ],
  TEACHER: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
    { name: "My Classes", icon: "School", path: "/classes" },
    { name: "Attendance", icon: "CalendarCheck", path: "/attendance" },
    { name: "Marks Entry", icon: "ClipboardList", path: "/exams" },
    { name: "Homework", icon: "BookOpen", path: "/homework" },
    { name: "Leave Request", icon: "CalendarDays", path: "/leave" },
    { name: "My Schedule", icon: "Table2", path: "/schedule" },
    { name: "Profile", icon: "User", path: "/profile" },
  ],
  PARENT: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
    { name: "My Children", icon: "Users", path: "/children" },
    { name: "Attendance", icon: "CalendarCheck", path: "/attendance" },
    { name: "Fee Details", icon: "Wallet", path: "/fees" },
    { name: "Results", icon: "ClipboardList", path: "/results" },
    { name: "Homework", icon: "BookOpen", path: "/homework" },
    { name: "Leave Request", icon: "CalendarDays", path: "/leave" },
    { name: "Notifications", icon: "Bell", path: "/notifications" },
    { name: "Profile", icon: "User", path: "/profile" },
  ],
  STUDENT: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
    { name: "My Attendance", icon: "CalendarCheck", path: "/attendance" },
    { name: "My Results", icon: "ClipboardList", path: "/results" },
    { name: "Homework", icon: "BookOpen", path: "/homework" },
    { name: "Timetable", icon: "Table2", path: "/timetable" },
    { name: "Leave Request", icon: "CalendarDays", path: "/leave" },
    { name: "Fee Status", icon: "Wallet", path: "/fees" },
    { name: "Profile", icon: "User", path: "/profile" },
  ],
};

// ========== HTTP STATUS CODES ==========
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// ========== ERROR MESSAGES ==========
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "Session expired. Please login again.",
  FORBIDDEN: "You do not have permission to access this resource.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  DUPLICATE_ENTRY: "Record already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_TOKEN: "Invalid or expired token.",
  FILE_TOO_LARGE: "File size exceeds limit.",
  INVALID_FILE_TYPE: "Invalid file type.",
  SOMETHING_WRONG: "Something went wrong. Please try again.",
};

// ========== SUCCESS MESSAGES ==========
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  LOGOUT_SUCCESS: "Logout successful!",
  CREATE_SUCCESS: "Record created successfully!",
  UPDATE_SUCCESS: "Record updated successfully!",
  DELETE_SUCCESS: "Record deleted successfully!",
  UPLOAD_SUCCESS: "File uploaded successfully!",
  IMPORT_SUCCESS: "Data imported successfully!",
  EXPORT_SUCCESS: "Data exported successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
};

// ========== TOAST CONFIGURATION ==========
export const TOAST_CONFIG = {
  DURATION: 3000,
  POSITION: "top-right",
  THEMES: ["light", "dark", "colored"],
};

// ========== LOCAL STORAGE PREFIX ==========
export const STORAGE_PREFIX = "sms_";

// ========== API TIMEOUT ==========
export const API_TIMEOUT = 30000;

// ========== CURRENCY ==========
export const CURRENCY = {
  SYMBOL: "₹",
  CODE: "INR",
  NAME: "Indian Rupee",
};

// ========== ACADEMIC YEARS ==========
export const ACADEMIC_YEARS = [
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
];

// ========== DEFAULT ACADEMIC YEAR ==========
export const DEFAULT_ACADEMIC_YEAR = "2024-2025";

// ========== EXPORT ALL CONSTANTS ==========
const CONSTANTS = {
  APP_CONFIG,
  API_BASE,
  STORAGE_KEYS,
  USER_ROLES,
  ROLE_LABELS,
  ROLE_COLORS,
  ATTENDANCE_STATUS,
  ATTENDANCE_LABELS,
  ATTENDANCE_COLORS,
  FEE_STATUS,
  FEE_LABELS,
  FEE_COLORS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  EXAM_TYPES,
  EXAM_TYPE_LABELS,
  RESULT_STATUS,
  RESULT_LABELS,
  RESULT_COLORS,
  GRADE_SYSTEM,
  LEAVE_TYPES,
  LEAVE_TYPE_LABELS,
  LEAVE_STATUS,
  LEAVE_STATUS_LABELS,
  LEAVE_STATUS_COLORS,
  GENDER,
  GENDER_LABELS,
  BLOOD_GROUPS,
  RELIGIONS,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_LABELS,
  FREQUENCY_TYPES,
  FREQUENCY_LABELS,
  HOMEWORK_STATUS,
  HOMEWORK_STATUS_LABELS,
  HOMEWORK_STATUS_COLORS,
  NOTIFICATION_TARGETS,
  NOTIFICATION_TARGET_LABELS,
  PAGINATION,
  DATE_FORMATS,
  FILE_UPLOAD,
  ROUTES,
  SIDEBAR_MENU,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_CONFIG,
  STORAGE_PREFIX,
  API_TIMEOUT,
  CURRENCY,
  ACADEMIC_YEARS,
  DEFAULT_ACADEMIC_YEAR,
};

export default CONSTANTS;
