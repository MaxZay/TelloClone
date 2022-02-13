import React from 'react'
import DeskItem from '../DeskItem/DeskItem'
import CreateDeskItem from '../CreateDeskItem/CreateDeskItem'
import './Desk.styles.css'
import { useAppSelector } from '../../store/hooks/hooks'

const Desk = () => {
  const deskItem = useAppSelector((state) => state.deskItems.values)
  return (
    <div className={'desk'}>
      {deskItem.map((item) => (
        <DeskItem currentItem={item} key={item.id} />
      ))}
      <CreateDeskItem />
    </div>
  )
}

export default Desk
