import * as React from 'react'
import styled from '@emotion/styled'

import {useAgenda} from '../hooks/useAgenda'
import {padSpace} from '../utils/padSpace'

export const Card = styled.div`
  width: 100%;
  color: #2c3e50;
  text-align: center;
  margin: 25px 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  cursor: pointer;
`

export const Title = styled.div`
  padding: 10px;
  background: #f6f6f6;
  border-radius: 6px 6px 0 0;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.08);
  position: relative;
  font-size: 1.8em;
  font-weight: 400;
`

export const Subtitle = styled.div`
  padding: 9px 0;
  font-size: 1em;
  border-radius: 0 0 10px 10px;

  color: #fefefe;
  background: #34495e;
  font-weight: 300;
`

export function AgendaCard() {
  const [agenda, nextAgenda, period] = useAgenda('09:00')

  let upcoming = 'ไม่มีกิจกรรมต่อจากนี้'

  if (nextAgenda) upcoming = `ต่อไป ${nextAgenda.name}`

  return (
    <Card>
      <Title>{agenda ? agenda.name : 'นอกเวลาจัดค่าย'}</Title>

      <Subtitle>
        {upcoming} &nbsp; · &nbsp; ช่วง{padSpace(period || 'หลังค่าย')}
      </Subtitle>
    </Card>
  )
}
