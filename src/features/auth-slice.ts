/**
 * @file auth-slice.ts
 * @description This file contains the Redux slice for authentication state management.
 * It includes the initial state, reducers, and actions for handling authentication status and loading state.
 */

import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    /**
     * Indicates whether the user is authenticated.
     */
    isAuthenticated: boolean;

    /**
     * Indicates whether the initial loading process is ongoing.
     */
    isLoading: boolean;
}

const initialState = {
    isAuthenticated: false,
    isLoading: true,
} as AuthState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Sets the authentication status to true.
         * @param state - The current state of the authentication slice.
         */
        setAuth: state => {
            state.isAuthenticated = true;
        },

        /**
         * Sets the authentication status to false.
         * @param state - The current state of the authentication slice.
         */
        logout: state => {
            state.isAuthenticated = false;
        },

        /**
         * Sets the loading status to false, indicating that the initial loading process is complete.
         * @param state - The current state of the authentication slice.
         */
        finishInitialLoad: state => {
            state.isLoading = false;
        },
    },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;