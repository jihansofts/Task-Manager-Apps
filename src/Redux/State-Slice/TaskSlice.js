import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "task",
  initialState: {
    newAll: [],
    Completed: [],
    Progress: [],
    Canceled: [],
  },
  reducers: {
    setNewTasks: (state, action) => {
      state.newAll = action.payload;
    },
    setCompled: (state, action) => {
      state.Completed = action.payload;
    },
    setProgress: (state, action) => {
      state.Progress = action.payload;
    },
    setCanceled: (state, action) => {
      state.Canceled = action.payload;
    },
  },
});
export const { setNewTasks, setCompled, setProgress, setCanceled } =
  TaskSlice.actions;
export default TaskSlice.reducer;
