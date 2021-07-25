import { createSlice } from "@reduxjs/toolkit";

export interface Istate {
  profile: object;
  isLogin: boolean;
}

const state: Istate = {
  profile: {},
  isLogin: false,
};

const staffs = createSlice({
  name: "profile",
  initialState: state,
  reducers: {
    // addStaff: (state, action) => { console.log(action.payload); state.data = action.payload },
    getProfile: (state, action) => void (state.profile = action.payload),
    login: (state, action) => void (state.isLogin = action.payload),
  },
});
export const { getProfile, login } = staffs.actions;

export default staffs.reducer;
