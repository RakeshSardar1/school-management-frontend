import { createAsyncThunk } from "@reduxjs/toolkit";

import { Api } from "../../services";
import type {
  ApiResponseTypes,
  LoginCredentialsTypes,
  LoginResponseTypes,
} from "../../../utilities/types";

// ==================== LOGIN THUNK ====================
export const FetchLoginUser = createAsyncThunk<
  LoginResponseTypes, // ✅ expected return type on success
  LoginCredentialsTypes, // ✅ input argument type
  { rejectValue: string } // ✅ reject value type
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await Api().post<ApiResponseTypes<LoginResponseTypes>>(
     "ROUTE_LOGIN",
      credentials
    );

    // ✅ Check if response is successful
    if (!response.data || !response.data.success) {
      return rejectWithValue(response.data?.message || "Login failed");
    }

    // ✅ Store token and user in localStorage
    const { token, user } = response.data as unknown as LoginResponseTypes;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Return the data
    return response.data as unknown as LoginResponseTypes;
  } catch (error) {
    console.error("Login failed:", error);

    // ✅ Handle error properly
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred during login");
  }
});
