import React, {useEffect, useRef} from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: grid;
  min-height: 100vh;

  grid-template-columns: 1fr 1fr;
`

const Box = styled.div`
  background: ${props => props.color};

  color: #2d2d30;
  font-size: 3em;
  font-family: 'FuraCode Nerd Font', sans-serif;
  padding: 1em;
`

export function App() {
  return (
    <Container>
      <Box color="#50fa7b">Hello</Box>
      <Box color="#8be9fd">World</Box>
      <Box color="#50fa7b">Hello</Box>
      <Box color="#8be9fd">World</Box>
    </Container>
  )
}
