import { createSlice } from '@reduxjs/toolkit'
import { socket } from 'components/WebSocket/connectSocket'
import { useDispatch } from 'react-redux'


export interface Istate {
    isRedirectDetail: boolean,
    table: object,
    data: Array<any>,
    staffs: Array<any>,
}


const state: Istate = {
    isRedirectDetail: false,
    table: {},
    data: [
    ],
    staffs: []

}

const dashboard = createSlice({

    name: 'table',
    initialState: state,
    reducers: {
        setIsDetail: (state, action) => void (state.isRedirectDetail = action.payload),
        table: (state, action) => {
            const table = action.payload;
            console.log("currentT: ", table)
            if (table) {
                const currentTable = state.data.filter(e => e.id === table.id)
                console.log(currentTable);
                if (currentTable.length > 0) {

                    state.table = currentTable[0]
                    return
                } else {
                    state.table = table
                    return
                }

            }
            state.table = {}
        },

        payBill: (state, action) => {
            const tables = state.data
            const id = action.payload
            console.log("id table: ", id)
            const index = tables.findIndex(e => e.id === id)
            console.log("index: ", index);

            tables.splice(index, 1)
        },

        // addTable: (state, action) => void (state.data = [...state.data, action.payload]),
        addTable: (state, action) => void (state.data = action.payload),

        addMenuOfTable: (state, action) => {
            const { id, food } = action.payload //id = id table, food = food is list food in table 
            state.data = state.data.map((e) => e.id === id ? { ...e, menu: food } : e)
        },

        removeMenuOfTable: (state, action) => { //id = id table, food = food has removed in table 
            const { id, food } = action.payload
            console.log(id, food)

            state.data = state.data.map(item => item.id === id ? { ...item, menu: item.menu.filter((e: any) => e.id !== food.id) } : item)
        },

        staffs: (state, action) => void (state.staffs = action.payload),

    },
})
export const { table, payBill, addTable, addMenuOfTable, removeMenuOfTable, staffs, setIsDetail } = dashboard.actions

export default dashboard.reducer


