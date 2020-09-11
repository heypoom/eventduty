import {useEffect, useState} from 'react'

import {getSlotFromTime} from '../utils/timeslot'

export function useCurrentSlot(startTime: string) {
  const [slot, setSlot] = useState(0)

  function update() {
    const _slot = getSlotFromTime(startTime, 5)

    if (_slot > -1) setSlot(_slot)
  }

  useEffect(() => {
    update()

    const timer = setInterval(() => {
      const d = new Date()

      if (d.getSeconds() === 0) update()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return slot
}
