/**
 * @file auth-api-slice.ts
 * @description This file defines the authentication API slice using Redux Toolkit's createApi.
 * It includes endpoints for user retrieval, login, registration, and logout.
 */

import { apiSlice } from "./api-slice";

/**
 * @interface User
 * @description Represents a user object with basic user information.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} username - The username of the user.
 */
interface User {
    first_name: string;
    last_name: string;
    email: string;
    username:string;
}



const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        /**
         * @function retrieveUser
         * @description Retrieves the current authenticated user's information.
         * @returns {User} The user object containing user details.
         */
        retrieveUser: builder.query<User, void>({
            query: () => '/auth/user/',
            providesTags: ['User'],
        }),
        /**
         * @function login
         * @description Authenticates a user with the provided username and password.
         * @param {Object} credentials - The login credentials.
         * @param {string} credentials.username - The username of the user.
         * @param {string} credentials.password - The password of the user.
         * @returns {void}
         */
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: '/auth/login/',
                method: 'POST',
                body: { username, password },
            }),
            invalidatesTags: ['User', 'Projects'],
        }),
        /**
         * @function register
         * @description Registers a new user with the provided information.
         * @param {Object} userDetails - The registration details.
         * @param {string} userDetails.first_name - The first name of the user.
         * @param {string} userDetails.last_name - The last name of the user.
         * @param {string} userDetails.email - The email address of the user.
         * @param {string} userDetails.username - The username of the user.
         * @param {string} userDetails.password1 - The first password input.
         * @param {string} userDetails.password2 - The second password input for confirmation.
         * @returns {void}
         */
        register: builder.mutation({
            query: ({
                        first_name,
                        last_name,
                        email,
                        username,
                        password1,
                        password2,
                    }) => ({
                url: '/auth/registration/',
                method: 'POST',
                body: { first_name, last_name, email, username, password1, password2 },
            }),
        }),
        /**
         * @function logout
         * @description Logs out the current authenticated user.
         * @returns {void}
         */
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout/',
                body: {},
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useRetrieveUserQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApiSlice;



