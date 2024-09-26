import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    ProfileData: [],
  },
  reducers: {
    setProfile: (state, action) => {
      state.ProfileData = action.payload;
    },
  },
});

export const { setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
