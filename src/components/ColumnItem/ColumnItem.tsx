import React from 'react'
import './ColumnItem.styles.css'
import { ColumnItemInterface } from './ColumnItem.interfece'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import TaskItem from '../TaskItem/TaskItem'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addTask, removeAllTasksWithId } from '../../store/slices/tasksSlice'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { removeColumnItem } from '../../store/slices/columnsSlice'

type Input = {
  inputName: string,
}

const ColumnItem = ({ currentColumn }: ColumnItemInterface) => {
  const tasks = useAppSelector((state) => state.tasks.values)
  const filteredTasks = tasks.filter(
    (task) => task.columnId === currentColumn.id
  )
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<Input>()

  const formSubmitHandler: SubmitHandler<Input> = (data) => {
    dispatch(
      addTask([
        ...tasks,
        { id: nanoid(), name: data.inputName, columnId: currentColumn.id },
      ])
    )
    reset({
      inputName: '',
    })
  }

  const removeColumnClickHandler = () => {
    dispatch(removeColumnItem(currentColumn.id))
    dispatch(removeAllTasksWithId(currentColumn.deskItemId))
  }

  return (
    <div className={'column-item'}>
      <div className={'column-item__title'}>{currentColumn.name}</div>
      <div className={'column-item__tasks'}>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className={'column-item__from'}
        >
          <input
            className={'column-item__from-input'}
            {...register('inputName', {
              required: 'Это поле не модет быть пустым',
            })}
          />
        </form>
        {filteredTasks.map((task) => (
          <TaskItem currentTask={task} key={task.id} />
        ))}
      </div>
      <button
        className={'column-item__close'}
        onClick={removeColumnClickHandler}
      >
        <FontAwesomeIcon icon={faXmark} className={'column-item__close-icon'} />
      </button>
    </div>
  )
}

export default ColumnItem
