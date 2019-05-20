import {strptime} from '../time-utils'
import {DateTime} from 'luxon'
import {SLOT_INTERVAL} from '../constants'

export function getRemainingTime(timeSlot: string, currentTime?: DateTime) {
  if (!currentTime) currentTime = DateTime.local()

  const slotStartingTime = strptime(timeSlot)
  const nextSlot = slotStartingTime.plus({minute: SLOT_INTERVAL})

  return nextSlot.diff(currentTime).toFormat('mm:ss')
}
