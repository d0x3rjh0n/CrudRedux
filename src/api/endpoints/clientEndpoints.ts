import api from "../apiSlice";
import { Client } from "@/types";


const clientApi = api.injectEndpoints({
    endpoints: (build) => ({
        getClients: build.query<Client[], void>({
            query: () => ({ url: '/clients', method : 'GET'}),
            providesTags: ['Clients'],
        }),
        deleteClient: build.mutation<void, string>({
            query: (id) => ({ url: `/clients/${id}/`, method: 'Delete'}),
            invalidatesTags: ['Clients']
        }),
        addClient: build.mutation<void, Client>({
            query: (newClient) => ({
                url: '/clients',
                method: 'POST',
                data: newClient
            }),
            invalidatesTags: ['Clients']
        }),
        getClient: build.query<Client, string>({
            query: (id) => ({
                url: `/clients/${id}/`,
                method: 'GET',
            }),
        }),
        updateClient: build.mutation<void, [Client, string | undefined]>({
            query: ([newClient, id]) => ({
                url: `/clients/${id}/`,
                method: 'PUT',
                data: newClient
            }),
            invalidatesTags: ['Clients'],    
        }),
        
        
    }),
    overrideExisting: false
})


export const { useGetClientsQuery, useGetClientQuery , useDeleteClientMutation, useAddClientMutation, useUpdateClientMutation } = clientApi

