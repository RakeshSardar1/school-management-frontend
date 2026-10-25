import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../../utilities/types";
import { AUTH_API } from "../../Constant";
import { Api } from "../../services";

// ==================== UPDATE PASSWORD THUNK ====================
export interface UpdatePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const UpdatePassword = createAsyncThunk<
  { message: string }, // ✅ expected return type
  UpdatePasswordCredentials, // ✅ input argument type
  { rejectValue: string } // ✅ reject value type
>("auth/updatePassword", async (credentials, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    // Validate passwords match
    if (credentials.newPassword !== credentials.confirmPassword) {
      return rejectWithValue("New passwords do not match");
    }

    const response = await Api().put<ApiResponse<{ message: string }>>(
      AUTH_API.UPDATE_PASSWORD,
      {
        currentPassword: credentials.currentPassword,
        newPassword: credentials.newPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.data || !response.data.success) {
      return rejectWithValue(
        response.data?.message || "Failed to update password"
      );
    }

    return {
      message: response.data.message || "Password updated successfully",
    };
  } catch (error) {
    console.error("Failed to update password:", error);

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred");
  }
});
