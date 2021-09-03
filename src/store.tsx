import { configureStore } from "@reduxjs/toolkit";
import current from "reduces/current";
import dashboard from "reduces/dashboard";
import management from "reduces/management-staff";
import user from "reduces/user";
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
