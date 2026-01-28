import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api";

interface LoginDto {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string[] | null;
}

const SLICE_NAME = "auth";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const login = createAsyncThunk<User, LoginDto, { rejectValue: string[] }>(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const { data } = await API.login(userData);
      console.log("Login response:", data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || [error.message || "Login failed"],
      );
    }
  },
);

const getProfile = createAsyncThunk<User, void, { rejectValue: string[] }>(
  `${SLICE_NAME}/getprofile`,
  async (_, thunkAPI) => {
    try {
      const { data } = await API.getProfile();

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unauthorized",
      );
    }
  },
);

const registration = createAsyncThunk<
  User,
  API.SignupDto,
  { rejectValue: string[] }
>(`${SLICE_NAME}/registration`, async (userData, thunkAPI) => {
  try {
    const { data } = await API.registration(userData);
    console.log("Registration response:", data);
    return data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message;
    const statusCode = error.response?.status;
    console.log("Errors from backend:", backendMessage, "- Status code:", statusCode);
    return thunkAPI.rejectWithValue(
      error.response?.data?.errors || "Registration failed",
    );
  }
});

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });

    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });
  },
});

const { reducer: authReducer, actions } = authSlice;

export { login, getProfile, registration };

export const { logout } = actions;

export default authReducer;
