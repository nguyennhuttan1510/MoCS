import { createSlice } from '@reduxjs/toolkit'

export interface Istate {
    path: string,
}

export interface Idashboard {
    path: string,
}

const state: Istate = {
    path: "",

}

const dashboard = createSlice({
    name: 'test',
    initialState: state,
    reducers: {
        path: (state, action) => void (state.path = action.payload)
    },
})
//   // now available:
//   dashboard.actions.increment(2)
//   // also available:
//   dashboard.caseReducers.increment(0, { type: 'increment', payload: 5 })

// Action creators are generated for each case reducer function
export const { path } = dashboard.actions

export default dashboard.reducer