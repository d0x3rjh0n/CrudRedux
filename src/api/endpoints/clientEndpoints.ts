import api from "../apiSlice";
import { Client } from "@/types";

const clientApi = api.injectEndpoints({
    endpoints: (build) => ({
        getClients: build.query<Client[], void>({
            query: () => ({ url: '/clients', method : 'GET'}),
            providesTags: ['Clients'],
        }),
        deleteClient: build.mutation<void, { id : number }>({
            query: ({ id }) => ({
                url: `/clients/${id}/`,
                method: 'Delete'
            }),
            invalidatesTags: ['Clients']
        }),
    }),
    overrideExisting: false
})


export const { useGetClientsQuery, useDeleteClientMutation } = clientApi

