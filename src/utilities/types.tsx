// Overview

import type { LucideIcon } from "lucide-react";
import type { ElementType } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: ElementType;
  badge?: string;
  subItems?: SubItems[];
  path?: string;
}
export interface SubItems {
  id: string;
  label: string;
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
  icon: LucideIcon;
  sidebarItemName: string;
}

export type StudentStatus = "Active" | "On Leave" | "Overdue";

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

  status: StudentStatus;

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
