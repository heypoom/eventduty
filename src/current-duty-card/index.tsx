import {getTimeSlots} from '../time-slot/get-time-slots'
import React, {useState} from 'react'
import {useAutoQueue} from '../time-slot/use-auto-queue'
import {Card} from '../ui/Card'
import styled from '@emotion/styled'
import {CardDecorLine} from '../ui/CardDecorLine'

export const PeriodLabel = styled.div`
  color: #555;
  font-size: 1.4em;
  margin-bottom: 0.8em;
`
export const QueueLabel = styled.div`
  font-size: 2.5em;
  color: #745fb5;

  line-height: 1.8em;
`
export const CurrentActivity = styled.div`
  color: #444;
  font-size: 1.75em;
`
export const RemainingTime = styled.div`
  margin-top: 1em;
  font-size: 1.5em;
`
export const Upcoming = styled.div`
  color: #555;
  margin-top: 0.8em;
  font-size: 1.38em;
`
export const Small = styled.span`
  font-size: 0.78em;
`
export const TimeSlot = styled.span`
  font-size: 0.7em;
`
export const QueueNo = styled.span`
  font-weight: 500;
`

export function CurrentDutyCard() {
  const timeSlots = getTimeSlots('20:00', '24:00')

  const [currentActivity, setActivity] = useState('เตรียมสถานที่ 🏡')
  const [upcoming, setUpcoming] = useState('ลงทะเบียน')
  const [period, setPeriod] = useState('CHAOS PERIOD 🔥')
  const [timeSlot, queue, remainingTime] = useAutoQueue(timeSlots)

  return (
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
  )
}
