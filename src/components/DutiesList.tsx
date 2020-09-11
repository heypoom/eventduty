import * as React from 'react'
import {useMemo} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import {DutyCard} from './DutyCard'
import {Separator} from './Separator'

import {Duty} from '../types/Duty'
import {Agenda} from '../types/Agenda'

import {notify} from '../utils/noti'
import {padSpace} from '../utils/padSpace'
import {getDutyList} from '../utils/getDutyList'

import {useDutyData} from '../hooks/useDutyData'
import {useAgendaData} from '../hooks/useAgenda'
import {useCurrentSlot} from '../hooks/useCurrentSlot'

export type Item =
  | ({type: 'agenda'; currentSlot?: number; range: string} & Agenda)
  | ({type: 'duty'} & Duty)
  | {type: 'slot'; slot: number; range: string}

interface DutyContext {
  handleDone: (id: number, name: string) => void
}

function renderDutyElement(item: Item, ctx: DutyContext) {
  if (item.type === 'duty') {
    return (
      <CSSTransition
        key={'d_' + item.id}
        timeout={800}
        classNames="transition-card">
        <DutyCard onDone={ctx.handleDone} {...item} />
      </CSSTransition>
    )
  }

  if (item.type === 'slot') {
    return (
      <CSSTransition
        key={'s_' + item.slot}
        timeout={800}
        classNames="separator">
        <Separator fontSize="1em" short>
          คิว {String(item.slot)} &nbsp;<small>({item.range})</small>
        </Separator>
      </CSSTransition>
    )
  }

  if (item.type === 'agenda') {
    return (
      <CSSTransition
        key={'a_' + item.slot}
        timeout={800}
        classNames="separator">
        <Separator>
          {item.name} &nbsp;
          <small>({item.range})</small>
        </Separator>
      </CSSTransition>
    )
  }

  return null
}

export function DutiesList() {
  const currentSlot = useCurrentSlot('09:00')
  const [duties, setDuties] = useDutyData()
  const [agendas] = useAgendaData()

  const dutyList = useMemo(() => {
    return getDutyList(duties, agendas, currentSlot)
  }, [currentSlot, agendas, duties])

  console.log(dutyList)

  function handleDone(id: number, name: string) {
    setDuties(duties.filter(duty => duty.id !== id))

    notify(`งาน <b>${name}</b> เสร็จแล้ว! &nbsp;😎`)
  }

  const ctx = {handleDone}

  return (
    <TransitionGroup className="duty-list">
      {dutyList.map(item => renderDutyElement(item, ctx))}
    </TransitionGroup>
  )
}
