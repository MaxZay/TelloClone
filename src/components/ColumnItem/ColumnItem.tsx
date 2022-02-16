import React from 'react'
import './ColumnItem.styles.css'
import { ColumnItemInterface } from './ColumnItem.interfece'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {
  addTaskItem,
  addTaskItemFromDrop,
  removeColumnItem,
  removeTaskItem,
} from '../../store/slices/columnsSlice'
import { TaskType } from '../../types/TaskType'
import { ColumnType } from '../../types/ColumnType'
import { updateDragAndDrop } from '../../store/slices/dragAndDropSlice'

type Input = {
  inputName: string,
}

const ColumnItem = React.memo(({ currentColumn }: ColumnItemInterface) => {
  const columns = useAppSelector((state) => state.columns.values)
  const dragAndDropState = useAppSelector((state) => state.dragAndDrop.values)
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
  ) {
    const takenTaskIndex = currentColumn.items.indexOf(task)
    const takenColumnIndex = columns.indexOf(currentColumn)
    dispatch(
      updateDragAndDrop({
        ...dragAndDropState,
        takenTaskIndex: takenTaskIndex,
        takenColumnIndex: takenColumnIndex,
        task: task,
      })
    )
  }

  function dragDropHandler(
    e: React.DragEvent<HTMLDivElement>,
    underColumn: ColumnType,
    task: TaskType
  ) {
    e.preventDefault()
    dispatch(
      removeTaskItem({
        indexTask: dragAndDropState.takenTaskIndex,
        indexCurrentColumn: dragAndDropState.takenColumnIndex,
      })
    )
    if (task.id === '') {
      const indexTaskItem = currentColumn.items.indexOf(task)
      const currentColumnIndex = columns.indexOf(currentColumn)
      dispatch(
        addTaskItemFromDrop({
          indexTask: indexTaskItem,
          indexCurrentColumn: currentColumnIndex,
          task: dragAndDropState.task,
        })
      )
    }
    // if (task) {
    //   const indexTaskItem = currentColumn.items.indexOf(task)
    //   const currentColumnIndex = columns.indexOf(currentColumn)
    //   dispatch(
    //     addTaskItemFromDrop({
    //       indexTask: indexTaskItem,
    //       indexCurrentColumn: currentColumnIndex,
    //       task: dragAndDropState.task,
    //     })
    //   )
    // } else {
    //   dispatch(
    //     addTaskItemFromDrop({
    //       indexTask: 0,
    //       indexCurrentColumn: dragAndDropState.takenColumnIndex,
    //       task: task,
    //     })
    //   )
    // }
  }

  return (
    <div
      className={'column-item'}
      draggable={true}
      onDrop={(event) =>
        dragDropHandler(event, currentColumn, { id: '', name: '' })
      }
      onDragOver={(event) => dragOverHandler(event)}
    >
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
            onDrop={(event) => dragDropHandler(event, currentColumn, task)}
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
})

export default ColumnItem
