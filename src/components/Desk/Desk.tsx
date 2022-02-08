import React, { useState } from 'react'
import DeskItem from '../DeskItem/DeskItem'
import CreateDeskItem from '../CreateDeskItem/CreateDeskItem'
import './Desk.styles.css'
import { DeskItemType } from '../../types/DeskType'

const Desk = () => {
  const [deskState, setDeskState] = useState<DeskItemType[]>([])
  return (
    <div className={'desk'}>
      {deskState.map((item) => (
        <DeskItem
          currentItem={item}
          key={item.id}
          deskState={deskState}
          setDeskState={setDeskState}
        />
      ))}
      <CreateDeskItem deskState={deskState} setDeskState={setDeskState} />
    </div>
  )
}

export default Desk
