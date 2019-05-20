import {fromTime, toTime} from '../time-utils'

import {SLOT_INTERVAL} from '../constants'

export function getNextSlot(timeSlot: string) {
  const [h, m] = toTime(timeSlot)

  if (m + SLOT_INTERVAL >= 60) {
    return fromTime([h + 1, 0])
  }

  const min = m - (m % SLOT_INTERVAL)
  const hour = h == 24 ? 0 : h

  return fromTime([hour, min + SLOT_INTERVAL])
}
