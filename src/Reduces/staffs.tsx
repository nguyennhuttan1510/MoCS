import { createSlice } from '@reduxjs/toolkit'

export interface Istate {
    profile: object,
}


const state: Istate = {
    profile: {},

}

const staffs = createSlice({

    name: 'profile',
    initialState: state,
    reducers: {
        // addStaff: (state, action) => { console.log(action.payload); state.data = action.payload },
        getProfile: (state, action) => void (state.profile = action.payload),


    },
})
export const { getProfile } = staffs.actions

export default staffs.reducer


