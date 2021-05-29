import { configureStore } from '@reduxjs/toolkit'
import dashboard from 'Reduces/dashboard'

const store = configureStore({
    reducer: {
        dashboard: dashboard,
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store