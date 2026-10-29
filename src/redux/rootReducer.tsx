import { combineReducers } from "@reduxjs/toolkit";
import {
  CommonSlice,
  ModalReducer,
  StudentReducer,
  StudentToastReducer,
} from "./reducers";
import { authSlice } from "./reducers/Auth";
import { OverviewReducer } from "./reducers/OverviewReducer";
import { FiltersReducer, StudentFiltersReducer } from "./reducers/Filters";

const filters = combineReducers({
  filter: FiltersReducer,
  studentsFilter: StudentFiltersReducer,
});

const rootReducer = combineReducers({
  common: CommonSlice,
  auth: authSlice,
  overView: OverviewReducer,
  student: StudentReducer,
  filter: filters,
  toast: StudentToastReducer,
  modal: ModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
