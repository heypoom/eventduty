import {Agenda, Period} from '../types/Agenda'

type Item = Agenda | Period

export function getItemIndex(slot: number, items: Item[]) {
  const index = items.findIndex(
    item => slot >= item.slot && (item.slotEnd ? slot <= item.slotEnd : true),
  )

  if (index < 0) return null

  return index
}

export function getItem(slot: number, items: Item[]) {
  const index = getItemIndex(slot, items)
  if (index === null) return null

  if (items[index]) return items[index]
}

export const getPeriod = getItem
export const getAgenda = getItem
export const getAgendaIndex = getItemIndex
