import React from 'react'
import './ColumnItem.styles.css'
import { ColumnItemInterface } from './ColumnItem.interfece'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { addTaskItem, removeColumnItem } from '../../store/slices/columnsSlice'
import { TaskType } from '../../types/TaskType'

type Input = {
  inputName: string,
}

const ColumnItem = ({ currentColumn }: ColumnItemInterface) => {
  const columns = useAppSelector((state) => state.columns.values)
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<Input>()

  const formSubmitHandler: SubmitHandler<Input> = (data) => {
    const currentColumnIndex = columns.indexOf(currentColumn)
    dispatch(
      addTaskItem({
        index: currentColumnIndex,
        item: { id: nanoid(), name: data.inputName },
      })
    )
    reset({
      inputName: '',
    })
  }

  const removeColumnClickHandler = () => {
    dispatch(removeColumnItem(currentColumn.id))
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {}

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {}

  function dragStartHandler(
    event: React.DragEvent<HTMLDivElement>,
    task: TaskType
  ) {}

  function dragDropHandler(e: React.DragEvent<HTMLDivElement>, task: TaskType) {
    e.preventDefault()
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
        {currentColumn.items.map((task) => (
          <div
            key={task.id}
            className={'column-item__task-item '}
            onDragOver={(event) => dragOverHandler(event)}
            onDragLeave={(event) => dragLeaveHandler(event)}
            onDragStart={(event) => dragStartHandler(event, task)}
            onDragEnd={(event) => dragEndHandler(event)}
            onDrop={(event) => dragDropHandler(event, task)}
            draggable={true}
          >
            {task.name}
          </div>
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
