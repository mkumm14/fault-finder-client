/**
 * Configures and creates the Redux store for the application.
 * 
 * The store is configured with the following reducers:
 * - `apiSlice.reducer`: Handles API-related state management.
 * - `authReducer`: Manages authentication state.
 * 
 * Middleware:
 * - The default middleware is extended with `apiSlice.middleware`.
 * 
 * DevTools:
 * - Redux DevTools are enabled for easier state debugging.
 * 
 * @module store
 */

 /**
    * Type for the dispatch function of the Redux store.
    * 
    * @typedef {typeof store.dispatch} AppDispatch
    */

 /**
    * Type for the root state of the Redux store.
    * 
    * @typedef {ReturnType<typeof store.getState>} RootState
    */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth-slice'
import { apiSlice } from './features/api-slice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



