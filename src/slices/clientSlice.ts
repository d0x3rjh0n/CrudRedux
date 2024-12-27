import { Client } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
  arrayClients: Client[];
}

const initialState: Props = {
  arrayClients: [],
};

const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {
    addClient(state, action: PayloadAction<Client>) {
      state.arrayClients.push(action.payload);
    },
    editClient(state, action: PayloadAction<Client>) {
      state.arrayClients = state.arrayClients.map((client) =>
        client.id === action.payload.id ? action.payload : client
      );
    },
    deleteClient(state, action: PayloadAction<string>) {
      state.arrayClients = state.arrayClients.filter(
        (client) => client.id != action.payload
      );
    },
    loadStorageClient(state, action: PayloadAction<Client[]>) {
      state.arrayClients = action.payload;
    },
  },
});

export const { addClient, editClient, deleteClient, loadStorageClient } =
  clientSlice.actions;
export default clientSlice.reducer;
