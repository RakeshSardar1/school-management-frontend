import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthStateTypes,
  LoginResponseTypes,
  UserTypes,
} from "../../../utilities/types";
import { FetchLoginUser } from "../../middlewares";
import {
  getTokenFromStorage,
  getUserFromStorage,
} from "../../../utilities/Helpers/authHelper";

const initialState: AuthStateTypes = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isAuthenticated: !!getUserFromStorage() && !!getTokenFromStorage(),
  isLoading: false,
  error: null,
  successMessage: null,
  accessToken: "",
  refreshToken: "",
};

// ==================== AUTH SLICE ====================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    updateUser: (state, action: PayloadAction<Partial<UserTypes>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    removeAuthData: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // ==================== LOGIN ====================
    builder.addCase(FetchLoginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(
      FetchLoginUser.fulfilled,
      (state, action: PayloadAction<LoginResponseTypes>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.successMessage = "Login successful";
      }
    );
    builder.addCase(FetchLoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Login failed";
      state.user = null;
      state.token = null;
    });
  },
});

export const { clearError, clearSuccess, updateUser, removeAuthData } =
  authSlice.actions;
export default authSlice.reducer;
