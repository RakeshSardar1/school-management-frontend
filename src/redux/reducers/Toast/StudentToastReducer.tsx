import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Toast } from "../../../utilities/types";

export interface StudentFiltersState {
  toasts: Toast[];
  selectedToast: Toast | null;
}

const initialState: StudentFiltersState = {
  toasts: [
    {
      id: "1",
      type: "success",
      message: "Student admission created successfully",
    },
    {
      id: "2",
      type: "warning",
      message: "Student attendance is below 75%",
    },
    {
      id: "3",
      type: "info",
      message: "New admission application received",
    },
    {
      id: "4",
      type: "error",
      message: "Failed to save student information",
    },
  ],
  selectedToast: null,
};

const StudentToastReducer = createSlice({
  name: "StudentToastReducer",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast | null>) => {
      state.selectedToast = action.payload;
    },
  },
});

export const { addToast } = StudentToastReducer.actions;

export default StudentToastReducer.reducer;
