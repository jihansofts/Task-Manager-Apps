import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    data: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setToken, setData } = LoginSlice.actions;
export default LoginSlice.reducer;
