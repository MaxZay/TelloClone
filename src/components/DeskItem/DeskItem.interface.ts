import { DeskItemType } from '../../types/DeskType'

export interface DeskItemInterface {
  currentItem: DeskItemType
  deskState: DeskItemType[]
  setDeskState: (deskState: DeskItemType[]) => void
}