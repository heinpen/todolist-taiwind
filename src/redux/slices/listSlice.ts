import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ListItemState = {
    id: number;
    name: string;
    description: string;
    isChecked: boolean;
    priority: number;
}

export interface ListState {
    list: ListItemState[]
}

const todolist = localStorage.getItem("todolist");

const initialState: ListState = {
    list: todolist ? JSON.parse(todolist) : []
}

export const counterSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ListItemState>) => {
            const {id, name, description, isChecked, priority} = action.payload;

            state.list.push({
                id: state.list.length,
                name: "New Task",
                description: "New Task Description",
                isChecked: false,
                priority: 0
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((item) => item.id !== action.payload)
        },

        update: (state, action: PayloadAction<ListItemState>) => {
            const {id, name, description, isChecked, priority} = action.payload;
            state.list = state.list.map((item) => {
                if (item.id === id) {
                    return {...item, name, description, isChecked, priority}
                }
                return item;
            })
        },

        sort: (state) => {
            state.list.sort((a, b) => {
                if (a.priority > b.priority) {
                    return -1;
                }
                if (a.priority < b.priority) {
                    return 1;
                }
                return 0;
            })
        }

    },
})

// Action creators are generated for each case reducer function
export const {add, update, remove} = counterSlice.actions

export default counterSlice.reducer