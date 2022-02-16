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
    addTaskItem: (state, action) => {
      state.values[action.payload.index].items.push(action.payload.item)
    },
    removeTaskItem: (state, action) => {
      // indexTask, indexCurrentColumn
      state.values[action.payload.indexCurrentColumn].items.splice(
        action.payload.indexType,
        1
      )
    },
    addTaskItemFromDrop: (state, action) => {
      //indexTask, indexCurrentColumn, task
      state.values[action.payload.indexCurrentColumn].items.splice(
        action.payload.indexTask + 1,
        0,
        action.payload.task
      )
    },
  },
})

export const {
  addColumnItem,
  removeColumnItem,
  removeAllColumnsItemWithId,
  addTaskItem,
  addTaskItemFromDrop,
  removeTaskItem,
} = columnsSlice.actions

export default columnsSlice.reducer
