import {strptime} from '../time-utils'
import {DateTime} from 'luxon'
import {SLOT_INTERVAL} from '../constants'

export function getRemainingTime(timeSlot: string) {
  const slotStartingTime = strptime(timeSlot)
  const nextSlot = slotStartingTime.plus({minute: SLOT_INTERVAL})
  const currentTime = DateTime.local()

  return nextSlot.diff(currentTime).toFormat('mm:ss')
}
