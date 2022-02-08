import React, { useState } from 'react'
import './CreateDeskItem.styles.css'
import { CreateDeskItemInterface } from './CreateDeskItem.interface'
import { nanoid } from 'nanoid'
import { SubmitHandler, useForm } from 'react-hook-form'

type Input = {
  nameInput: string,
}

const CreateDeskItem = React.memo((props: CreateDeskItemInterface) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Input>()

  const [clickState, setClickState] = useState(false)

  const newBoardClickHandler = () => {
    if (!clickState) {
      setClickState((clickState) => !clickState)
    }
  }

  const newItemFormSubmit: SubmitHandler<Input> = (data) => {
    const itemWithSameName = props.deskState.find((item) => {
      return item.name === data.nameInput
    })

    if (!itemWithSameName) {
      props.setDeskState([
        ...props.deskState,
        { id: nanoid(), name: data.nameInput },
      ])
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
    <div className={'create-desk-item'} onClick={newBoardClickHandler}>
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
