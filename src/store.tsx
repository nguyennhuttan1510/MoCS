import { configureStore } from "@reduxjs/toolkit";
import dashboard from "./Reduces/dashboard";
import staffs from "./Reduces/staffs";
import management from "Reduces/management-staff";

const store = configureStore({
  reducer: {
    dashboard: dashboard,
    staffs: staffs,
    management: management,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
