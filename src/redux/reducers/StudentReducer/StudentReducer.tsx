// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  PipeLineLeadsTypes,
  ProgressKeysTypes,
  StageMeta,
  StudentAdmissionInProgress,
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

import { findExistingUser } from "../../../utilities/Helpers/findExistingUser";

interface InitialStates {
  studentsProgress: StudentProgressTab;
  studentProgressBar: StudentTabItem[];
  studentsDirectory: StudentTypes[];
  viewStudentProfile: StudentTypes | null;
  progressPipeLine: StageMeta[];
  pipelineLeads: PipeLineLeadsTypes[];
  admissionInProgress: StudentAdmissionInProgress[];
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
      registrationProgress: true,
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
      registrationProgress: true,
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
      status: "Not Active",
      guardianName: "Helena Thorne",
      guardianPhone: "+1 (555) 345-6789",
      guardianEmail: "helena.t@example.com",
      attendance: 84.1,
      feeStatus: "Partial",
      dob: "2010-02-05",
      bloodGroup: "B+",
      address: "450 Ocean Drive, Miami, FL",
      admissionDate: "2021-08-15",
      registrationProgress: false,
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
      registrationProgress: true,
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
      status: "Not Active",
      guardianName: "Sean O'Connor",
      guardianPhone: "+1 (555) 567-8901",
      guardianEmail: "s.oconnor@example.com",
      attendance: 79.5,
      feeStatus: "Overdue",
      dob: "2009-11-14",
      bloodGroup: "O-",
      address: "12 Pinehurst Ave, Seattle, WA",
      admissionDate: "2020-09-01",
      registrationProgress: false,
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
      registrationProgress: true,
    },
  ],
  viewStudentProfile: null,
  progressPipeLine: [
    {
      key: "applied",
      label: "1. Applied",
      color: "border-t-slate-400",
      icon: "Calendar",
    },
    {
      key: "doc_verification",
      label: "2. Doc Verification",
      color: "border-t-blue-500",
      icon: "Calendar",
    },
    {
      key: "entrance_test",
      label: "3. Entrance Test",
      color: "border-t-amber-500",
      icon: "Calendar",
    },
    {
      key: "fee_paid",
      label: "4. Fee Paid",
      color: "border-t-purple-500",
      icon: "CircleCheck",
    },
    {
      key: "enrolled",
      label: "5. Fully Enrolled",
      color: "border-t-emerald-500",
      icon: "FileCheck",
    },
  ],
  pipelineLeads: [
    {
      id: "ADM-LEAD-01",
      name: "Lucas Scott",
      grade: "Grade 9",
      parent: "Karen Scott",
      phone: "+1 555-0192",
      stage: "applied",
      date: "2026-10-20",

      admissionNo: "ADM-1234",
      section: "Section A",
      gender: "Male",
      category: "General",
      guardianName: "Karen Scott",
      guardianPhone: "+1 555-0192",
      dob: "2011-04-12",
    },
    {
      id: "ADM-LEAD-02",
      name: "Maya Lin",
      grade: "Grade 10",
      parent: "Kevin Lin",
      phone: "+1 555-0193",
      stage: "doc_verification",
      date: "2026-10-21",

      admissionNo: "ADM-5678",
      section: "Section B",
      gender: "Female",
      category: "OBC",
      guardianName: "Kevin Lin",
      guardianPhone: "+1 555-0193",
      dob: "2010-08-25",
    },
    {
      id: "ADM-LEAD-03",
      name: "Ethan Harper",
      grade: "Grade 11",
      parent: "Sarah Harper",
      phone: "+1 555-0194",
      stage: "entrance_test",
      date: "2026-10-18",

      admissionNo: "ADM-9012",
      section: "Section A",
      gender: "Male",
      category: "General",
      guardianName: "Sarah Harper",
      guardianPhone: "+1 555-0194",
      dob: "2009-11-03",
    },
    {
      id: "ADM-LEAD-04",
      name: "Isabella Rossi",
      grade: "Grade 9",
      parent: "Marco Rossi",
      phone: "+1 555-0195",
      stage: "fee_paid",
      date: "2026-10-22",

      admissionNo: "ADM-3456",
      section: "Section C",
      gender: "Female",
      category: "SC/ST",
      guardianName: "Marco Rossi",
      guardianPhone: "+1 555-0195",
      dob: "2011-02-14",
    },
    {
      id: "ADM-LEAD-05",
      name: "Gabriel Santos",
      grade: "Grade 12",
      parent: "Maria Santos",
      phone: "+1 555-0196",
      stage: "enrolled",
      date: "2026-10-15",

      admissionNo: "ADM-7890",
      section: "Section B",
      gender: "Male",
      category: "General",
      guardianName: "Maria Santos",
      guardianPhone: "+1 555-0196",
      dob: "2008-06-30",
    },
  ],
  admissionInProgress: [],
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
    admissionNewStudent: (
      state,
      action: PayloadAction<StudentAdmissionInProgress>,
    ) => {
      const newStudent = findExistingUser(
        state.admissionInProgress,
        action.payload,
        ["name", "dob"],
      );

      if (newStudent) {
        state.admissionInProgress.push(newStudent);
      }
    },
    movePipelineStage: (
      state,
      action: PayloadAction<{ leadId: string; nextStage: ProgressKeysTypes }>,
    ) => {
      const { leadId, nextStage } = action.payload;

      state.pipelineLeads = state.pipelineLeads.map((l) =>
        l.id === leadId ? { ...l, stage: nextStage } : l,
      );
    },
  },
});

export const {
  changeProgress,
  viewStudentProfile,
  admissionNewStudent,
  movePipelineStage,
} = StudentReducer.actions;
export default StudentReducer.reducer;
