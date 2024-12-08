import { configureStore } from '@reduxjs/toolkit'
import clienteReducer from './features/clients'
import filterReducer from './features/globalFilter'

export const store = configureStore({
    reducer: {
        clients: clienteReducer,
        globalFilter: filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch