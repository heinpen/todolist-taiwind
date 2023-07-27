import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import {
  PriorityMapTypes,
  SortFunctionsTypes,
  TaskState,
} from '../../types/types';

export interface ListState {
  sortedList: TaskState[];
  originalList: TaskState[];
  sortSettings: {
    isSorted: boolean;
    direction: {
      [key: string]: string;
    };
  };
}

type AddTaskAction = Pick<TaskState, 'name' | 'priority' | 'id'>;

type UpdateCheckAction = Pick<TaskState, 'id' | 'isDone'>;

const todolist = localStorage.getItem('list');

const initialState: ListState = {
  sortedList: todolist ? JSON.parse(todolist) : [],
  originalList: todolist ? JSON.parse(todolist) : [],
  sortSettings: {
    isSorted: false,
    direction: {
      priority: 'asc',
      status: 'asc',
    },
  },
};

export const todoSLice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddTaskAction>) => {
      const { id, name, priority } = action.payload;

      const newTask = {
        id,
        name,
        isDone: false,
        priority,
      };

      state.originalList.push(newTask);

      if (state.sortSettings.isSorted) {
        // if list is sorted, add to sortedList
        state.sortedList.push(newTask);
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const filterCheck = (item: TaskState) => item.id !== action.payload;
      state.originalList = state.originalList.filter(filterCheck);
      if (state.sortSettings.isSorted) {
        state.sortedList = state.sortedList.filter(filterCheck);
      }
    },

    sortByDrag: (state, action: PayloadAction<DropResult>) => {
      // todo improve type
      const { destination, draggableId } = action.payload;
      const withoutItem = state.sortedList.filter(
        (item: TaskState) => item.id !== draggableId,
      );
      const draggedItem = state.sortedList.find(
        (item: TaskState) => item.id === draggableId,
      );
      if (!draggedItem || !destination) return;
      state.sortedList = [
        ...withoutItem.slice(0, destination.index),
        draggedItem,
        ...withoutItem.slice(destination.index),
      ];
      state.sortSettings.isSorted = true;
    },

    updateCheck: (state, action: PayloadAction<UpdateCheckAction>) => {
      const { id, isDone } = action.payload;
      const newListCb = (item: TaskState) => {
        if (item.id === id) {
          return { ...item, isDone };
        }
        return item;
      };
      state.originalList = state.originalList.map(newListCb);

      if (state.sortSettings.isSorted) {
        state.sortedList = state.sortedList.map(newListCb);
      }
    },

    update: (state, action: PayloadAction<AddTaskAction>) => {
      const { id, name, priority } = action.payload;
      console.log('asdf', 'newTask');

      const newListCb = (item: TaskState) => {
        if (item.id === id) {
          return { ...item, name, priority };
        }
        return item;
      };
      state.originalList = state.originalList.map(newListCb);

      if (state.sortSettings.isSorted) {
        state.sortedList = state.sortedList.map(newListCb);
      }
    },

    sort: (state, action: PayloadAction<string>) => {
      const sortType = action.payload;

      const { originalList, sortSettings } = state;
      const direction = sortSettings.direction[sortType];
      console.log(direction);

      state.sortedList = [...originalList]; // reset sortedList to originalList
      const priorityMap: PriorityMapTypes = {
        high: 3,
        normal: 2,
        low: 1,
      };

      const sortFunctions: SortFunctionsTypes = {
        status: (a: TaskState) =>
          direction === 'asc' ? (a.isDone ? 1 : -1) : a.isDone ? -1 : 1,
        priority: (a: TaskState, b: TaskState) =>
          direction === 'asc'
            ? priorityMap[a.priority] - priorityMap[b.priority]
            : priorityMap[b.priority] - priorityMap[a.priority],
      };

      state.sortedList.sort(sortFunctions[sortType]);
      console.log(state.sortedList);

      sortSettings.direction[sortType] = direction === 'asc' ? 'desc' : 'asc';
      state.sortSettings.isSorted = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const todoSLiceActions = todoSLice.actions;

export default todoSLice.reducer;
