import { createSlice } from "@reduxjs/toolkit";

const state = {
  managementStaff: [],
  managementBestSeller: [],
};

const management = createSlice({
  name: "management",
  initialState: state,
  reducers: {
    managementStaff: (state, action) =>
      void (state.managementStaff = action.payload),

    foodBestSeller: (state, action) =>
      void (state.managementBestSeller = action.payload),
  },
});
export const { managementStaff, foodBestSeller } = management.actions;

export default management.reducer;
