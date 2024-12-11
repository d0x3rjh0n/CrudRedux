import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from '../types'
const initialState : ModalType = {
    value: false
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        openModal(state){ state.value = true},
        closeModal(state){ state.value = false}
    }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer