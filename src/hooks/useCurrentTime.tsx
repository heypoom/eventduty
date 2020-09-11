import {useState, useEffect} from 'react'

export const pad = (n: number) => (n < 10 ? '0' + n : String(n))

export function useCurrentTime() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date()

      setTime(
        d.getHours() + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return time
}
