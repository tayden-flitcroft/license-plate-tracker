import React, { useContext } from 'react'

import { Select, SelectItem, SelectSection } from '@nextui-org/react'

import { StatesList } from '@/@types/enums'
import { setSelectedState } from '@/context/action-creators'
import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'

export const StateSelector: React.FC = (): React.ReactElement => {
  const { dispatch, state } = useContext(LicensePlateTrackerContext)

  const { dbData } = state
  return (
    <Select
      label='State License Plate'
      selectedKeys={[state.selectedState!]}
      selectionMode='single'
      onSelectionChange={out => {
        dispatch(setSelectedState(out.anchorKey!))
      }}
      listboxProps={{
        color: 'default',
        variant: 'shadow'
      }}
      popoverProps={{
        placement: 'bottom-start'
      }}
    >
      <SelectSection title='States'>
        {Object.values(StatesList).map(state => {
          return (
            <SelectItem key={state} textValue={state}>
              <div className='flex justify-between'>
                {state}
                {dbData?.states && state in dbData.states && <div>✅</div>}
              </div>
            </SelectItem>
          )
        })}
      </SelectSection>
    </Select>
  )
}
