import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {DateTime} from 'luxon'

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;

  color: #2d2d30;
  background: #f1f3f5;
`

const Card = styled.div`
  position: relative;

  padding: 1.3em 2em;
  background: white;

  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03),
    0 1px 2px rgba(102, 119, 136, 0.3);
`

const PeriodLabel = styled.div`
  color: #555;
  font-size: 1.4em;
  margin-bottom: 0.8em;
`

const QueueLabel = styled.div`
  font-size: 2.5em;
  color: #745fb5;

  line-height: 1.8em;
`

const CurrentActivity = styled.div`
  color: #444;
  font-size: 1.75em;
`

const RemainingTime = styled.div`
  margin-top: 1em;
  font-size: 1.5em;
`

const Upcoming = styled.div`
  color: #555;
  margin-top: 0.8em;
  font-size: 1.38em;
`

const Small = styled.span`
  font-size: 0.78em;
`

const TimeSlot = styled.span`
  font-size: 0.7em;
`

const QueueNo = styled.span`
  font-weight: 500;
`

// Create a time stop every n minute, usually 5.
const SLOT_INTERVAL = 5

const toTime = (x: string) => x.split(':').map(Number)

function getNearestSlot(time?: string) {
  if (!time) {
    const date = new Date()
    time = date.getHours() + ':' + date.getMinutes()
  }

  const [h, m] = toTime(time)
  const min = m - (m % SLOT_INTERVAL)

  return fromTime([h, min])
}

const fromTime = (x: [number, number]) => x.map(zeroPad).join(':')

function getNextSlot(timeSlot: string) {
  const [h, m] = toTime(timeSlot)

  if (m + SLOT_INTERVAL >= 60) {
    return fromTime([h + 1, 0])
  }

  const min = m - (m % SLOT_INTERVAL)

  return fromTime([h, min + SLOT_INTERVAL])
}

function strptime(timeSlot: string) {
  const [h, m] = toTime(timeSlot)
  return DateTime.fromObject({hour: h, minute: m})
}

const MAX_SLOTS = 100

const zeroPad = (x: number) => String(x < 10 ? '0' + x : x)

function getTimeSlots(startsFrom: string, endsAt: string) {
  const [startHour, startMinute] = toTime(startsFrom)
  const [endHour, endMinute] = toTime(endsAt)

  const slots = ['__']
  let iH = startHour
  let iM = startMinute

  for (let i = 0; i <= MAX_SLOTS; i++) {
    const timeSlot = fromTime([iH, iM])
    slots.push(timeSlot)

    iM += SLOT_INTERVAL

    if (iM >= 60) {
      iM = 0
      iH++
    }

    if (iH >= endHour && iM >= endMinute) return slots
  }

  return slots
}

function getRemainingTime(timeSlot: string) {
  const slotStartingTime = strptime(timeSlot)
  const nextSlot = slotStartingTime.plus({minute: SLOT_INTERVAL})
  const currentTime = DateTime.local()

  return nextSlot.diff(currentTime).toFormat('mm:ss')
}

function useRemainingTime(timeSlot: string) {
  const [remainingTime, setRemainingTime] = useState('00:00')
  let timer = 0

  useEffect(() => {
    timer = setInterval(() => {
      const remainingTime = getRemainingTime(timeSlot)

      setRemainingTime(remainingTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeSlot])

  return remainingTime
}

function useAutoQueue() {
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

const CardDecorLine = styled.div`
  position: absolute;

  width: 100%;
  height: 6px;
  left: 0;
  top: 0;

  // background: #50fa7b;
  // background: linear-gradient(45deg, #00ffa1, aqua);
  background: linear-gradient(45deg, #755fb4, #a3a1ff);
  box-shadow: 0 1px 2px rgba(80, 250, 123, 0.2);
`

const timeSlots = getTimeSlots('2:00', '6:40')

export function App() {
  const [currentActivity, setActivity] = useState('เตรียมสถานที่ 🏡')
  const [upcoming, setUpcoming] = useState('ลงทะเบียน')
  const [period, setPeriod] = useState('CHAOS PERIOD 🔥')
  const [timeSlot, queue, remainingTime] = useAutoQueue()

  return (
    <Container>
      <div>
        <PeriodLabel>{period}</PeriodLabel>

        <Card>
          <CardDecorLine />

          <QueueLabel>
            <Small>คิว</Small> <QueueNo>{queue}</QueueNo>{' '}
            <TimeSlot>({timeSlot})</TimeSlot>
          </QueueLabel>

          <CurrentActivity>{currentActivity}</CurrentActivity>
        </Card>

        <RemainingTime>เหลือเวลา {remainingTime}</RemainingTime>
        <Upcoming>คิวถัดไป: {upcoming}</Upcoming>
      </div>
    </Container>
  )
}
