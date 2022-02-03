import { DeskItemType } from '../../types/DeskType'

export interface CreateDeskItemInterface {
  deskState: DeskItemType[]
  setDeskState: (deskState: DeskItemType[]) => void
}
