import {useEffect, useState} from 'react'
import {getRemainingTime} from './get-remaining-time'

import Timeout = NodeJS.Timeout

export function useRemainingTime(timeSlot: string) {
  const [remainingTime, setRemainingTime] = useState('00:00')
  let timer: Timeout

  useEffect(() => {
    timer = setInterval(() => {
      const remainingTime = getRemainingTime(timeSlot)

      setRemainingTime(remainingTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeSlot])

  return remainingTime
}
