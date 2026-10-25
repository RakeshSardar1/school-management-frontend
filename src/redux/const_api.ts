// ============================================
// API ENDPOINTS LIST - School Management System
// ============================================

// ========== AUTHENTICATION ==========
const API_AUTH = {
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REGISTER: "/api/auth/register",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  CHANGE_PASSWORD: "/api/auth/change-password",
  VERIFY_TOKEN: "/api/auth/verify-token",
  REFRESH_TOKEN: "/api/auth/refresh-token",
  PROFILE: "/api/auth/profile",
  UPDATE_PROFILE: "/api/auth/profile/update",
};

// ========== DASHBOARD ==========
const API_DASHBOARD = {
  STATS: "/api/dashboard/stats",
  RECENT_ACTIVITIES: "/api/dashboard/recent-activities",
  ATTENDANCE_SUMMARY: "/api/dashboard/attendance-summary",
  FEE_SUMMARY: "/api/dashboard/fee-summary",
  NOTICE_BOARD: "/api/dashboard/notices",
  CALENDAR_EVENTS: "/api/dashboard/calendar-events",
  CHARTS_DATA: "/api/dashboard/charts",
};

// ========== STUDENT MANAGEMENT ==========
const API_STUDENT = {
  LIST: "/api/students",
  GET: "/api/students/:id",
  CREATE: "/api/students",
  UPDATE: "/api/students/:id",
  DELETE: "/api/students/:id",
  BULK_IMPORT: "/api/students/bulk-import",
  EXPORT: "/api/students/export",
  SEARCH: "/api/students/search",
  FILTER: "/api/students/filter",
  GET_BY_CLASS: "/api/students/class/:classId",
  GET_BY_ROLL: "/api/students/roll/:rollNumber",
  PROMOTE: "/api/students/promote",
  GENERATE_ID_CARD: "/api/students/:id/id-card",
  DOCUMENTS: "/api/students/:id/documents",
  ACADEMIC_RECORDS: "/api/students/:id/academic-records",
};

// ========== TEACHER MANAGEMENT ==========
const API_TEACHER = {
  LIST: "/api/teachers",
  GET: "/api/teachers/:id",
  CREATE: "/api/teachers",
  UPDATE: "/api/teachers/:id",
  DELETE: "/api/teachers/:id",
  SEARCH: "/api/teachers/search",
  GET_BY_SUBJECT: "/api/teachers/subject/:subject",
  GET_SCHEDULE: "/api/teachers/:id/schedule",
  ASSIGN_CLASS: "/api/teachers/:id/assign-class",
  GET_CLASSES: "/api/teachers/:id/classes",
  ATTENDANCE: "/api/teachers/:id/attendance",
  LEAVE_REQUEST: "/api/teachers/leave-request",
};

// ========== CLASS MANAGEMENT ==========
const API_CLASS = {
  LIST: "/api/classes",
  GET: "/api/classes/:id",
  CREATE: "/api/classes",
  UPDATE: "/api/classes/:id",
  DELETE: "/api/classes/:id",
  SECTIONS: "/api/classes/sections",
  GET_SUBJECTS: "/api/classes/:id/subjects",
  GET_STUDENTS: "/api/classes/:id/students",
  GET_TEACHERS: "/api/classes/:id/teachers",
  TIMETABLE: "/api/classes/:id/timetable",
  PROMOTE_STUDENTS: "/api/classes/:id/promote",
};

// ========== ATTENDANCE ==========
const API_ATTENDANCE = {
  MARK: "/api/attendance/mark",
  UPDATE: "/api/attendance/:id",
  GET_BY_DATE: "/api/attendance/date/:date",
  GET_BY_CLASS: "/api/attendance/class/:classId",
  GET_BY_STUDENT: "/api/attendance/student/:studentId",
  GET_BY_TEACHER: "/api/attendance/teacher/:teacherId",
  REPORT: "/api/attendance/report",
  SUMMARY: "/api/attendance/summary",
  BIOMETRIC_SYNC: "/api/attendance/biometric-sync",
  BULK_MARK: "/api/attendance/bulk-mark",
  EXPORT: "/api/attendance/export",
};

// ========== FEE MANAGEMENT ==========
const API_FEE = {
  STRUCTURE_LIST: "/api/fee/structures",
  STRUCTURE_CREATE: "/api/fee/structures",
  STRUCTURE_UPDATE: "/api/fee/structures/:id",
  STRUCTURE_DELETE: "/api/fee/structures/:id",
  INVOICE_LIST: "/api/fee/invoices",
  INVOICE_GET: "/api/fee/invoices/:id",
  INVOICE_GENERATE: "/api/fee/invoices/generate",
  INVOICE_DOWNLOAD: "/api/fee/invoices/:id/download",
  PAYMENT_CREATE: "/api/fee/payments",
  PAYMENT_HISTORY: "/api/fee/payments/student/:studentId",
  PAYMENT_RECEIPT: "/api/fee/payments/:id/receipt",
  DUE_LIST: "/api/fee/due-list",
  COLLECTION_REPORT: "/api/fee/collection-report",
  ONLINE_PAYMENT: "/api/fee/online-payment",
  PAYMENT_VERIFY: "/api/fee/payment-verify",
  DISCOUNT_APPLY: "/api/fee/discount/apply",
  LATE_FEE_CALCULATE: "/api/fee/late-fee/calculate",
};

// ========== EXAMINATION ==========
const API_EXAM = {
  LIST: "/api/exams",
  GET: "/api/exams/:id",
  CREATE: "/api/exams",
  UPDATE: "/api/exams/:id",
  DELETE: "/api/exams/:id",
  RESULTS_ADD: "/api/exams/:id/results",
  RESULTS_GET: "/api/exams/:id/results",
  RESULTS_UPDATE: "/api/exams/results/:id",
  RESULTS_DELETE: "/api/exams/results/:id",
  MARKSHEET_GENERATE: "/api/exams/:id/marksheet",
  MARKSHEET_DOWNLOAD: "/api/exams/:id/marksheet/download",
  RANK_GENERATE: "/api/exams/:id/rank",
  GRADE_CALCULATE: "/api/exams/grade-calculate",
  EXAM_SCHEDULE: "/api/exams/schedule",
  PROGRESS_REPORT: "/api/exams/progress-report/:studentId",
};

// ========== HOMEWORK ==========
const API_HOMEWORK = {
  LIST: "/api/homework",
  GET: "/api/homework/:id",
  CREATE: "/api/homework",
  UPDATE: "/api/homework/:id",
  DELETE: "/api/homework/:id",
  GET_BY_CLASS: "/api/homework/class/:classId",
  GET_BY_TEACHER: "/api/homework/teacher/:teacherId",
  SUBMIT: "/api/homework/:id/submit",
  SUBMISSION_LIST: "/api/homework/:id/submissions",
  GRADE_SUBMISSION: "/api/homework/submissions/:id/grade",
  GET_SUBMISSION: "/api/homework/submissions/:id",
  EXPORT: "/api/homework/export",
};

// ========== LEAVE MANAGEMENT ==========
const API_LEAVE = {
  LIST: "/api/leaves",
  GET: "/api/leaves/:id",
  CREATE: "/api/leaves",
  UPDATE: "/api/leaves/:id",
  DELETE: "/api/leaves/:id",
  APPROVE: "/api/leaves/:id/approve",
  REJECT: "/api/leaves/:id/reject",
  GET_BY_USER: "/api/leaves/user/:userId",
  GET_PENDING: "/api/leaves/pending",
  LEAVE_BALANCE: "/api/leaves/balance/:userId",
  LEAVE_TYPES: "/api/leaves/types",
};

// ========== NOTIFICATION ==========
const API_NOTIFICATION = {
  LIST: "/api/notifications",
  GET: "/api/notifications/:id",
  CREATE: "/api/notifications",
  UPDATE: "/api/notifications/:id",
  DELETE: "/api/notifications/:id",
  SEND: "/api/notifications/:id/send",
  SEND_BULK: "/api/notifications/send-bulk",
  MARK_READ: "/api/notifications/:id/mark-read",
  MARK_ALL_READ: "/api/notifications/mark-all-read",
  GET_UNREAD_COUNT: "/api/notifications/unread-count",
  GET_BY_USER: "/api/notifications/user/:userId",
  DELETE_ALL: "/api/notifications/delete-all",
};

// ========== PARENT PORTAL ==========
const API_PARENT = {
  DASHBOARD: "/api/parent/dashboard",
  CHILDREN_LIST: "/api/parent/children",
  GET_CHILD: "/api/parent/children/:id",
  CHILD_ATTENDANCE: "/api/parent/children/:id/attendance",
  CHILD_FEES: "/api/parent/children/:id/fees",
  CHILD_RESULTS: "/api/parent/children/:id/results",
  CHILD_HOMEWORK: "/api/parent/children/:id/homework",
  CHILD_TIMETABLE: "/api/parent/children/:id/timetable",
  PAY_FEES: "/api/parent/pay-fees",
  PAYMENT_HISTORY: "/api/parent/payment-history",
  COMPLAINTS: "/api/parent/complaints",
  SUGGESTIONS: "/api/parent/suggestions",
};

// ========== EMPLOYEE / STAFF ==========
const API_EMPLOYEE = {
  LIST: "/api/employees",
  GET: "/api/employees/:id",
  CREATE: "/api/employees",
  UPDATE: "/api/employees/:id",
  DELETE: "/api/employees/:id",
  ATTENDANCE: "/api/employees/:id/attendance",
  LEAVE_REQUEST: "/api/employees/leave-request",
  SALARY_DETAILS: "/api/employees/:id/salary",
  PAYSLIP: "/api/employees/:id/payslip",
  ROLE_CHANGE: "/api/employees/:id/change-role",
};

// ========== TRANSPORT ==========
const API_TRANSPORT = {
  ROUTES: "/api/transport/routes",
  ROUTE_GET: "/api/transport/routes/:id",
  ROUTE_CREATE: "/api/transport/routes",
  ROUTE_UPDATE: "/api/transport/routes/:id",
  ROUTE_DELETE: "/api/transport/routes/:id",
  VEHICLES: "/api/transport/vehicles",
  VEHICLE_GET: "/api/transport/vehicles/:id",
  VEHICLE_CREATE: "/api/transport/vehicles",
  VEHICLE_UPDATE: "/api/transport/vehicles/:id",
  VEHICLE_DELETE: "/api/transport/vehicles/:id",
  STUDENT_ASSIGN: "/api/transport/student-assign",
  TRACKING: "/api/transport/tracking/:vehicleId",
  FEE_STRUCTURE: "/api/transport/fee-structure",
};

// ========== LIBRARY ==========
const API_LIBRARY = {
  BOOKS: "/api/library/books",
  BOOK_GET: "/api/library/books/:id",
  BOOK_CREATE: "/api/library/books",
  BOOK_UPDATE: "/api/library/books/:id",
  BOOK_DELETE: "/api/library/books/:id",
  SEARCH_BOOKS: "/api/library/books/search",
  ISSUE_BOOK: "/api/library/issue",
  RETURN_BOOK: "/api/library/return/:id",
  ISSUED_BOOKS: "/api/library/issued",
  OVERDUE_BOOKS: "/api/library/overdue",
  GENRE_LIST: "/api/library/genres",
  PUBLISHER_LIST: "/api/library/publishers",
};

// ========== REPORTS ==========
const API_REPORT = {
  ATTENDANCE: "/api/reports/attendance",
  FEE_COLLECTION: "/api/reports/fee-collection",
  EXAM_RESULTS: "/api/reports/exam-results",
  STUDENT_LIST: "/api/reports/student-list",
  TEACHER_LIST: "/api/reports/teacher-list",
  FINANCIAL: "/api/reports/financial",
  BIRTHDAY_LIST: "/api/reports/birthday-list",
  TC_REPORT: "/api/reports/tc-report",
  CUSTOM_REPORT: "/api/reports/custom",
  EXPORT: "/api/reports/export",
};

// ========== SETTINGS ==========
const API_SETTINGS = {
  GENERAL: "/api/settings/general",
  ACADEMIC_YEAR: "/api/settings/academic-year",
  HOLIDAYS: "/api/settings/holidays",
  GRADE_SYSTEM: "/api/settings/grade-system",
  NOTIFICATION_SETTINGS: "/api/settings/notifications",
  PAYMENT_GATEWAY: "/api/settings/payment-gateway",
  SMS_CONFIG: "/api/settings/sms-config",
  EMAIL_CONFIG: "/api/settings/email-config",
  BACKUP: "/api/settings/backup",
  RESTORE: "/api/settings/restore",
};

// ========== HOSTEL ==========
const API_HOSTEL = {
  ROOMS: "/api/hostel/rooms",
  ROOM_GET: "/api/hostel/rooms/:id",
  ROOM_CREATE: "/api/hostel/rooms",
  ROOM_UPDATE: "/api/hostel/rooms/:id",
  ROOM_DELETE: "/api/hostel/rooms/:id",
  ALLOCATE: "/api/hostel/allocate",
  RESIDENTS: "/api/hostel/residents",
  RESIDENT_GET: "/api/hostel/residents/:id",
  VISITOR_LOG: "/api/hostel/visitor-log",
  ATTENDANCE: "/api/hostel/attendance",
  COMPLAINTS: "/api/hostel/complaints",
  FEE_STRUCTURE: "/api/hostel/fee-structure",
};

// ========== INVENTORY ==========
const API_INVENTORY = {
  ITEMS: "/api/inventory/items",
  ITEM_GET: "/api/inventory/items/:id",
  ITEM_CREATE: "/api/inventory/items",
  ITEM_UPDATE: "/api/inventory/items/:id",
  ITEM_DELETE: "/api/inventory/items/:id",
  CATEGORIES: "/api/inventory/categories",
  STOCK_ALERT: "/api/inventory/stock-alert",
  PURCHASE: "/api/inventory/purchase",
  STOCK_IN: "/api/inventory/stock-in",
  STOCK_OUT: "/api/inventory/stock-out",
  SUPPLIERS: "/api/inventory/suppliers",
  STOCK_REPORT: "/api/inventory/stock-report",
};

// ========== ID CARD ==========
const API_ID_CARD = {
  GENERATE: "/api/id-card/generate",
  GENERATE_BULK: "/api/id-card/generate-bulk",
  TEMPLATES: "/api/id-card/templates",
  TEMPLATE_CREATE: "/api/id-card/templates",
  TEMPLATE_UPDATE: "/api/id-card/templates/:id",
  TEMPLATE_DELETE: "/api/id-card/templates/:id",
  PREVIEW: "/api/id-card/preview",
  DOWNLOAD: "/api/id-card/download/:id",
  PRINT: "/api/id-card/print/:id",
};

// ========== LEADS / ENQUIRY ==========
const API_LEADS = {
  LIST: "/api/leads",
  GET: "/api/leads/:id",
  CREATE: "/api/leads",
  UPDATE: "/api/leads/:id",
  DELETE: "/api/leads/:id",
  CONVERT_TO_STUDENT: "/api/leads/:id/convert",
  FOLLOW_UP: "/api/leads/:id/follow-up",
  ASSIGN: "/api/leads/:id/assign",
  STATUS_UPDATE: "/api/leads/:id/status",
  EXPORT: "/api/leads/export",
  SOURCES: "/api/leads/sources",
};

// ========== DOCUMENT MANAGEMENT ==========
const API_DOCUMENT = {
  UPLOAD: "/api/documents/upload",
  GET: "/api/documents/:id",
  DELETE: "/api/documents/:id",
  DOWNLOAD: "/api/documents/:id/download",
  GET_BY_STUDENT: "/api/documents/student/:studentId",
  GET_BY_TEACHER: "/api/documents/teacher/:teacherId",
  VERIFY: "/api/documents/:id/verify",
  CATEGORIES: "/api/documents/categories",
};

// ========== BULK OPERATIONS ==========
const API_BULK = {
  IMPORT_STUDENTS: "/api/bulk/import-students",
  IMPORT_TEACHERS: "/api/bulk/import-teachers",
  IMPORT_FEES: "/api/bulk/import-fees",
  EXPORT_ALL: "/api/bulk/export-all",
  DELETE_BULK: "/api/bulk/delete",
  UPDATE_BULK: "/api/bulk/update",
};

// ========== MOBILE APP SPECIFIC ==========
const API_MOBILE = {
  STUDENT_LOGIN: "/api/mobile/student/login",
  PARENT_LOGIN: "/api/mobile/parent/login",
  TEACHER_LOGIN: "/api/mobile/teacher/login",
  STUDENT_DASHBOARD: "/api/mobile/student/dashboard",
  PARENT_DASHBOARD: "/api/mobile/parent/dashboard",
  TEACHER_DASHBOARD: "/api/mobile/teacher/dashboard",
  PUSH_NOTIFICATION: "/api/mobile/push-notification",
  DEVICE_REGISTER: "/api/mobile/device/register",
  SYNC_OFFLINE: "/api/mobile/sync",
};

// ========== EXPORT ALL ==========
const API = {
  AUTH: API_AUTH,
  DASHBOARD: API_DASHBOARD,
  STUDENT: API_STUDENT,
  TEACHER: API_TEACHER,
  CLASS: API_CLASS,
  ATTENDANCE: API_ATTENDANCE,
  FEE: API_FEE,
  EXAM: API_EXAM,
  HOMEWORK: API_HOMEWORK,
  LEAVE: API_LEAVE,
  NOTIFICATION: API_NOTIFICATION,
  PARENT: API_PARENT,
  EMPLOYEE: API_EMPLOYEE,
  TRANSPORT: API_TRANSPORT,
  LIBRARY: API_LIBRARY,
  REPORT: API_REPORT,
  SETTINGS: API_SETTINGS,
  HOSTEL: API_HOSTEL,
  INVENTORY: API_INVENTORY,
  ID_CARD: API_ID_CARD,
  LEADS: API_LEADS,
  DOCUMENT: API_DOCUMENT,
  BULK: API_BULK,
  MOBILE: API_MOBILE,
};

export default API;
