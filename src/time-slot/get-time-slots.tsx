import {fromTime, toTime} from '../time-utils'
import {MAX_SLOTS, SLOT_INTERVAL} from '../constants'

export function getTimeSlots(startsFrom: string, endsAt: string): string[] {
  const [startHour, startMinute] = toTime(startsFrom)
  const [endHour, endMinute] = toTime(endsAt)

  const slots = ['__']
  let hour = startHour
  let minute = startMinute

  for (let i = 0; i <= MAX_SLOTS; i++) {
    const timeSlot = fromTime([hour, minute])
    slots.push(timeSlot)

    minute += SLOT_INTERVAL

    if (minute >= 60) {
      minute = 0
      hour++
    }

    if (hour !== endHour && hour >= 23) {
      if (hour >= 24) hour = 0

      continue
    }

    if (hour >= endHour && minute >= endMinute) {
      return slots
    }
  }

  return slots
}
