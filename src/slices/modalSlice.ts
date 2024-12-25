import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from '../types'

const initialState : ModalType = {
    value: false
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        openModal(state){ 
            if (state.value === true) {
                state.value = false    
            }else{
                state.value = true    
            }
        }
    }
})

export const { openModal } = modalSlice.actions
export default modalSlice.reducer