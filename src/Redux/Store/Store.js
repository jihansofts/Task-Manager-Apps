import { configureStore } from "@reduxjs/toolkit";
import LoginSliceReducer from "../State-Slice/LoginSlice";
import TotalCountSliceReducer from "../State-Slice/TotalCountSlice";
import TaskSliceReducer from "../State-Slice/TaskSlice";
export default configureStore({
  reducer: {
    login: LoginSliceReducer,
    totalCount: TotalCountSliceReducer,
    task: TaskSliceReducer,
  },
});
