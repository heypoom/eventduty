import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

import {useRemainingTime} from '../src/time-slot/use-remaining-time'

storiesOf('Get Remaining Time', module)
  .add('basic', () => {
    const remainingTime = useRemainingTime('12:30')

    return <div>{remainingTime}</div>
  })
