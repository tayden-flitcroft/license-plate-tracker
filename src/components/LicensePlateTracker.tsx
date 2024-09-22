import React, { lazy, Suspense, useContext } from 'react'

const ChangeTrackerIDModal = lazy(() => import('@/components/ChangeTrackerIDModal').then(module => ({ default: module.ChangeTrackerIDModal })))
const DateSelection = lazy(() => import('@/components/DateSelection').then(module => ({ default: module.DateSelection })))
const Map = lazy(() => import('@/components/Map').then(module => ({ default: module.Map })))
const NavigationBar = lazy(() => import('@/components/NavigationBar').then(module => ({ default: module.NavigationBar })))
const RowOrColumn = lazy(() => import('@/components/RowOrColumn').then(module => ({ default: module.RowOrColumn })))
const SetInitialTrackerIdModal = lazy(() => import('@/components/SetInitialTrackerIdModal').then(module => ({ default: module.SetInitialTrackerIdModal })))
const StatesCounter = lazy(() => import('@/components/StatesCounter').then(module => ({ default: module.StatesCounter })))
const StateSeenInstance = lazy(() => import('@/components/StateSeenInstance').then(module => ({ default: module.StateSeenInstance })))
const StateSelector = lazy(() => import('@/components/StateSelector').then(module => ({ default: module.StateSelector })))

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import { useConditionalElements } from '@/hooks/useConditonalElements'

export const LicensePlateTracker: React.FC = (): React.ReactElement => {
  const { renderDateSelection, renderStatesCounter, renderStateSeenInstance } = useConditionalElements()
  const { state } = useContext(LicensePlateTrackerContext)

  const dateSelection = renderDateSelection({
    renderSelection: <DateSelection />,
    renderNothing: <></>
  })

  const statesCounter = renderStatesCounter({
    renderCounter: <StatesCounter />,
    renderNothing: <></>
  })

  const stateSeenInstances = renderStateSeenInstance({
    renderStateSeen: <StateSeenInstance />,
    renderNothing: <></>
  })

  return (
    <>
      <Suspense>
        <NavigationBar />
      </Suspense>
      <div className={`p-4 flex flex-col ${state.isSmallView ? 'gap-4' : 'gap-16'}`}>
        <Suspense>{statesCounter}</Suspense>
        <RowOrColumn>
          <Suspense>
            <Map />
          </Suspense>
          <div className='flex flex-col gap-4 w-full'>
            <Suspense>
              <StateSelector />
            </Suspense>
            <Suspense>{dateSelection}</Suspense>
            <Suspense>{stateSeenInstances}</Suspense>
            <Suspense>
              <ChangeTrackerIDModal />
            </Suspense>
            <Suspense>
              <SetInitialTrackerIdModal />
            </Suspense>
          </div>
        </RowOrColumn>
      </div>
    </>
  )
}
