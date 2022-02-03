import React from 'react'
import { DeskItemType } from '../../types/DeskType'

const DeskItem = (props: DeskItemType) => {
  return <div>{props.name}</div>
}

export default DeskItem
