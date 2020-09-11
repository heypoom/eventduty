import {useEffect, useState} from 'react'

import {pad} from './useCurrentTime'

import {getRemainingTimeInSlot} from '../utils/timeslot'

const SLOT_DURATION_MIN = 10

export function useRemainingTimeInSlot(
  slotDuration: number = SLOT_DURATION_MIN,
) {
  const [remaining, setRemaining] = useState('-')

  useEffect(() => {
    const timer = setInterval(() => {
      const [minute, second] = getRemainingTimeInSlot(slotDuration)

      setRemaining(minute + ':' + pad(second))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return remaining
}
