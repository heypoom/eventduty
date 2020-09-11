import {getAgenda} from '../src/utils/agenda'
import {Agenda} from '../src/types/Agenda'

describe('Agenda', () => {
  it('should derive the current agenda', () => {
    const agendas: Agenda[] = [
      {slot: 19, slotEnd: 22, name: 'Orientation'},
      {slot: 23, slotEnd: 24, name: 'Ice Breaking'},
      {slot: 25, slotEnd: 36, name: 'Design Thinking I'},
    ]

    const agenda = getAgenda(20, agendas)
    expect(agenda && agenda.name).toBe('Orientation')
  })
})
