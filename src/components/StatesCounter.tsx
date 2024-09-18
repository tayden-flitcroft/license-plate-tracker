import React, { useContext } from 'react'

import { Progress } from '@nextui-org/react'

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import { TOTAL_STATES } from '@/helpers/constants'

export const StatesCounter: React.FC = () => {
  const { state } = useContext(LicensePlateTrackerContext)

  const totalTrackedStates = Object.keys(state.dbData.states).length

  return (
    <div className='border border-transparent rounded-md p-4 text-md flex flex-col gap-2 bg-white'>
      <div>
        <div>
          You've tracked <span className='font-bold text-green-600'>{totalTrackedStates}</span> {`state${totalTrackedStates === 1 ? '' : 's'}!`}
        </div>
        <div>
          Only <span className='font-bold text-green-600'>{TOTAL_STATES - totalTrackedStates}</span> left to go!
        </div>
      </div>
      <Progress size='md' value={totalTrackedStates} maxValue={TOTAL_STATES} showValueLabel={false} color='success' className='max-w-md' />
    </div>
  )
}
