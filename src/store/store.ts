import { configureStore } from '@reduxjs/toolkit'
import deskItemsSlice from './slices/deskItemsSlice'
import columnsSlice from './slices/columnsSlice'
import dragAndDropSlice from './slices/dragAndDropSlice'

export const store = configureStore({
  reducer: {
    deskItems: deskItemsSlice,
    columns: columnsSlice,
    dragAndDrop: dragAndDropSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
