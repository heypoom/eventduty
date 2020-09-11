export interface Duty {
  id: number
  name: string
  color?: string
  slot: number
  slotEnd?: number
  assignee?: string
  isDone?: boolean
  upcoming?: boolean
}
