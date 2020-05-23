import React from 'react'
import styled from '@emotion/styled'

import {CurrentDutyCard} from '../current-duty-card'
import {Card} from '../ui/Card'

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

export const App = () => (
  <Container>
    <CurrentDutyCard />

    <Card>
      <div>50 (19:20)</div>

      <div>ลงทะเบียน</div>
    </Card>
  </Container>
)
