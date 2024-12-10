import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from './globalFilter'

export interface Client extends Item {
    id: string
    name: string
    age: number
    email: string
}

export interface ClientState {
    clients: Client[]
}

const initialState: ClientState = {
    clients: []
}

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        addClient: (state, action) => {
            const newClient: Client = {
                id: Date.now().toString(),
                name: action.payload.name,
                age: action.payload.age,
                email: action.payload.email
            }
            state.clients.push(newClient)
        },
        deleteClient: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.clients = state.clients.filter(item => item.id !== id);
        }
    }
})


export const { addClient, deleteClient } = clientSlice.actions

export default clientSlice.reducer