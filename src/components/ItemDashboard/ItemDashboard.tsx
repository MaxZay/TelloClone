import React from 'react'
import './ItemDashboard.styles.css'
import { useHistory, useParams } from 'react-router'
import DeskItem from '../DeskItem/DeskItem'
import { useAppSelector } from '../../store/hooks/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import CreateNewColumn from '../CreateNewColumn/CreateNewColumn'
import ColumnItem from '../ColumnItem/ColumnItem'

const ItemDashboard = () => {
  const params = useParams<{ id: string }>()
  const items = useAppSelector((state) => state.deskItems.values)
  const currentItem = items.find((item) => item.id === params.id)
  const history = useHistory()
  const columns = useAppSelector((state) => state.columns.values).filter(
    (column) => column.deskItemId === params.id
  )

  const homeButtonClickHandler = () => {
    history.push('/')
  }

  return (
    <div className={'item-dashboard'}>
      <button
        className={'item-dashboard__home-button'}
        onClick={homeButtonClickHandler}
      >
        <FontAwesomeIcon icon={faHouse} className={'home-button__icon'} />
      </button>
      {currentItem && <DeskItem currentItem={currentItem} freezeFlag={true} />}
      <div className={'item-dashboard__columns'}>
        {columns.map((column) => (
          <ColumnItem currentColumn={column} key={column.id} />
        ))}
        <CreateNewColumn deskItemId={params.id} />
      </div>
    </div>
  )
}

export default ItemDashboard
