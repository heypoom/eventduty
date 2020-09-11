import {useState, useEffect} from 'react'

import {useCurrentSlot} from './useCurrentSlot'

import {Agenda, Period} from '../types/Agenda'
import {getAgendaIndex, getPeriod} from '../utils/agenda'

type AgendaHookResult = [
  Agenda | null,
  Agenda | null,
  string | null,
  Agenda[],
  number,
]

export function useAgendaData() {
  const agendas: Agenda[] = [
    {slot: 0, slotEnd: 18, name: 'นอนหลับพักผ่อน'},
    {slot: 19, slotEnd: 22, name: 'รับน้องมาจากโรงแรม'},
    {slot: 23, slotEnd: 29, name: 'Design Thinking III'},
    {slot: 30, slotEnd: 36, name: 'สอนวิธีสัมภาษณ์'},
    {slot: 37, slotEnd: 40, name: 'พักกินข้าวเที่ยง'},
    {slot: 41, slotEnd: 200, name: 'พาน้องไปสัมภาษณ์'},
    {slot: 201, name: 'ร้องเพลงไฟเย็น'},
  ]

  const periods: Period[] = [
    {slot: 0, slotEnd: 18, name: 'chaos'},
    {slot: 19, slotEnd: 22, name: 'orientation'},
    {slot: 23, slotEnd: 36, name: 'lecture'},
    {slot: 37, slotEnd: 200, name: 'สัมภาษณ์'},
    {slot: 201, name: 'entertainment'},
  ]

  return [agendas, periods]
}

export function useAgenda(startTime: string): AgendaHookResult {
  const [agendas, periods] = useAgendaData()

  const [agendaIndex, setAgendaIndex] = useState<number | null>(null)
  const [currentPeriod, setPeriod] = useState<string | null>(null)

  const currentSlot = useCurrentSlot(startTime)

  useEffect(() => {
    const index = getAgendaIndex(currentSlot, agendas)
    const period = getPeriod(currentSlot, periods)

    if (index !== null) setAgendaIndex(index)
    if (period) setPeriod(period.name)
  }, [currentSlot])

  if (agendaIndex === null) {
    return [null, null, currentPeriod, agendas, currentSlot]
  }

  const currentAgenda = agendas[agendaIndex]
  const nextAgenda = agendas[agendaIndex + 1]

  return [currentAgenda, nextAgenda, currentPeriod, agendas, currentSlot]
}
