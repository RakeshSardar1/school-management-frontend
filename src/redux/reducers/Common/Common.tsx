// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Building2,
  Users,
  BookOpen,
  Tv,
  GitFork,
  Video,
  Smile,
  Receipt,
  FileCheck2,
  CalendarCheck,
  Laptop,
  BookMarked,
  FileText,
  UserCheck,
  MessageSquare,
  Wallet,
  CreditCard,
} from "lucide-react";
import type { SidebarItem } from "../../../utilities/types";
import {
  OVERVIEW,
  SCHOOL_OVERVIEW,
  FRONT_OFFICE,
  FRONT_OFFICE_LABEL,
  STUDENT_INFO,
  STUDENT_INFO_LABEL,
  ONLINE_COURSE,
  ONLINE_COURSE_LABEL,
  MULTI_BRANCH,
  MULTI_BRANCH_LABEL,
  LIVE_CLASSES,
  LIVE_CLASSES_LABEL,
  BEHAVIOR,
  BEHAVIOR_RECORDS,
  INCOME_EXPENSE,
  INCOME_EXPENSE_LABEL,
  CBSE,
  CBSE_EXAMINATION,
  EXAMINATIONS,
  EXAMINATIONS_LABEL,
  ATTENDANCE,
  ATTENDANCE_LABEL,
  ONLINE_EXAMS,
  ONLINE_EXAMINATIONS,
  ACADEMICS,
  ACADEMICS_LABEL,
  LESSON_PLAN,
  LESSON_PLAN_LABEL,
  HR,
  HUMAN_RESOURCE,
  COMMUNICATE,
  COMMUNICATE_LABEL,
  FEES_COLLECTION,
  FEES_COLLECTION_LABEL,
  STUDENT_DIRECTORY,
} from "../../ConstantCommon";

interface CommonStates {
  menu: string[];
  page: string;
  sidebarItems: SidebarItem[];
  subItem: string | null;
}

const initialState: CommonStates = {
  menu: ["Home", "Programs", "Gallery", "Teachers", "Notice", "Contact"],
  page: "overview",
  sidebarItems: [
    { id: OVERVIEW, label: SCHOOL_OVERVIEW, icon: Building2, path: "/" },
    { id: FRONT_OFFICE, label: FRONT_OFFICE_LABEL, icon: Wallet },
    {
      id: STUDENT_INFO,
      label: STUDENT_INFO_LABEL,
      icon: Users,
      badge: "54",
      path: "students",
      subItems: [
        { id: "student-directory", label: STUDENT_DIRECTORY },
        { id: "admission-process", label: "Admission Process" },
        { id: "student-categories", label: "Student Categories" },
        { id: "promote-students", label: "Promote Students" },
      ],
    },
    {
      id: ONLINE_COURSE,
      label: ONLINE_COURSE_LABEL,
      icon: Tv,
      badge: "Live",
    },
    { id: MULTI_BRANCH, label: MULTI_BRANCH_LABEL, icon: GitFork },
    { id: LIVE_CLASSES, label: LIVE_CLASSES_LABEL, icon: Video },
    { id: BEHAVIOR, label: BEHAVIOR_RECORDS, icon: Smile },
    {
      id: INCOME_EXPENSE,
      label: INCOME_EXPENSE_LABEL,
      icon: Receipt,
    },
    { id: CBSE, label: CBSE_EXAMINATION, icon: FileCheck2 },
    {
      id: EXAMINATIONS,
      label: EXAMINATIONS_LABEL,
      icon: FileText,
      badge: "Active",
      subItems: [
        { id: "exam-schedule", label: "Exam Schedule" },
        { id: "marks-report-cards", label: "Marks & Report Cards" },
        { id: "admit-cards", label: "Admit Cards" },
        { id: "grade-setup", label: "Grade Setup" },
      ],
    },
    {
      id: ATTENDANCE,
      path: "attendances",
      label: ATTENDANCE_LABEL,
      icon: CalendarCheck,
      subItems: [
        { id: "student-roster", label: "Student Attendance" },
        { id: "staff-roster", label: "Staff & Teacher Attendance" },
        { id: "period-roster", label: "Subject / Period Attendance" },
        { id: "monthly-analytics", label: "Analytics & Monthly Sheet" },
        { id: "leave-approvals", label: "Leave Requests" },
        { id: "biometric-log", label: "Biometric / RFID Stream" },
        { id: "defaulter-list", label: "Defaulter & Low Attendance" },
      ],
    },
    {
      id: ONLINE_EXAMS,
      label: ONLINE_EXAMINATIONS,
      icon: Laptop,
    },
    {
      id: ACADEMICS,
      label: ACADEMICS_LABEL,
      icon: BookMarked,
    },
    { id: LESSON_PLAN, label: LESSON_PLAN_LABEL, icon: BookOpen },
    {
      id: HR,
      label: HUMAN_RESOURCE,
      icon: UserCheck,
    },
    { id: COMMUNICATE, label: COMMUNICATE_LABEL, icon: MessageSquare },
    {
      id: FEES_COLLECTION,
      label: FEES_COLLECTION_LABEL,
      icon: CreditCard,
      badge: "216",
    },
  ],
  subItem: null,
};

const CommonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    currentSidebar: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
      const havingSubItem = state.sidebarItems.find(
        (e) => e.id === action.payload,
      );
      if (havingSubItem?.subItems?.length) {
        // state.subItem = havingSubItem.find(e=> e.)
      }
    },
    currentSubSidebar: (state, action: PayloadAction<string>) => {
      state.subItem = action.payload;
    },
  },
});

export const { currentSidebar, currentSubSidebar } = CommonSlice.actions;
export default CommonSlice.reducer;
