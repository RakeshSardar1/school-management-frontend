import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../services";
// ==================== LOGOUT THUNK ====================
export const LogoutUser = createAsyncThunk<
  { success: boolean }, // ✅ expected return type
  void, // ✅ input argument type (no params)
  { rejectValue: string } // ✅ reject value type
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    // Optional: Call logout API if your backend has one
    const token = localStorage.getItem("token");

    if (token) {
      await Api().post(
        "ROUTE_LOGOUT",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    // ✅ Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return { success: true };
  } catch (error) {
    console.error("Logout failed:", error);

    // Still clear local storage even if API fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred during logout");
  }
});
