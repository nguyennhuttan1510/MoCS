import { configureStore } from '@reduxjs/toolkit'
import dashboard from './Reduces/dashboard'
import staffs from './Reduces/staffs'

const store = configureStore({
    reducer: {
        dashboard: dashboard,
        staffs: staffs,
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store