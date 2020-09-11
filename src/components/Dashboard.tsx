import * as React from 'react'
import styled from '@emotion/styled'

import {SlotCard} from './SlotCard'
import {AgendaCard} from './AgendaCard'
import {DutiesList} from './DutiesList'

const ActionContainer = styled.div`
  width: 100%;
  min-height: 200px;
`

const Backdrop = styled.div`
  background: #2c3e50;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 30px 35px 30px 35px;
`

const Row = styled.div`
  width: 100%;
  max-width: 500px;
`

export function Dashboard() {
  return (
    <Backdrop>
      <Row>
        <SlotCard />
        <AgendaCard />
        <DutiesList />
        <ActionContainer />
      </Row>
    </Backdrop>
  )
}
