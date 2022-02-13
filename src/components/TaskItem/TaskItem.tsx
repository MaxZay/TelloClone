import React from 'react'
import './TaskItem.styles.css'
import { TaskItemInterface } from './TaskItem.interface'

const TaskItem = ({ currentTask }: TaskItemInterface) => {
  return <div className={'task-item'}>{currentTask.name}</div>
}

export default TaskItem
