import { createSlice } from '@reduxjs/toolkit'

export interface Istate {
    staff: object,
    data: Array<any>
}


const state: Istate = {
    staff: {},
    data: []

}

const staffs = createSlice({

    name: 'staffs',
    initialState: state,
    reducers: {
        // addStaff: (state, action) => { console.log(action.payload); state.data = action.payload },
        addStaff: (state, action) => void (state.data = action.payload),


    },
})
export const { addStaff } = staffs.actions

export default staffs.reducer


