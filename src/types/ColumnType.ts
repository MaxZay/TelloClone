import { TaskType } from './TaskType'

export interface ColumnType {
  id: string
  deskItemId: string
  name: string
  items: TaskType[]
}