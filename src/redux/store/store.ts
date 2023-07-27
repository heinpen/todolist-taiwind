import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/auth-slice';
import { todoSLice } from '../todo/todo-slice';

export const store = configureStore({
  reducer: {
    todoList: todoSLice.reducer,
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the redux itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
