import Desk from '../components/Desk/Desk'

const MAIN_PATH: string = '/'
const DESK_PATH: string = '/:id'

export const routes = [
  {
    path: MAIN_PATH,
    component: Desk,
  },

  // {
  //   path: DESK_PATH
  //   component
  // }
]
