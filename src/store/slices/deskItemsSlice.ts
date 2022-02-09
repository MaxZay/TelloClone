import { DeskItemType } from '../../types/DeskType'
import { createSlice } from '@reduxjs/toolkit'

interface DeskItemInitialState {
  values: DeskItemType[];
}

const initialState: DeskItemInitialState = {
  values: [],
}

const deskItemSlice = createSlice({
  name: 'deskItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.values = action.payload
    },
    removeItem: (state, action) => {
      state.values = state.values.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addItem, removeItem } = deskItemSlice.actions

export default deskItemSlice.reducer
