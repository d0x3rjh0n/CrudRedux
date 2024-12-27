import { Client } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
  clients: Client[];
  count: number;
  pageSize: number;
  currentPage: number;
}

const initialState: TypeState = {
  clients: [],
  count: 0,
  pageSize: 10,
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: "paginationClients",
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
      state.count = action.payload.length;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetPage(state) {
      state.currentPage = 1;
    },
  },
});

export const { setClients, setPage, resetPage } = paginationSlice.actions;
export default paginationSlice.reducer;
