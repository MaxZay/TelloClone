import React, { useState } from 'react'
import './CreateDeskItem.styles.css'
import { nanoid } from 'nanoid'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { addItem } from '../../store/slices/deskItemsSlice'

type Input = {
  nameInput: string,
}

const CreateDeskItem = React.memo(() => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Input>()
  const deskItem = useAppSelector((state) => state.deskItems.values)
  const dispatch = useAppDispatch()
  const [clickState, setClickState] = useState(false)
  const newBoardClickHandler = () => {
    if (!clickState) {
      setClickState((clickState) => !clickState)
    }
  }

  const newItemFormSubmit: SubmitHandler<Input> = (data) => {
    const itemWithSameName = deskItem.find((item) => {
      return item.name === data.nameInput
    })

    if (!itemWithSameName) {
      dispatch(addItem([...deskItem, { id: nanoid(), name: data.nameInput }]))
      setClickState((clickState) => !clickState)
    } else {
      setError('nameInput', {
        message: 'Такое имя уже используется',
      })
    }
  }

  const newItemForm = (
    <form
      onSubmit={handleSubmit(newItemFormSubmit)}
      className={'create-desk-item__form'}
    >
      <input
        className={'form__input'}
        {...register('nameInput', {
          required: 'Это поле не может быть пустым',
        })}
      />

      <span
        className={
          errors.nameInput ? 'desk-error' : 'desk-error desk-error-hidden'
        }
      >
        {errors.nameInput?.message}
      </span>
      <button className={'form__button'}>Create</button>
    </form>
  )

  const closeButtonClickHandler = () => {
    setClickState((clickState) => !clickState)
  }

  return (
    <div
      className={
        !clickState
          ? 'create-desk-item'
          : 'create-desk-item create-desk-item-clicked'
      }
      onClick={newBoardClickHandler}
    >
      {!clickState ? (
        <h2 className={'create-desk-item__text'}>New board</h2>
      ) : (
        newItemForm
      )}
      {clickState && (
        <button
          className={'fas fa-times create-desk-item__close'}
          onClick={closeButtonClickHandler}
        />
      )}
    </div>
  )
})

export default CreateDeskItem
