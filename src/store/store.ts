import { configureStore } from '@reduxjs/toolkit'
import deskItemsSlice from './slices/deskItemsSlice'
import columnsSlice from './slices/columnsSlice'

export const store = configureStore({
  reducer: {
    deskItems: deskItemsSlice,
    columns: columnsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
