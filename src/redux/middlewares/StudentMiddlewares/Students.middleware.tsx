import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  ApiResponseTypes,
  HealthDataResponseTypes,
} from "../../../utilities/types";
import { Api } from "../../services";
import { ApiEndpoints } from "../../ConstantCommon";

const StudentRegistration = createAsyncThunk<
  ApiResponseTypes<HealthDataResponseTypes>,
  void,
  { rejectValue: ApiResponseTypes<HealthDataResponseTypes> }
>(ApiEndpoints.HEALTH_CHECK, async (_, { rejectWithValue }) => {
  try {
    const response = await Api().get<ApiResponseTypes<HealthDataResponseTypes>>(
      ApiEndpoints.HEALTH_CHECK,
    );

    const { data } = response;

    if (!data || !data.success) {
      return rejectWithValue(data);
    }

    return response.data as unknown as ApiResponseTypes<HealthDataResponseTypes>;
  } catch (error: unknown) {
    const err = error as {
      message?: string;
      code?: string;
      response?: {
        status?: number;
        data?: unknown;
      };
    };

    return rejectWithValue({
      ack: "SERVER_ERROR",
      success: false,
      statusCode: err?.response?.status || 500,
      message: err?.message || "Health check failed",
      data: null,
      meta: {
        request_id: "",
        timestamp: new Date().toISOString(),
      },
      error: {
        code: err?.code || "UNKNOWN_ERROR",
        details: err?.response?.data || null,
      },
    } as unknown as ApiResponseTypes<HealthDataResponseTypes>);
  }
});

export default StudentRegistration;
