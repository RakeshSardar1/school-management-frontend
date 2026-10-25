// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Metric } from "../../../utilities/types";

interface CommonStates {
  overviewRow: Metric[];
}

const initialState: CommonStates = {
  overviewRow: [
    {
      id: 1,
      headText: "Fees Awaiting Payment",
      fraction: [14, 238, "%"],
      statusRing: true,
      ringColor: "#D6B36A",
    },
    {
      id: 2,
      headText: "Staff Present Today",
      fraction: [20, 100, "%"],
      statusRing: true,
      ringColor: "#3B82F6",
    },
    {
      id: 3,
      headText: "Staff Present Today",
      fraction: [10, 80, "% Attendance"],
      statusRing: false,
    },
  ],
};

const OverviewReducer = createSlice({
  name: "OverviewReducer",
  initialState,
  reducers: {
    currentPage: (state, action: PayloadAction<string>) => {
      // state.page = action.payload;
    },
  },
});

export const { currentPage } = OverviewReducer.actions;
export default OverviewReducer.reducer;
