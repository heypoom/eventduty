import {getAgenda} from './agenda'

import {strToTime} from './timeslot'

import {Duty} from '../types/Duty'
import {Agenda} from '../types/Agenda'

import {Item} from '../components/DutiesList'

export function getRangeFromSlot(
  slot: number,
  slotEnd: number | undefined | null,
  eventStartTime: string,
  slotDuration: number = 10,
) {
  const eventStart = strToTime(eventStartTime)
  if (!eventStart) return

  eventStart.add(slot * slotDuration, 'minutes')

  const start = eventStart.format('hh:mm')
  let end

  if (slotEnd !== null && slotEnd !== undefined) {
    end = eventStart
      .add((slotEnd - slot) * slotDuration, 'minutes')
      .format('hh:mm')
  } else {
    end = eventStart.add(10, 'minutes').format('hh:mm')
  }

  return `${start} - ${end}`
}

export function getDutyList(
  duties: Duty[],
  agendas: Agenda[],
  currentSlot: number,
): Item[] {
  const list = []

  let prevSlot = 0
  let prevAgenda = ''

  for (let duty of duties) {
    const isCurrentSlot = currentSlot === duty.slot

    if (duty.slot && duty.slot !== prevSlot && !isCurrentSlot) {
      const agenda = getAgenda(duty.slot, agendas)

      if (agenda && agenda.name !== prevAgenda) {
        const range = getRangeFromSlot(agenda.slot, agenda.slotEnd, '09:00')
        list.push({type: 'agenda', currentSlot: duty.slot, range, ...agenda})

        prevAgenda = agenda.name
      } else {
        const range = getRangeFromSlot(duty.slot, duty.slotEnd, '09:00')
        list.push({type: 'slot', slot: duty.slot, range})

        prevSlot = duty.slot
      }
    }

    list.push({type: 'duty', ...duty})
    prevSlot = duty.slot
  }

  return list as Item[]
}
