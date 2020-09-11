import {useState, useEffect} from 'react'

import {Duty} from '../types/Duty'

type DutyDataHookResult = [Duty[], React.Dispatch<React.SetStateAction<Duty[]>>]

const mockDuties: Duty[] = [
  {id: 1, name: 'เปิดประตูห้อง', slot: 14, color: '#25B9CF'},
  {id: 2, name: 'เปิดไฟ', slot: 16},
  {id: 3, name: 'เช็คเครื่องเสียง', slot: 16},
  {id: 4, name: 'เช็คโต๊ะลงทะเบียน', slot: 18, color: '#25B9CF'},
  {id: 5, name: 'เช็คอินเตอร์เน็ต', slot: 18},
]

export function useDutyData(): DutyDataHookResult {
  const [data, setData] = useState<Duty[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(mockDuties)
    }, 500)
  }, [])

  return [data, setData]
}
