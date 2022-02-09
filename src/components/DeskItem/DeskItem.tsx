import React from 'react'
import './DeskItem.styles.css'
import { DeskItemInterface } from './DeskItem.interface'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../store/hooks/hooks'
import { removeItem } from '../../store/slices/deskItemsSlice'

const DeskItem = (props: DeskItemInterface) => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const closeDeskItemClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    dispatch(removeItem(props.currentItem.id))
  }

  const deskItemOnClick = () => {
    history.push(`/${props.currentItem.id}`)
  }

  return (
    <div
      className={'desk-item'}
      onClick={!props.freezeFlag ? deskItemOnClick : undefined}
    >
      {props.currentItem.name}
      {!props.freezeFlag && (
        <button
          className={'fas fa-times desk-item__close'}
          onClick={closeDeskItemClickHandler}
        />
      )}
    </div>
  )
}

export default DeskItem
