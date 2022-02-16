import { createSlice } from '@reduxjs/toolkit'
import { TaskType } from '../../types/TaskType'

interface DragAndDrop {
  takenTaskIndex?: number
  takenColumnIndex?: number
  task?: TaskType
}

interface DragAndDropInitialState {
  values: DragAndDrop
}

const initialState: DragAndDropInitialState = {
  values: {}
}

const dragAndDropSlice = createSlice({
  name: 'dragAndDrop',
  initialState,
  reducers: {
    updateDragAndDrop: (state, action) => {
      state.values = action.payload
    }
  }
})

export const { updateDragAndDrop} = dragAndDropSlice.actions

export default dragAndDropSlice.reducer