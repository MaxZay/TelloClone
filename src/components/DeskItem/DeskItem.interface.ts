import { DeskItemType } from '../../types/DeskType'

export interface DeskItemInterface {
  currentItem: DeskItemType;
  freezeFlag?: boolean;
}
