import { createSlice } from '@reduxjs/toolkit'

export interface Istate {
    table: object,
    data: Array<any>
}


const state: Istate = {
    table: {},
    data: [
    ]

}

const dashboard = createSlice({
    name: 'test',
    initialState: state,
    reducers: {
        table: (state, action) => {
            const table = action.payload;
            if (table) {
                const currentTable = state.data.filter(e => e.id === table.id)
                if (currentTable.length > 0) {
                    state.table = currentTable[0]
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

        addTable: (state, action) => void (state.data = [...state.data, action.payload]),

        addMenuOfTable: (state, action) => {
            const { id, food } = action.payload //id = id table, food = food is list food in table 
            state.data = state.data.map((e) => e.id === id ? { ...e, menu: food } : e)
        },

        removeMenuOfTable: (state, action) => { //id = id table, food = food has removed in table 
            const { id, food } = action.payload
            console.log(id, food)

            state.data = state.data.map(item => item.id === id ? { ...item, menu: item.menu.filter((e: any) => e.id !== food.id) } : item)
        }

    },
})
export const { table, payBill, addTable, addMenuOfTable, removeMenuOfTable } = dashboard.actions

export default dashboard.reducer