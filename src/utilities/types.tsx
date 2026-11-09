// ============================================================
// OVERVIEW
// ============================================================

// ============================================================
// 🔹 BASIC PRIMITIVES & UNIONS
// ============================================================

// Active status
export type UserActiveTypes = "Active" | "Not Active";

// Gender
export type StudentGender = "Male" | "Female" | "Other" | "Not specified";

//Blood
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

// Fee
export type StudentFeeStatus = "Paid" | "Partial" | "Pending" | "Overdue";

export type StaffGradeShort = (typeof GRADES_DATA)[number];

export const GRADES_DATA = [
  "Grader 1",
  "Grader 2",
  "Grader 3",
  "Grader 4",
  "Grader 5",
  "Grader 6",
  "Grader 7",
  "Grader 8",
  "Grader 9",
  "Grader 10",
  "Grader 11",
  "Grader 12",
];

// Admission progress
export type ProgressKeysTypes =
  | "applied"
  | "doc_verification"
  | "entrance_test"
  | "fee_paid"
  | "enrolled";

export type RegistrationStatus =
  | "Applied"
  | "Document Verification"
  | "Entrance Test"
  | "Fee Paid"
  | "Fully Enrolled";

// Stages
export type StageStatus =
  | "pending"
  | "active"
  | "completed"
  | "skipped"
  | "failed";

// View
export type ViewModeTypes = "grid" | "table";

// Attendance
export type StudentStatus =
  | "Present"
  | "Late"
  | "Absent"
  | "Half Day"
  | "On Leave";
export type StaffStatus = "Present" | "Late" | "Absent" | "On Leave";
export type PeriodStatus = "P" | "L" | "A";
export type LeaveStatus = "Approved" | "Pending" | "Rejected";

export type StaffOfferStatus =
  | "Not Issued"
  | "Issued"
  | "Signed & Attested"
  | "Awaiting Attestation"
  | "Declined";

// Toast
export type ToastType = "success" | "warning" | "info" | "error";

// User roles & categories
export type UserRole =
  | "student"
  | "teacher"
  | "staff"
  | "guard"
  | "admin"
  | "driver"
  | "librarian"
  | "counselor"
  | "nurse"
  | "accountant";

export type ShiftType =
  | "Morning"
  | "Evening"
  | "Night"
  | "General"
  | "Rotational";

export type EmploymentType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Intern"
  | "Volunteer";

export type GateStatus = "On Time" | "Late" | "Early Exit" | "Missed";

export type UserCategory =
  | "super_admin"
  | "admin"
  | "management"
  | "principal"
  | "teacher"
  | "student"
  | "parent"
  | "clerk"
  | "accountant"
  | "librarian"
  | "maintenance"
  | "security"
  | "canteen"
  | "transport"
  | "it_support";

export type UserRankTypes =
  | "super_admin"
  | "admin"
  | "principal"
  | "vice_principal"
  | "hod"
  | "senior_staff"
  | "junior_staff"
  | "intern"
  | "guest"
  | "parent";

// ============================================================
// 🔹 AUTH
// ============================================================

export interface AuthStateTypes {
  isAuthenticated: boolean;
  user: UserCategory | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  token?: string | null;
  successMessage?: string | null;
}

export interface UserTypes {
  id: string;
  distributorId: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  category: UserCategory;
  rank: UserRankTypes;
  sponsorId?: string;
  joinDate: Date | string;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ============================================================
// 🔹 SIDEBAR & NAVIGATION
// ============================================================

export interface SubItems {
  id: string;
  label: string;
  allowedCategories: UserCategory[];
  path?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  subItems?: SubItems[];
  path?: string;
  allowedCategories: UserCategory[];
}

// ============================================================
// 🔹 METRICS & DASHBOARD CARDS
// ============================================================

export interface Metric {
  id: number;
  headText: string;
  fraction: [number, number, string];
  statusRing: boolean;
  ringColor?: string;
}

export interface CardItemRowOverviewTypes {
  id: string;
  title: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
}

// ============================================================
// 🔹 TOAST
// ============================================================

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export interface ToastConfig {
  bg: string;
  icon: string;
  iconClass: string;
}

export type ToastMap = Record<ToastType, ToastConfig>;

// ============================================================
// 🔹 STUDENT TABLE & FILTERS
// ============================================================

export interface TableHeader {
  key: string;
  label: string;
  align: "left" | "center" | "right";
  className?: string;
}

export const STUDENT_TABLE_HEADERS: TableHeader[] = [
  { key: "name", label: "Student Name", align: "left" },
  { key: "admissionRoll", label: "Admission / Roll", align: "left" },
  { key: "gradeSection", label: "Grade & Sec", align: "left" },
  { key: "category", label: "Category", align: "left" },
  { key: "attendance", label: "Attendance", align: "left" },
  { key: "feeStatus", label: "Fee Status", align: "left" },
  { key: "guardianPhone", label: "Guardian Phone", align: "left" },
  { key: "actions", label: "Actions", align: "right" },
];

export interface StudentsFilterStateTypes {
  studentViewMode: "grid" | "table";
  searchQuery: string;
  filterGrade: string;
  filterSection: string;
  filterCategory: string;
  filterStatus: string;
}

export interface StudentDataTypesProps {
  filteredStudents: StudentTypes[];
}

// ============================================================
// 🔹 STUDENT TABS
// ============================================================

export const STUDENT_TAB_IDS = [
  "directory",
  "pipeline",
  "categories",
  "promote",
] as const;

export type StudentProgressTab = (typeof STUDENT_TAB_IDS)[number];

export interface StudentTabItem {
  id: StudentProgressTab;
  label: string;
  icon: string;
  sidebarItemName: string;
}

// ============================================================
// 🔹 STUDENT STAGES
// ============================================================

export interface StageMeta {
  key: string;
  label: string;
  color: string;
  icon: string;
}

// ============================================================
// 🔹 STUDENT MODELS
// ============================================================

// In-progress (form submission payload)
export interface StudentAdmissionInProgress extends StudentRegistrationInProgress {
  religion: string;
  bloodGroup: string;
  avatar?: string;
  parentDetails?: ParentAdmissionDetails;
}

export interface StudentRelationTypes {
  value: string;
  label: string;
  category: string;
}

export interface ParentAdmissionDetails {
  guardianName: string;
  guardianPhone: string;
  motherName: string;
  motherPhone: string;
  relation: string;
  occupation: string;
  qualification: string;
  annualIncome: string;
  address: string;
  guardianEmail: string;
}

// Registration-in-progress (newer used shape)
export interface StudentRegistrationInProgress {
  name: string;
  grade: string;
  gender: StudentGender;
  section: string;
  dob: string;
  category: string;
  paymentStatus: boolean;
}

// Lead / pipeline record
export interface PipeLineLeadsTypes extends StudentRegistrationInProgress {
  parent: string;
  phone: string;
  stage: ProgressKeysTypes;
  date: string;
}

// Fully enrolled student
export interface StudentTypes {
  id: string;
  admissionNo: string;
  rollNo: string;
  name: string;
  avatar?: string;
  grade: string;
  section: string;
  gender: StudentGender;
  category: string;

  status: UserActiveTypes;

  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;

  attendance: number;
  feeStatus: StudentFeeStatus;

  dob: string;
  bloodGroup: string;
  address: string;
  admissionDate: string;
  registrationProgress: boolean;
  verificationStage?: RegistrationStatus;
}

export interface ParentTypes {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  address: string;
  status: UserActiveTypes;
  studentIds: string[];
}

//Staffs

export interface StaffDrawerViewModel {
  id: string;
  name: string;
  role: UserRole; // from your types.ts
  post: string;
  grade: StaffGradeShort; // "Grade A" | "Grade B" | "Grade C"
  salary: string; // display string: "$78,000 / yr"
  offerStatus: StaffOfferStatus;
}

// Education and Experience

export interface IndianQualification {
  level: number;
  qualification: string;
  duration: string;
  entryRequirement: string;
  isDegree: boolean;
}

export interface DocumentUploadFieldProps {
  label: string;
  optional?: boolean;
  file: File | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  fullWidth?: boolean;
}

//API

//API Response for Health Check

export interface HealthDataResponseTypes {
  status: string;
  uptime?: number;
  environment?: string;
  database?: {
    host?: string;
    port?: string;
    name?: string;
  };
  memory?: {
    rss?: string;
    heapUsed?: string;
  };
}
