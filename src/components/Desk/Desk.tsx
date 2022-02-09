import React, { useState } from 'react'
import DeskItem from '../DeskItem/DeskItem'
import CreateDeskItem from '../CreateDeskItem/CreateDeskItem'
import './Desk.styles.css'
import { DeskItemType } from '../../types/DeskType'
import { useAppSelector } from '../../store/hooks/hooks'

const Desk = () => {
  const deskItem = useAppSelector((state) => state.deskItems.values)
  const [deskState, setDeskState] = useState<DeskItemType[]>([])
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
