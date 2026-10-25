import { combineReducers } from "@reduxjs/toolkit";
import { CommonSlice } from "./reducers";
import { authSlice } from "./reducers/Auth";
import { OverviewReducer } from "./reducers/OverviewReducer";

const rootReducer = combineReducers({
  common: CommonSlice,
  auth: authSlice,
  overView: OverviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
