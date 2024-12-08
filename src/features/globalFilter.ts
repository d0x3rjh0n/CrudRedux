import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Item {
    id: string;
    [ key: string ]: string | number | boolean | object | undefined 
}

export interface GlobalFilterState {
    ArrayFilter: Item[];
}

const initialState: GlobalFilterState = {
    ArrayFilter: [],
}

export const globalFilterSlice = createSlice({
    name: 'globalFilter',
    initialState,
    reducers: {
        aplyFilter: (state, action: PayloadAction<{ ArrayToFilter: Item[], globalFilter: string }>) => {
            const { ArrayToFilter, globalFilter } = action.payload;

            if (globalFilter === '') {
                state.ArrayFilter = ArrayToFilter;
            } else {
                state.ArrayFilter = ArrayToFilter.filter(item =>
                    item.id.toLowerCase().includes(globalFilter.toLowerCase())
                );
            }
        }
    }
});


export const { aplyFilter } = globalFilterSlice.actions;
export default globalFilterSlice.reducer;
