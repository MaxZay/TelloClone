import Desk from '../components/Desk/Desk'
import ItemDashboard from '../components/ItemDashboard/ItemDashboard'

const MAIN_PATH: string = '/'
const DESK_PATH: string = '/:id'

export const routes = [
  {
    path: MAIN_PATH,
    component: Desk,
  },
  {
    path: DESK_PATH,
    component: ItemDashboard,
  },
]
