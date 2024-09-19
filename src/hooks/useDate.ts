import { useState } from 'react'

import { CalendarDate } from '@internationalized/date'

interface UseDate {
  date: CalendarDate
  setDate: (date: CalendarDate) => void
}

export const useDate = (): UseDate => {
  const jsDate = new Date()
  const today = new CalendarDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate())

  const [date, setDate] = useState<CalendarDate>(today)

  return {
    date,
    setDate
  }
}
