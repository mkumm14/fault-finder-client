import { apiSlice } from "./api-slice";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    username:string;
}



const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUser: builder.query<User, void>({
            query: () => '/auth/user/',
            providesTags: ['User'],
        }),
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: '/auth/login/',
                method: 'POST',
                body: { username, password },
            }),
            invalidatesTags: ['User', 'Projects'],

        }),
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
                body: { first_name, last_name, email, username,password1, password2 },
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout/',
                body:{},
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

