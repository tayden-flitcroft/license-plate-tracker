import React, { createContext, useEffect, useReducer } from 'react'

import { getDatabase, onValue, ref } from 'firebase/database'

import { parseDate } from '@internationalized/date'

import { setDBData, setIsSmallView, setStateSeenDates } from './action-creators'
import { initialState, reducer } from './reducer'

import { LicensePlateTrackerState } from '@/@types'
import { SMALL_VIEW_WIDTH } from '@/helpers/constants'

interface LicensePlateTrackerContextData {
  dispatch: (props: any) => void
  state: LicensePlateTrackerState
}

export const LicensePlateTrackerContext = createContext({} as LicensePlateTrackerContextData)
LicensePlateTrackerContext.displayName = 'LicensePlateTrackerContext'

export const LicensePlateTrackerProvider: React.FC<React.PropsWithChildren> = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.trackerID) {
      onValue(ref(getDatabase(), `/${state.trackerID}`), snapshot => {
        dispatch(setDBData(snapshot.val()))
      })
    }
  }, [state.trackerID])

  useEffect(() => {
    if (state.selectedState && state.dbData.states?.[state.selectedState]) {
      dispatch(
        setStateSeenDates(
          Object.keys(state.dbData.states[state.selectedState].allDatesSeen).map((date, idx) => {
            const { month, day, year } = parseDate(date)
            const prettyDate = `${month}/${day}/${year}`

            return {
              date: prettyDate,
              key: idx,
              timesSeen: state.dbData.states[state.selectedState].allDatesSeen[date]
            }
          })
        )
      )
    }
  }, [state.selectedState, state.dbData])

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSmallView(window.innerWidth <= SMALL_VIEW_WIDTH))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <LicensePlateTrackerContext.Provider value={{ dispatch, state }}>{children}</LicensePlateTrackerContext.Provider>
}
