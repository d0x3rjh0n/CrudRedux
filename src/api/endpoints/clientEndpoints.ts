import api from "../apiSlice";
import { Client } from "@/types";

const clientApi = api.injectEndpoints({
    endpoints: (build) => ({
        getClients: build.query<Client[], void>({
            query: () => ({ url: '/clients', method : 'GET'})
        }),
        updateClient: build.mutation({
            query: ({ id, data }) => ({ url: `/clients/${id}`, method: 'PUT', data }),
        }),
    }),
    overrideExisting: false
})


export const { useGetClientsQuery, useUpdateClientMutation } = clientApi

