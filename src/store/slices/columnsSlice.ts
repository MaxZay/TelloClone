import { ColumnType } from '../../types/ColumnType'
import { createSlice } from '@reduxjs/toolkit'

interface ColumnsInitialState {
  values: ColumnType[];
}

const initialState: ColumnsInitialState = {
  values: [],
}

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumnItem: (state, action) => {
      state.values = action.payload
    },
    removeColumnItem: (state, action) => {
      state.values = state.values.filter((item) => item.id !== action.payload)
    },
    removeAllColumnsItemWithId: (state, action) => {
      state.values = state.values.filter(
        (item) => item.deskItemId !== action.payload
      )
    },
  },
})

export const { addColumnItem, removeColumnItem, removeAllColumnsItemWithId } =
  columnsSlice.actions

export default columnsSlice.reducer
