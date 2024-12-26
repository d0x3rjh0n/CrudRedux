import { Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
    projects : Project[],
    count: number
    pageSize: number
    currentPage: number
}

const initialState : TypeState = {
    projects : [],
    count: 0,
    pageSize: 10,
    currentPage: 1
}

const paginationSlice = createSlice({
    name: 'paginationProjects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>){
            state.projects = action.payload
            state.count = action.payload.length
        },
        setPage(state, action: PayloadAction<number>){
            state.currentPage = action.payload
        },
        resetPage(state){
            state.currentPage = 1
        }
    }
})


export const { setProjects, setPage, resetPage } = paginationSlice.actions
export default paginationSlice.reducer