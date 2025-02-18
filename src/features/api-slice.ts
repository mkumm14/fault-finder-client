/**
 * @file api-slice.ts
 * @description This file contains the configuration for the Redux Toolkit Query API slice, including
 * a base query with re-authentication logic using a mutex to handle concurrent requests.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setAuth, logout } from '@/features/auth-slice'
import { Mutex } from 'async-mutex';

/**
 * Mutex instance to ensure that only one re-authentication request is processed at a time.
 */
const mutex = new Mutex();

/**
 * Base query function for making API requests with Redux Toolkit Query.
 * Configured to include credentials and use the backend URL from environment variables.
 */
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://api.fault-finder.me',
    credentials: 'include',
});

/**
 * Base query function with re-authentication logic.
 * If a 401 error is encountered, it attempts to refresh the authentication token.
 * If the token refresh is successful, it retries the original request.
 * If the token refresh fails, it dispatches a logout action.
 * 
 * @param args - The arguments for the fetch request.
 * @param api - The Redux Toolkit Query API object.
 * @param extraOptions - Additional options for the fetch request.
 * @returns The result of the fetch request, potentially after re-authentication.
 */
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    /**
     * Type guard to check if an error object contains an authentication error detail.
     * 
     * @param error - The error object to check.
     * @returns True if the error object contains an authentication error detail, false otherwise.
     */
    const isAuthError = (error: any): error is { detail: string } => {
        return error && typeof error.detail === 'string';
    };

    if (result.error && result.error.status === 401 &&
        isAuthError(result.error.data)  &&
        result.error.data.detail === "Authentication credentials were not provided.") {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'auth/token/refresh/',
                        method: 'POST',
                        body: {},
                        credentials: 'include'
                    },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    api.dispatch(setAuth());

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    } else {
        api.dispatch(setAuth());
    }
    return result;
};

/**
 * The API slice created using Redux Toolkit Query.
 * Configured with the base query function that includes re-authentication logic.
 * 
 * @property {string} reducerPath - The key in the Redux store where the API state will be stored.
 * @property {BaseQueryFn} baseQuery - The base query function with re-authentication logic.
 * @property {Function} endpoints - A function to define the endpoints for the API.
 * @property {Array<string>} tagTypes - An array of tag types used for cache invalidation.
 */
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['User', 'Projects','Project']
});



