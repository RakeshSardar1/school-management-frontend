import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthStateTypes, UserTypes } from "../../../utilities/types";
import {
  getTokenFromStorage,
  getUserFromStorage,
} from "../../../utilities/Helpers/authHelper";
import { SUPER_ADMIN } from "../../ConstantCommon";

// const initialState: AuthStateTypes = {
//   user: SUPER_ADMIN, // getUserFromStorage(),
//   token: getTokenFromStorage(),
//   isAuthenticated: !!getUserFromStorage() && !!getTokenFromStorage(),
//   isLoading: false,
//   error: null,
//   successMessage: null,
//   accessToken: "",
//   refreshToken: "",
// };

const initialState: AuthStateTypes = {
  user: SUPER_ADMIN, // getUserFromStorage(),
  token: "ssssssss",
  isAuthenticated: true,
  isLoading: false,
  error: null,
  successMessage: null,
  accessToken: "",
  refreshToken: "ssssssss",
};

// ==================== AUTH SLICE ====================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
