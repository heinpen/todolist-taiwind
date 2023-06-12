import { configureStore } from '@reduxjs/toolkit'
import { todoSLice } from "../slices/todoSlice";
import { authSlice } from "../auth/auth-slice";

export const store = configureStore({
    reducer: {
        todoList: todoSLice.reducer,
        auth: authSlice.reducer,

    },
})

// Infer the `RootState` and `AppDispatch` types from the redux itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
