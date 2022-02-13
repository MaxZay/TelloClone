import { configureStore } from '@reduxjs/toolkit'
import deskItemsSlice from './slices/deskItemsSlice'
import columnsSlice from './slices/columnsSlice'
import tasksSlice from './slices/tasksSlice'

export const store = configureStore({
  reducer: {
    deskItems: deskItemsSlice,
    columns: columnsSlice,
    tasks: tasksSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
