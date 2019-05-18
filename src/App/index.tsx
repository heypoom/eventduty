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

// 5-minute time-slot interval
const SLOT_INTERVAL = 5

function getRemainingTime(timeSlot: string) {
  const [h, m] = timeSlot.split(':').map(Number)
  const slotStartingTime = DateTime.fromObject({hour: h, minute: m})
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

export function App() {
  const [queue, setQueue] = useState(1)
  const [currentActivity, setActivity] = useState('เตรียมสถานที่ 🏡')
  const [upcoming, setUpcoming] = useState('ลงทะเบียน')
  const [timeSlot, setTimeSlot] = useState('02:15')
  const [period, setPeriod] = useState('CHAOS PERIOD 🔥')

  const remainingTime = useRemainingTime(timeSlot)

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
