import {DateTime} from 'luxon'

export const toTime = (x: string) => x.split(':').map(Number)

export const zeroPad = (x: number) => String(x < 10 ? '0' + x : x)

export const fromTime = (x: [number, number]) => x.map(zeroPad).join(':')

export function strptime(timeSlot: string) {
  const [h, m] = toTime(timeSlot)

  return DateTime.fromObject({hour: h, minute: m})
}
