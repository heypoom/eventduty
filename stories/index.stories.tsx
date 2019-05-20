import React from 'react'
import {storiesOf} from '@storybook/react'

import {useRemainingTime} from '../src/time-slot/use-remaining-time'

const RemainingTimeDisplay = () => {
  const remainingTime = useRemainingTime('12:30')

  return <div>{remainingTime}</div>
}

storiesOf('Get Remaining Time', module).add('basic', () => {
  return <RemainingTimeDisplay />
})
