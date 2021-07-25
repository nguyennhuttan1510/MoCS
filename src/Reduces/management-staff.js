import { createSlice } from "@reduxjs/toolkit";
import { socket } from "components/WebSocket/connectSocket";
import { useDispatch } from "react-redux";

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

    managementBestSeller: (state, action) =>
      void (state.managementBestSeller = action.payload),
  },
});
export const { managementStaff, managementBestSeller } = management.actions;

export default management.reducer;
