// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GradeConfigurationTypes } from "../../../utilities/types";

interface InitialStates {
  academicYear: string;
  currency: string;
  gradeConfigurations: GradeConfigurationTypes[];
  paymentLevels: Record<
    string,
    { label: string; category: string; appearOn: string[] }
  >;
}

const initialState: InitialStates = {
  academicYear: "2026-2027",
  currency: "INR",
  gradeConfigurations: [
    {
      gradeId: "grade_1",
      gradeName: "Grade 1",
      fees: {
        admissionFee: 5000,
        tuitionFeeTerm1: 12000,
        tuitionFeeTerm2: 12000,
        examFee: 1500,
        libraryLabFee: 2000,
        transportFeeQuarterly: 3500,
      },
    },
    {
      gradeId: "grade_2",
      gradeName: "Grade 2",
      fees: {
        admissionFee: 5500,
        tuitionFeeTerm1: 12500,
        tuitionFeeTerm2: 12500,
        examFee: 1500,
        libraryLabFee: 2000,
        transportFeeQuarterly: 3500,
      },
    },
    {
      gradeId: "grade_3",
      gradeName: "Grade 3",
      fees: {
        admissionFee: 6000,
        tuitionFeeTerm1: 13000,
        tuitionFeeTerm2: 13000,
        examFee: 1800,
        libraryLabFee: 2200,
        transportFeeQuarterly: 4000,
      },
    },
    {
      gradeId: "grade_4",
      gradeName: "Grade 4",
      fees: {
        admissionFee: 6000,
        tuitionFeeTerm1: 13000,
        tuitionFeeTerm2: 13000,
        examFee: 1800,
        libraryLabFee: 2200,
        transportFeeQuarterly: 4000,
      },
    },
    {
      gradeId: "grade_5",
      gradeName: "Grade 5",
      fees: {
        admissionFee: 7000,
        tuitionFeeTerm1: 14000,
        tuitionFeeTerm2: 14000,
        examFee: 2000,
        libraryLabFee: 2500,
        transportFeeQuarterly: 4000,
      },
    },
    {
      gradeId: "grade_6",
      gradeName: "Grade 6",
      fees: {
        admissionFee: 7500,
        tuitionFeeTerm1: 15000,
        tuitionFeeTerm2: 15000,
        examFee: 2500,
        libraryLabFee: 2800,
        transportFeeQuarterly: 4500,
      },
    },
    {
      gradeId: "grade_7",
      gradeName: "Grade 7",
      fees: {
        admissionFee: 8000,
        tuitionFeeTerm1: 16000,
        tuitionFeeTerm2: 16000,
        examFee: 2500,
        libraryLabFee: 3000,
        transportFeeQuarterly: 4500,
      },
    },
    {
      gradeId: "grade_8",
      gradeName: "Grade 8",
      fees: {
        admissionFee: 8500,
        tuitionFeeTerm1: 17000,
        tuitionFeeTerm2: 17000,
        examFee: 2800,
        libraryLabFee: 3000,
        transportFeeQuarterly: 5000,
      },
    },
    {
      gradeId: "grade_9",
      gradeName: "Grade 9",
      fees: {
        admissionFee: 9000,
        tuitionFeeTerm1: 18000,
        tuitionFeeTerm2: 18000,
        examFee: 3000,
        libraryLabFee: 3500,
        transportFeeQuarterly: 5000,
      },
    },
    {
      gradeId: "grade_10",
      gradeName: "Grade 10",
      fees: {
        admissionFee: 10000,
        tuitionFeeTerm1: 20000,
        tuitionFeeTerm2: 20000,
        examFee: 4000,
        libraryLabFee: 4000,
        transportFeeQuarterly: 5500,
      },
    },
    {
      gradeId: "grade_11",
      gradeName: "Grade 11",
      fees: {
        admissionFee: 12000,
        tuitionFeeTerm1: 22000,
        tuitionFeeTerm2: 22000,
        examFee: 4500,
        libraryLabFee: 4500,
        transportFeeQuarterly: 6000,
      },
    },
    {
      gradeId: "grade_12",
      gradeName: "Grade 12",
      fees: {
        admissionFee: 15000,
        tuitionFeeTerm1: 25000,
        tuitionFeeTerm2: 25000,
        examFee: 5000,
        libraryLabFee: 5000,
        transportFeeQuarterly: 6000,
      },
    },
  ],
  paymentLevels: {
    tuitionFeeTerm1: {
      label: "Tuition Fee (Term 1)",
      category: "recurring",
      appearOn: ["admission"],
    },
    tuitionFeeTerm2: {
      label: "Tuition Fee (Term 2)",
      category: "recurring",
      appearOn: ["admission"],
    },
    admissionFee: {
      label: "Admission Fee (One-time)",
      category: "one_time",
      appearOn: ["admission"],
    },
    libraryLabFee: {
      label: "Library & Lab Fee",
      category: "recurring",
      appearOn: ["admission"],
    },
    examFee: {
      label: "Examination Fee",
      category: "recurring",
      appearOn: ["exam"],
    },
    transportFeeQuarterly: {
      label: "Transport Fee (Quarterly)",
      category: "optional",
      appearOn: ["travel"],
    },
  },
};

const PaymentReducers = createSlice({
  name: "PaymentReducers",
  initialState,
  reducers: {
    changeAcademicYear: (state, action: PayloadAction<string>) => {
      state.academicYear = action.payload;
    },
  },
});

export const { changeAcademicYear } = PaymentReducers.actions;
export default PaymentReducers.reducer;
