import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
    clientsArray : Client[]
}

const initialState : TypeState = {
    clientsArray: []
}

const ExistClient = (newClient: Client, array: Client[]) => {
    return array.some(clientArray => clientArray.id === newClient.id)
}

const clientsArraySlice = createSlice({
    name: 'clientsArray',
    initialState,
    reducers:{
        add(state, action: PayloadAction<Client>){
            if (ExistClient(action.payload, state.clientsArray)) {
                state.clientsArray = state.clientsArray.filter(clientArray => clientArray.id != action.payload.id)
            }else{
                state.clientsArray.push(action.payload)
            }
        },
        resetArray(state){ state.clientsArray = []},
        fillArray(state, action: PayloadAction<Client[]>){
            state.clientsArray = action.payload
        }
    }
})

export const { add, resetArray, fillArray} = clientsArraySlice.actions
export default clientsArraySlice.reducer