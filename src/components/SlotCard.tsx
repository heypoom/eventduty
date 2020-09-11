import * as React from 'react'
import styled from '@emotion/styled'

import {useAgenda} from '../hooks/useAgenda'
import {useCurrentTime} from '../hooks/useCurrentTime'
import {useCurrentSlot} from '../hooks/useCurrentSlot'
import {useRemainingTimeInSlot} from '../hooks/useRemainingTimeInSlot'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  position: relative;

  width: 100%;
  background: #f6f6f6;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 16px 0;
  border-radius: 6px;
`

interface ItemProp {
  flex?: number
}

const Item = styled.div<ItemProp>`
  padding: 8px 10px 13px 10px;
  font-size: 1.2em;
  text-align: center;

  color: #35495d;
  width: 100%;

  flex: ${props => props.flex || 1};
`

interface ProgressLineProps {
  progress: number
  primary: string
  accent: string
}

// prettier-ignore
const ProgressLine = styled.div<ProgressLineProps>`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 5px;

  box-shadow: 0 -1px 4px rgba(53, 74, 94, 0.21);

  background: ${props => props.primary};
  background: ${props => `linear-gradient(45deg, ${props.accent} ${props.progress}%, ${props.primary})`};

  border-radius: 0px 0px 6px 6px;
`

const Small = styled.span`
  color: #354a5e;
  font-size: 0.8em;
`

function getProgress(time: string, slotDuration: number = 10) {
  const [min, sec] = time.split(':').map(Number)

  return Math.round(((min * 60 + sec) / (slotDuration * 60)) * 100)
}

export function SlotCard() {
  const currentTime = useCurrentTime()
  const currentSlot = useCurrentSlot('09:00')
  const remainingTime = useRemainingTimeInSlot()

  const progress = getProgress(remainingTime)

  return (
    <Container>
      <Item flex={1.6}>{currentTime}</Item>
      <Item>
        <Small>คิว</Small> {currentSlot}
      </Item>
      <Item flex={1.6}>
        <Small>เหลือ</Small> {remainingTime}
      </Item>

      <ProgressLine progress={progress} primary="#354a5e" accent="#9B59B6" />
    </Container>
  )
}
