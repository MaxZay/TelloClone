import React from 'react'
import './DeskItem.styles.css'
import { DeskItemInterface } from './DeskItem.interface'

const DeskItem = (props: DeskItemInterface) => {
  const closeDeskItemClickHandler = () => {
    const arrWithOutCurrent = props.deskState.filter(
      (item) => item.id !== props.currentItem.id
    )
    props.setDeskState(arrWithOutCurrent)
  }

  return (
    <div className={'desk-item'}>
      {props.currentItem.name}
      <button
        className={'fas fa-times desk-item__close'}
        onClick={closeDeskItemClickHandler}
      />
    </div>
  )
}

export default DeskItem
