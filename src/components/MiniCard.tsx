import * as React from 'react'
import styled from '@emotion/styled'

interface MiniCardProps {
  color?: string
}

export const MiniCard = styled.div<MiniCardProps>`
  padding: 10px 0;
  text-align: center;
  font-size: 1.4em;

  width: 100%;

  color: #2c3e50;
  background: #f6f6f6;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.18);

  margin: 16px 0;
  border-left: 12px solid ${props => props.color || '#9b59b6'};
  border-radius: 6px;
`
