import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (params) => {
  const res = await api.get("/tasks/getAllTask", { params });
  return res.data;
});

export const createTask = createAsyncThunk("tasks/create", async (payload,{ rejectWithValue }) => {
    try{
  const res = await api.post("/tasks/createTask", payload);
  return res.data;
    }
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

export const updateTask = createAsyncThunk("tasks/update", async ({ id, data },{ rejectWithValue }) => {
    try{
    console.log("data",data)
  const res = await api.put("/tasks/updateTask", data, {
  params: { id },
  headers: { "Content-Type": "application/json" }
});
  return res.data;
}
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

export const deleteTask = createAsyncThunk("tasks/delete", async (id,{ rejectWithValue }) => {
    try{
  const res = await api.delete(`/tasks/deleteTask`, { params: { id } });
  return { id, result: res.data };
    }
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

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [], total: 0, page: 1, pages: 1, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.tasks;
        state.total = action.payload.total || action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.totalPages || 1;
        state.status = "succeeded";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const id = state.items.findIndex((t) => t._id === action.payload._id);
        if (id !== -1) state.items[id] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload.id);
      });
  },
});

export default tasksSlice.reducer;
