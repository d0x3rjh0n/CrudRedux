import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice'
import clientsReducer from './slices/clientsSlice'
import api from './api/apiSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        modal: modalReducer,
        clientsArray: clientsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch