import {useEffect, useState} from 'react'

import {getNextSlot} from './get-next-slot'
import {getNearestSlot} from './get-nearest-slot'
import {useRemainingTime} from './use-remaining-time'

import {toTime} from '../time-utils'

export function useAutoQueue(timeSlots: string[]) {
  const initialSlot = getNearestSlot()
  const [timeSlot, setTimeSlot] = useState(initialSlot)

  const initialQueue = timeSlots.findIndex(t => t === initialSlot) || 1
  const [queue, setQueue] = useState(initialQueue)

  const remainingTime = useRemainingTime(timeSlot)

  useEffect(() => {
    const [h, m] = toTime(remainingTime)

    if (h < 0 || m < 0) {
      const nextSlot = getNextSlot(timeSlot)
      setTimeSlot(nextSlot)

      const nextQueue = timeSlots.findIndex(t => t === nextSlot) || 1
      setQueue(nextQueue)

      return
    }
  }, [remainingTime])

  return [timeSlot, queue, remainingTime]
}
