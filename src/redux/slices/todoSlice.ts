import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PriorityMapTypes, SortFunctionsTypes, TaskState } from "../../types/types";


export interface ListState {
    sortedList: TaskState[];
    originalList: TaskState[];
    sortSettings: {
        isSorted: boolean;
        direction: {
            [key: string]: string;
        }
    }
}
// export interface ListState {
//     sortedList: TaskState[];
//     originalList: TaskState[];
//     sortSettings: {
//         isSorted: false,
//         [key: string]: string 
//     }
// }

type AddTaskAction = Pick<TaskState, "name" | "priority">;

type UpdateCheckAction = Pick<TaskState, "id" | "isDone">;


const todolist = localStorage.getItem("list");
console.log(todolist);
const initialState: ListState = {
    sortedList: todolist ? JSON.parse(todolist) : [],
    originalList: todolist ? JSON.parse(todolist) : [],
    sortSettings: {
        isSorted: false,
        direction: {
            priority: "asc",
            status: "asc"
        }
    }
}

export const todoSLice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AddTaskAction>) => {
            const {name, priority} = action.payload;

            state.originalList.push({
                id: state.originalList.length,
                name,
                isDone: false,
                priority,
            })

            if (state.sortSettings.isSorted) { // if list is sorted, add to sortedList
                state.sortedList.push({
                    id: state.sortedList.length,
                    name,
                    isDone: false,
                    priority,
                })
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.originalList = state.originalList.filter((item) => item.id !== action.payload)
        },

        updateCheck: (state, action: PayloadAction<UpdateCheckAction>) => {
            const {id, isDone} = action.payload;
            state.originalList = state.originalList.map((item) => {
                if (item.id === id) {
                    return {...item, isDone}
                }
                return item;
            })

            if (state.sortSettings.isSorted) {
                state.sortedList = state.sortedList.map((item) => {
                    if (item.id === id) {
                        return {...item, isDone}
                    }
                    return item;
                })
            }
        },

        update: (state, action: PayloadAction<TaskState>) => {
            const {id, name, isDone, priority} = action.payload;
            state.originalList = state.originalList.map((item) => {
                if (item.id === id) {
                    return {...item, name, isDone, priority}
                }
                return item;
            })
        },

        sort: (state, action: PayloadAction<string>) => {

            const sortType = action.payload;

            const {originalList, sortSettings} = state;
            const direction = sortSettings.direction[sortType];
    
            state.sortedList = [...originalList]; // reset sortedList to originalList
            const priorityMap: PriorityMapTypes = {
                High: 3,
                Normal: 2,
                Low: 1
            };
        
            const sortFunctions: SortFunctionsTypes = {
                status: (a: TaskState) =>
                direction === 'asc' ? (a.isDone ? 1 : -1) : (a.isDone ? -1 : 1),
                priority: (a: TaskState, b: TaskState) =>
                direction === 'asc'
                    ? priorityMap[a.priority] - priorityMap[b.priority]
                    : priorityMap[b.priority] - priorityMap[a.priority],
              };
            
            state.sortedList.sort(sortFunctions[sortType]);

            sortSettings.direction[`${sortType}`] = direction === 'asc' ? 'desc' : 'asc';
            state.sortSettings.isSorted = true;
        }

    },
})




// Action creators are generated for each case reducer function
export const {add, update, remove, updateCheck, sort} = todoSLice.actions

export default todoSLice.reducer