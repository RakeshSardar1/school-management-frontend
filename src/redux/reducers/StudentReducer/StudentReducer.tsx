// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  StudentProgressTab,
  StudentTabItem,
  StudentTypes,
} from "../../../utilities/types";
import {
  ADMISSION_PROCESS,
  PROMOTE_STUDENTS,
  STUDENT_CATEGORIES,
  STUDENT_DIRECTORY,
} from "../../ConstantCommon";

interface InitialStates {
  studentsProgress: StudentProgressTab;
  studentProgressBar: StudentTabItem[];
  studentsDirectory: StudentTypes[];
  viewStudentProfile: StudentTypes | null;
}

const initialState: InitialStates = {
  studentsProgress: "directory",
  studentProgressBar: [
    {
      id: "directory",
      label: STUDENT_DIRECTORY,
      icon: "Users",
      sidebarItemName: "Student Directory",
    },
    {
      id: "pipeline",
      label: ADMISSION_PROCESS,
      icon: "UserPlus",
      sidebarItemName: "Admission Process",
    },
    {
      id: "categories",
      label: STUDENT_CATEGORIES,
      icon: "PieChart",
      sidebarItemName: "Student Categories",
    },
    {
      id: "promote",
      label: PROMOTE_STUDENTS,
      icon: "RefreshCw",
      sidebarItemName: "Promote Students",
    },
  ],
  studentsDirectory: [
    {
      id: "STU-2026-001",
      admissionNo: "ADM-9481",
      rollNo: "101",
      name: "Alexander Vance",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 10",
      section: "A",
      gender: "Male",
      category: "General",
      status: "Active",
      guardianName: "Robert Vance",
      guardianPhone: "+1 (555) 234-5678",
      guardianEmail: "robert.vance@example.com",
      attendance: 96.4,
      feeStatus: "Paid",
      dob: "2010-04-12",
      bloodGroup: "O+",
      address: "742 Evergreen Terrace, Springfield",
      admissionDate: "2021-08-15",
    },
    {
      id: "STU-2026-002",
      admissionNo: "ADM-9482",
      rollNo: "102",
      name: "Sophia Chen",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 10",
      section: "A",
      gender: "Female",
      category: "International",
      status: "Active",
      guardianName: "David Chen",
      guardianPhone: "+1 (555) 876-5432",
      guardianEmail: "david.chen@example.com",
      attendance: 98.2,
      feeStatus: "Paid",
      dob: "2010-09-21",
      bloodGroup: "A+",
      address: "128 Beacon St, Boston, MA",
      admissionDate: "2022-01-10",
    },
    {
      id: "STU-2026-003",
      admissionNo: "ADM-9483",
      rollNo: "103",
      name: "Marcus Aurelius Thorne",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 10",
      section: "B",
      gender: "Male",
      category: "Sports Quota",
      status: "On Leave",
      guardianName: "Helena Thorne",
      guardianPhone: "+1 (555) 345-6789",
      guardianEmail: "helena.t@example.com",
      attendance: 84.1,
      feeStatus: "Partial",
      dob: "2010-02-05",
      bloodGroup: "B+",
      address: "450 Ocean Drive, Miami, FL",
      admissionDate: "2021-08-15",
    },
    {
      id: "STU-2026-004",
      admissionNo: "ADM-9484",
      rollNo: "104",
      name: "Aaliyah Patel",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 9",
      section: "A",
      gender: "Female",
      category: "OBC",
      status: "Active",
      guardianName: "Rajesh Patel",
      guardianPhone: "+1 (555) 456-7890",
      guardianEmail: "rajesh.patel@example.com",
      attendance: 94.8,
      feeStatus: "Paid",
      dob: "2011-06-30",
      bloodGroup: "AB+",
      address: "88 Lincoln Blvd, Chicago, IL",
      admissionDate: "2023-08-20",
    },
    {
      id: "STU-2026-005",
      admissionNo: "ADM-9485",
      rollNo: "105",
      name: "Liam O'Connor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 11",
      section: "C",
      gender: "Male",
      category: "General",
      status: "Overdue",
      guardianName: "Sean O'Connor",
      guardianPhone: "+1 (555) 567-8901",
      guardianEmail: "s.oconnor@example.com",
      attendance: 79.5,
      feeStatus: "Overdue",
      dob: "2009-11-14",
      bloodGroup: "O-",
      address: "12 Pinehurst Ave, Seattle, WA",
      admissionDate: "2020-09-01",
    },
    {
      id: "STU-2026-006",
      admissionNo: "ADM-9486",
      rollNo: "106",
      name: "Zoe Kravitz-Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      grade: "Grade 12",
      section: "A",
      gender: "Female",
      category: "SC/ST",
      status: "Active",
      guardianName: "Diana Smith",
      guardianPhone: "+1 (555) 678-9012",
      guardianEmail: "diana.smith@example.com",
      attendance: 99.1,
      feeStatus: "Paid",
      dob: "2008-01-08",
      bloodGroup: "A-",
      address: "505 Sunset Blvd, Los Angeles, CA",
      admissionDate: "2019-08-12",
    },
  ],
  viewStudentProfile: null,
};

const StudentReducer = createSlice({
  name: "StudentReducer",
  initialState,
  reducers: {
    changeProgress: (state, action: PayloadAction<StudentProgressTab>) => {
      state.studentsProgress = action.payload;
    },
    viewStudentProfile: (state, action: PayloadAction<StudentTypes | null>) => {
      state.viewStudentProfile = action.payload;
    },
  },
});

export const { changeProgress, viewStudentProfile } = StudentReducer.actions;
export default StudentReducer.reducer;
