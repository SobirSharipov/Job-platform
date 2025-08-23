import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserApi = createApi({
    reducerPath: "apiUser",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "data"
        }),
        addLogin: builder.query({
            query: () => "User"
        }),
        AddUser: builder.mutation({
            query: (newUser) => ({
                url: "data",
                method: "POST",
                body: newUser
            })
        }),
        registrAdd: builder.mutation({
            query: (newUser) => ({
                url: "Users",
                method: "POST",
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: ({ lastName, password }) => ({
                url: `Users?lastName=${lastName}&password=${password}`,
                method: "GET"
            })
        }),
    })
})

export const { useGetUserQuery, useRegistrAddMutation, useLoginUserMutation, useAddLoginQuery,useAddUserMutation } = UserApi