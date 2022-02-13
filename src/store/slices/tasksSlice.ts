import { TaskType } from '../../types/TaskType'
import { createSlice } from '@reduxjs/toolkit'

interface TaskInitialStateInterface {
  values: TaskType[];
}

const initialState: TaskInitialStateInterface = {
  values: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.values = action.payload
    },

    removeTask: (state, action) => {
      state.values = state.values.filter((task) => task.id !== action.payload)
    },

    removeAllTasksWithId: (state, action) => {
      state.values = state.values.filter(
        (task) => task.columnId !== action.payload
      )
    },
  },
})

export const { addTask, removeTask, removeAllTasksWithId } = taskSlice.actions

export default taskSlice.reducer
