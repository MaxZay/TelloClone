import { configureStore } from '@reduxjs/toolkit'
import deskItemsSlice from './slices/deskItemsSlice'

export const store = configureStore({
  reducer: {
    deskItems: deskItemsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
