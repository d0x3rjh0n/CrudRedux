import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice'
import clientsReducer from './slices/clientsSlice'
import paginationClientsReducer from './slices/paginationClientsSlice'
import paginationProjectReducer from './slices/paginationProjectSlice'
import clientReducer from './slices/clientSlice'
import projectReducer from './slices/projectsSlice'
import api from './api/apiSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        modal: modalReducer,
        clientsArray: clientsReducer,
        paginationClients: paginationClientsReducer,
        paginationProjects: paginationProjectReducer,
        clients: clientReducer,
        projects: projectReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch