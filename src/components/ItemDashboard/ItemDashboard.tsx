import React from 'react'
import './ItemDashboard.styles.css'
import { useParams } from 'react-router'
import DeskItem from '../DeskItem/DeskItem'
import { useAppSelector } from '../../store/hooks/hooks'

const ItemDashboard = () => {
  const params = useParams<{ id: string }>()
  const items = useAppSelector((state) => state.deskItems.values)
  const currentItem = items.find((item) => item.id === params.id)

  return (
    <div>
      {currentItem && <DeskItem currentItem={currentItem} freezeFlag={true} />}
    </div>
  )
}

export default ItemDashboard
