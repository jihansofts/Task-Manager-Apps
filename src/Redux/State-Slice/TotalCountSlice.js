import { createSlice } from "@reduxjs/toolkit";

const TotalCountSlice = createSlice({
  name: "totalCount",
  initialState: {
    Total: [],
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.Total = action.payload;
    },
  },
});
export const { setTotalCount } = TotalCountSlice.actions;
export default TotalCountSlice.reducer;
