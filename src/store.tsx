import { configureStore } from "@reduxjs/toolkit";
import dashboard from "./reduces/dashboard";
import user from "./reduces/user";
import management from "reduces/management-staff";
import current from "reduces/current";
const store = configureStore({
  reducer: {
    dashboard: dashboard,
    user: user,
    management: management,
    current: current,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
