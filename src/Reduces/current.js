import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleHeader: "",
};

const current = createSlice({
  name: "current",
  initialState: initialState,
  reducers: {
    setTitleHeader: (state, actions) =>
      void (state.titleHeader = actions.payload),
  },
});
export const { setTitleHeader } = current.actions;

export default current.reducer;
