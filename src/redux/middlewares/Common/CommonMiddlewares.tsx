import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../../utilities/types";
import { SIDEBAR_API } from "../../Constant"; // Make sure to define this
import { Api } from "../../services";

// ==================== TYPES ====================
export interface SidebarItem {
  id: number;
  title: string;
  icon: string;
  path: string;
}

// ==================== GET SIDEBAR THUNK ====================
export const GetSidebarItems = createAsyncThunk<
  SidebarItem[], // ✅ expected return type (array of items)
  void, // ✅ no input arguments needed for a GET request
  { rejectValue: string } // ✅ reject value type
>("sidebar/getItems", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    // Calling Supabase REST API: /rest/v1/sidebar?select=*
    const response = await Api.get<SidebarItem[]>(
      SIDEBAR_API.GET_ALL, // e.g., "/sidebar?select=*"
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: The 'apikey' header is already handled inside your axios instance!
        },
      },
    );

    // For Supabase GET requests, the response is just the array directly,
    // not wrapped in a success object like your custom backend.
    if (!response.data) {
      return rejectWithValue("Failed to fetch sidebar data");
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch sidebar:", error);

    // Type-safe error handling for Axios
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unknown error occurred");
  }
});
