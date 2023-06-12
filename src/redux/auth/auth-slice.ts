import { createSlice } from '@reduxjs/toolkit';

interface authState {
    isLogin: boolean;
    user: {
        username: string;
        password: string;
    };
}

const initialState: authState = {
    isLogin: false,
    user: {
        username: '',
        password: '',
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = {
                username: '',
                password: '',
            };
        }
    },
});

export const { login, logout } = authSlice.actions;

// selectors
export const selectIsLogin = (state: any) => state.auth.isLogin;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
