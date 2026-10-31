import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ViewModeTypes } from "../../../utilities/types";

export interface StudentFiltersState {
  studentViewMode: ViewModeTypes;
  searchQuery: string;
  filterGrade: string;
  filterSection: string;
  filterCategory: string;
  filterStatus: string;
}

const initialState: StudentFiltersState = {
  studentViewMode: "grid",
  searchQuery: "",
  filterGrade: "All",
  filterSection: "All",
  filterCategory: "All",
  filterStatus: "All",
};

const StudentFiltersReducer = createSlice({
  name: "StudentFiltersReducer",
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<ViewModeTypes>) => {
      state.studentViewMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterGrade: (state, action: PayloadAction<string>) => {
      state.filterGrade = action.payload;
    },
    setFilterSection: (state, action: PayloadAction<string>) => {
      state.filterSection = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  changeViewMode,
  setSearchQuery,
  setFilterGrade,
  setFilterSection,
  setFilterCategory,
  setFilterStatus,
} = StudentFiltersReducer.actions;

export default StudentFiltersReducer.reducer;
