import * as React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  position: relative;
  left: -35px;
  margin: 40px 0;

  small,
  span {
    font-weight: 300;
  }
`

interface LabelProps {
  fontSize?: string
}

const Label = styled.div<LabelProps>`
  color: white;
  font-size: ${props => props.fontSize || '1.13em'};
  left: 24px;
  position: relative;
`

const Line = styled.div<{lineWidth?: string}>`
  width: ${props => props.lineWidth || '100%'};
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  top: 6px;
  position: relative;
`

interface SeparatorProps {
  label?: string
  children?: (JSX.Element | string)[]
  fontSize?: string
  short?: boolean
}

export function Separator(props: SeparatorProps) {
  return (
    <Container className="separator-container">
      <Label fontSize={props.fontSize}>{props.label || props.children}</Label>

      <Line lineWidth={props.short ? '210px' : '100%'} />
    </Container>
  )
}
