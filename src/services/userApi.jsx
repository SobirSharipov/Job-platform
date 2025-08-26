import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserApi = createApi({
    reducerPath: "apiUser",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "data"
        }),
        addLogin: builder.query({
            query: () => "Users"
        }),
        getProfile: builder.query({
            query: () => "Profile"
        }),
        AddUser: builder.mutation({
            query: (newUser) => ({
                url: "data",
                method: "POST",
                body: newUser
            })
        }),
        AddProfile: builder.mutation({
            query: (newUser) => ({
                url: "Profile",
                method: "POST",
                body: newUser
            })
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `data/${id}`,
                method: "PATCH",
                body: updatedData
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
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        deleteInfo: builder.mutation({
            query: (id) => ({
                url: `data/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useUpdateUserMutation, useGetProfileQuery, useAddProfileMutation, useDeleteInfoMutation, useGetUserByIdQuery, useGetUserQuery, useRegistrAddMutation, useLoginUserMutation, useAddLoginQuery, useAddUserMutation } = UserApi