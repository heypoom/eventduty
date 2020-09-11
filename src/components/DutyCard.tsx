import * as React from 'react'
import styled from '@emotion/styled'
import Ink from 'react-ink'

import Swipeout from './Swipeout'
import {notify} from '../utils/noti'

function buildAction(onLeftSwipe: Function, onRightSwipe: Function) {
  const actionLeft = {
    children: (
      <div className="duty-card-action-container">
        <Ink />

        <i className="far fa-check-circle" />
      </div>
    ),
    onSwipe: onRightSwipe,
    className: 'duty-card-action',
  }

  const actionRight = {
    children: (
      <div className="duty-card-action-container action-left">
        <Ink />

        <i className="far fa-clock" />
      </div>
    ),
    onSwipe: onLeftSwipe,
    className: 'duty-card-action',
  }

  return [actionLeft, actionRight]
}

interface ContainerProps {
  color?: string
  upcoming?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;

  font-size: 1.4em;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 25px 0;
  border-left: 12px solid ${props => props.color || '#9b59b6'};
  border-radius: 6px;

  opacity: ${props => (props.upcoming ? 0.88 : 1)};

  .swipeout,
  .swipeout-btn.duty-card-action {
    background: ${props => props.color || '#9b59b6'};
  }
`

export const InnerCard = styled.div`
  color: #2c3e50;
  background: white;
  padding: 10px 0px 10px 28px;
  border-radius: 0px 6px 6px 0px;
  position: relative;

  cursor: pointer;
`

interface DutyCardProps {
  id: number
  name: string
  color?: string
  upcoming?: boolean

  onDone?: (id: number, name: string) => void
}

export function DutyCard(props: DutyCardProps) {
  function onLeftAction() {
    notify(`เลื่อนเวลา ${props.name}`)
  }

  function onRightAction() {
    if (props.onDone) props.onDone(props.id, props.name)
  }

  const [actionLeft, actionRight] = buildAction(onLeftAction, onRightAction)

  return (
    <Container
      className="duty-card-container"
      color={props.color}
      upcoming={props.upcoming}>
      <Swipeout left={actionLeft} right={actionRight}>
        <InnerCard>{props.name}</InnerCard>
      </Swipeout>
    </Container>
  )
}
