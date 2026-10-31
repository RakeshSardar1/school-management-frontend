// Overview

import type { LucideIcon } from "lucide-react";

//Active
export type UserActiveTypes = "Active" | "Not Active";

// Auth State Interface
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

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  subItems?: SubItems[];
  path?: string;
  allowedCategories: UserCategory[];
}
export interface SubItems {
  id: string;
  label: string;
  allowedCategories: UserCategory[];
}

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
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
}

//Toast
export type ToastType = "success" | "warning" | "info" | "error";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}
export interface ToastConfig {
  bg: string;
  icon: LucideIcon;
  iconClass: string;
}
export type ToastMap = Record<ToastType, ToastConfig>;

//Filters
export interface StudentDataTypesProps {
  filteredStudents: StudentTypes[];
}
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

//Student Types
export type ViewModeTypes = "grid" | "table";
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

export type StudentGender = "Male" | "Female" | "Other" | "Not specified";

export type StudentFeeStatus = "Paid" | "Partial" | "Pending" | "Overdue";

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
}

//Attandences
export type StudentStatus =
  | "Present"
  | "Late"
  | "Absent"
  | "Half Day"
  | "On Leave";
export type StaffStatus = "Present" | "Late" | "Absent" | "On Leave";
export type PeriodStatus = "P" | "L" | "A";
export type LeaveStatus = "Approved" | "Pending" | "Rejected";

//Stuffs

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
  | "super_admin" // System owner
  | "admin" // School Admin
  | "principal" // Head of school
  | "vice_principal"
  | "hod" // Head of Department
  | "senior_staff"
  | "junior_staff"
  | "intern" // Lowest staff level
  | "guest"
  | "parent";

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
