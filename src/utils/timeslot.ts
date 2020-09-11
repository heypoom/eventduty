import moment, {Moment} from 'moment'

const SLOT_DURATION_MIN = 10

export function strToTime(time: string): Moment {
  const [hour, minute] = time.split(':').map(Number)

  return moment({hour, minute})
}

export function getSlotFromTime(
  start: string,
  slotDuration: number = SLOT_DURATION_MIN,
  time?: string,
) {
  const startTime = strToTime(start)
  const currentTime = time ? strToTime(time) : moment()

  const difference = currentTime.diff(startTime)

  const diffMin = difference / 1000 / 60
  const slot = Math.ceil(diffMin / slotDuration)

  return slot
}

export function getRemainingTimeInSlot(slotDuration: number, time?: string) {
  let hour, minute, second

  if (time) {
    ;[hour, minute, second] = time.split(':')

    if (!second) second = 0
  } else {
    const d = new Date()

    hour = d.getHours()
    minute = d.getMinutes()
    second = d.getSeconds()
  }

  let remainingSecond = 60 - Number(second)

  let remainingMinute = slotDuration - (Number(minute) % slotDuration) - 1

  if (remainingMinute === 10) return [0, remainingSecond]

  return [remainingMinute, remainingSecond]
}
