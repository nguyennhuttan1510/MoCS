import { createSlice } from "@reduxjs/toolkit";

export interface Istate {
  profile: object;
  isLogin: boolean;
}

const state: Istate = {
  profile: {},
  isLogin: false,
};

const user = createSlice({
  name: "profile",
  initialState: state,
  reducers: {
    getProfile: (state, action) => void (state.profile = action.payload),
    login: (state, action) => void (state.isLogin = action.payload),
  },
});
export const { getProfile, login } = user.actions;

export default user.reducer;
