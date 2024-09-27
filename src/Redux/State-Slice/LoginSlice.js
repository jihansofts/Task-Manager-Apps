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
    logout: (state, action) => {
      state.data = [];
      state.token = "";
    },
  },
});
export const { setToken, setData, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
