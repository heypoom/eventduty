import {Moment} from 'moment'

export interface TimeSlot {
  queue: number
  start: Moment
  end: Moment
}
