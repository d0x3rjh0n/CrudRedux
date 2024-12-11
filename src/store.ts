import { configureStore } from '@reduxjs/toolkit'
import clienteReducer from './features/clients'
import api from './api/apiSlice'

export const store = configureStore({
    reducer: {
        clients: clienteReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch