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
  ADMISSION_PROCESS,
  STUDENT_CATEGORIES,
  PROMOTE_STUDENTS,
  EXAM_SCHEDULE,
  MARKS_REPORT_CARDS,
  ADMIT_CARDS,
  GRADE_SETUP,
  CLASS_TIMETABLE,
  TEACHER_TIMETABLE,
  ASSIGN_SUBJECT,
  SUBJECTS_MASTER,
  STAFF_DIRECTORY,
  STAFF_ATTENDANCE,
  PAYROLL_SALARY,
  APPROVE_LEAVE,
  FEE_LEDGER,
  COLLECT_FEES,
  FEE_STRUCTURE,
  DISCOUNT_TYPES,
} from "../../ConstantCommon";

interface CommonStates {
  menu: string[];
  page: string;
  sidebarItems: SidebarItem[];
}

const initialState: CommonStates = {
  menu: ["Home", "Programs", "Gallery", "Teachers", "Notice", "Contact"],
  page: "Home",
  sidebarItems: [
    { id: OVERVIEW, label: SCHOOL_OVERVIEW, icon: Building2 },
    { id: FRONT_OFFICE, label: FRONT_OFFICE_LABEL, icon: Wallet },
    {
      id: STUDENT_INFO,
      label: STUDENT_INFO_LABEL,
      icon: Users,
      badge: "54",
      subItems: [
        STUDENT_DIRECTORY,
        ADMISSION_PROCESS,
        STUDENT_CATEGORIES,
        PROMOTE_STUDENTS,
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
      subItems: [EXAM_SCHEDULE, MARKS_REPORT_CARDS, ADMIT_CARDS, GRADE_SETUP],
    },
    { id: ATTENDANCE, label: ATTENDANCE_LABEL, icon: CalendarCheck },
    {
      id: ONLINE_EXAMS,
      label: ONLINE_EXAMINATIONS,
      icon: Laptop,
    },
    {
      id: ACADEMICS,
      label: ACADEMICS_LABEL,
      icon: BookMarked,
      subItems: [
        CLASS_TIMETABLE,
        TEACHER_TIMETABLE,
        ASSIGN_SUBJECT,
        SUBJECTS_MASTER,
      ],
    },
    { id: LESSON_PLAN, label: LESSON_PLAN_LABEL, icon: BookOpen },
    {
      id: HR,
      label: HUMAN_RESOURCE,
      icon: UserCheck,
      subItems: [
        STAFF_DIRECTORY,
        STAFF_ATTENDANCE,
        PAYROLL_SALARY,
        APPROVE_LEAVE,
      ],
    },
    { id: COMMUNICATE, label: COMMUNICATE_LABEL, icon: MessageSquare },
    {
      id: FEES_COLLECTION,
      label: FEES_COLLECTION_LABEL,
      icon: CreditCard,
      badge: "216",
      subItems: [FEE_LEDGER, COLLECT_FEES, FEE_STRUCTURE, DISCOUNT_TYPES],
    },
  ],
};

const CommonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    currentPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

export const { currentPage } = CommonSlice.actions;
export default CommonSlice.reducer;
