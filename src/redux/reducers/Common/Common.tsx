// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { SidebarItem } from "../../../utilities/types";

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
    {
      id: "overview",
      label: "School Overview",
      icon: "Building2",
      path: "/",
      allowedCategories: [
        "admin",
        "management",
        "principal",
        "clerk",
        "teacher",
      ],
    },
    {
      id: "front-office",
      label: "Front Office",
      icon: "Wallet",
      allowedCategories: ["admin", "management", "clerk", "security"],
    },
    {
      id: "student-info",
      label: "Student Info",
      icon: "Users",
      badge: "54",
      path: "students",
      allowedCategories: [
        "admin",
        "management",
        "principal",
        "clerk",
        "teacher",
      ],
      subItems: [
        {
          id: "student-directory",
          label: "Student Directory",
          allowedCategories: [
            "admin",
            "management",
            "principal",
            "clerk",
            "teacher",
          ],
        },
        {
          id: "admission-process",
          label: "Admission Process",
          allowedCategories: ["admin", "management", "clerk"],
        },
        {
          id: "student-categories",
          label: "Student Categories",
          allowedCategories: ["admin", "management"],
        },
        {
          id: "promote-students",
          label: "Promote Students",
          allowedCategories: ["admin", "principal"],
        },
      ],
    },
    {
      id: "income-expense",
      label: "Income & Expense",
      icon: "Receipt",
      allowedCategories: ["admin", "management", "accountant"],
    },
    {
      id: "cbse",
      label: "CBSE Examination",
      icon: "FileCheck2",
      allowedCategories: ["admin", "management", "principal", "teacher"],
    },
    {
      id: "examinations",
      label: "Examinations",
      icon: "FileText",
      badge: "Active",
      allowedCategories: ["admin", "principal", "teacher", "clerk"],
      subItems: [
        {
          id: "exam-schedule",
          label: "Exam Schedule",
          allowedCategories: ["admin", "principal", "teacher"],
        },
        {
          id: "marks-report-cards",
          label: "Marks & Report Cards",
          allowedCategories: ["admin", "principal", "teacher"],
        },
        {
          id: "admit-cards",
          label: "Admit Cards",
          allowedCategories: ["admin", "clerk"],
        },
        {
          id: "grade-setup",
          label: "Grade Setup",
          allowedCategories: ["admin", "principal"],
        },
      ],
    },
    {
      id: "attendance",
      path: "attendances",
      label: "Attendance",
      icon: "CalendarCheck",
      allowedCategories: [
        "admin",
        "management",
        "principal",
        "teacher",
        "clerk",
      ],
      subItems: [
        {
          id: "student-roster",
          label: "Student Attendance",
          allowedCategories: ["admin", "principal", "teacher"],
        },
        {
          id: "staff-roster",
          label: "Staff & Teacher Attendance",
          allowedCategories: ["admin", "management", "principal"],
        },
        {
          id: "period-roster",
          label: "Subject / Period Attendance",
          allowedCategories: ["admin", "principal", "teacher"],
        },
        {
          id: "monthly-analytics",
          label: "Analytics & Monthly Sheet",
          allowedCategories: ["admin", "management", "principal"],
        },
        {
          id: "leave-approvals",
          label: "Leave Requests",
          allowedCategories: ["admin", "management", "principal"],
        },
        {
          id: "biometric-log",
          label: "Biometric / RFID Stream",
          allowedCategories: ["admin", "it_support"],
        },
        {
          id: "defaulter-list",
          label: "Defaulter & Low Attendance",
          allowedCategories: ["admin", "principal", "teacher"],
        },
      ],
    },
    {
      id: "academics",
      label: "Academics",
      icon: "BookMarked",
      allowedCategories: ["admin", "management", "principal", "teacher"],
    },
    {
      id: "lesson-plan",
      label: "Lesson Plan",
      icon: "BookOpen",
      allowedCategories: ["admin", "principal", "teacher"],
    },
    {
      id: "fees-collection",
      label: "Fees Collection",
      icon: "CreditCard",
      badge: "216",
      allowedCategories: ["admin", "management", "accountant", "clerk"],
    },
  ] satisfies SidebarItem[],
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
