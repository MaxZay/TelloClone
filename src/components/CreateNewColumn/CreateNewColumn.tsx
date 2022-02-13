import React, { useState } from 'react'
import './CreateNewColumn.styles.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { addColumnItem } from '../../store/slices/columnsSlice'
import { nanoid } from 'nanoid'
import { CreateNewColumnInterface } from './CreateNewColumn.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type Input = {
  nameInput: string,
}

const CreateNewColumn = ({ deskItemId }: CreateNewColumnInterface) => {
  const columns = useAppSelector((state) => state.columns.values)
  const dispatch = useAppDispatch()
  const [clickState, setClickState] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>()

  const createColumnClickHandler = () => {
    if (!clickState) setClickState(true)
  }

  const submitFormHandler: SubmitHandler<Input> = (data) => {
    dispatch(
      addColumnItem([
        ...columns,
        { id: nanoid(), deskItemId: deskItemId, name: data.nameInput },
      ])
    )
    reset({
      nameInput: '',
    })
    setClickState(false)
  }

  const closeFormClickHandler = () => {
    reset({
      nameInput: '',
    })
    setClickState(false)
  }

  const getFormItem = (
    <form
      onSubmit={handleSubmit(submitFormHandler)}
      className={'create-new-columns__form'}
    >
      <input
        className={'create-new-columns__form-input'}
        {...register('nameInput', {
          required: 'Это поле не может быть пустым',
        })}
      />
      <span className={'create-new-columns__form-errors'}>
        {errors.nameInput?.message}
      </span>
      <button className={'create-new-columns__form-submit'}>Create</button>
    </form>
  )

  return (
    <div
      className={
        !clickState
          ? 'create-new-columns'
          : 'create-new-columns__click create-new-columns'
      }
      onClick={createColumnClickHandler}
    >
      Create new column+
      {clickState && getFormItem}
      {clickState && (
        <button
          className={'create-new-column__form-close'}
          onClick={closeFormClickHandler}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className={'create-new-columns__close-icon'}
          />
        </button>
      )}
    </div>
  )
}

export default CreateNewColumn
