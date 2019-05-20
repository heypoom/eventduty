import {fromTime, toTime} from '../time-utils'
import {SLOT_INTERVAL} from '../constants'

export function getNearestSlot(time?: string) {
  if (!time) {
    const date = new Date()
    time = date.getHours() + ':' + date.getMinutes()
  }

  const [h, m] = toTime(time)
  const min = m - (m % SLOT_INTERVAL)

  return fromTime([h, min])
}
