import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const registerUser = createAsyncThunk("auth/register", async (payload,{ rejectWithValue }) => {
      try {
  const res = await api.post("/auth/register", payload);
  return res.data; }
  catch (err) {
      const errorMessage =
        err?.response?.data?.msg ||        // <-- check 'msg' here
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";

      return rejectWithValue(errorMessage);
    }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", payload, { withCredentials: true });
      return res.data; // expects { accessToken }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.msg ||        // <-- check 'msg' here
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";

      return rejectWithValue(errorMessage);
    }
  }
);


const tokenFromStorage = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem("token", action.payload.accessToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error?.message || "Login failed";
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
