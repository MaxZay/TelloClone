import React, { useState } from 'react'
import './CreateDeskItem.styles.css'
import { CreateDeskItemInterface } from './CreateDeskItem.interface'

const CreateDeskItem = (props: CreateDeskItemInterface) => {
  const [clickState, setClickState] = useState(false)
  const [nameState, setNameState] = useState('')

  const newBoardClickHandler = () => {
    if (!clickState) {
      setClickState((clickState) => !clickState)
    }
  }

  const newItemFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    props.setDeskState([...props.deskState, { name: nameState }])
    setClickState((clickState) => !clickState)
  }

  console.log('create desk item render')

  const newItemForm = (
    <form onSubmit={newItemFormSubmit} className={'create-desk-item__form'}>
      <input
        className={'form__input'}
        value={nameState}
        onChange={(event) => setNameState(event.target.value)}
      />
      <button className={'form__button'}>Create</button>
    </form>
  )

  const closeButtonClickHandler = () => {
    setClickState((clickState) => !clickState)
    setNameState((nameState) => '')
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
}

export default CreateDeskItem
