import * as React from 'react'
import {Router} from '@reach/router'
import {Dashboard} from './Dashboard'

export function Routes() {
  return (
    <Router>
      <Dashboard path="/" />
    </Router>
  )
}
