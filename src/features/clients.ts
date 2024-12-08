import { createSlice } from "@reduxjs/toolkit";
import { Item } from "./globalFilter";
//import type { PayloadAction } from "@reduxjs/toolkit";


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
        }
    }
})


export const { addClient } = clientSlice.actions

export default clientSlice.reducer