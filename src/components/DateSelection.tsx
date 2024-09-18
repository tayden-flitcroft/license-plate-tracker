import React, { useContext } from 'react'

import { Button, DatePicker } from '@nextui-org/react'

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import { useDatabase } from '@/hooks/useDatabase'
import { useDate } from '@/hooks/useDate'

export const DateSelection: React.FC = (): React.ReactElement => {
  const { state } = useContext(LicensePlateTrackerContext)
  const { date, setDate } = useDate()
  const { setSeenDate } = useDatabase()

  return (
    <>
      <DatePicker label='Date Seen' value={date} onChange={setDate} />
      <Button size='lg' variant='flat' color='primary' onPress={() => setSeenDate({ date, id: state.trackerID, state: state.selectedState!, existingData: state.dbData })}>
        Add
      </Button>
    </>
  )
}
