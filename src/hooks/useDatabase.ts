import { get, getDatabase, ref, set, update } from 'firebase/database'

import { type CalendarDate } from '@internationalized/date'

import type { DbData, StatesList } from '@/@types'

interface SetSeenDateProps {
  date: CalendarDate
  state: keyof typeof StatesList
  id: string
  existingData: DbData
}

interface CreateNewTrackerIDProps {
  id: string
}

interface GetDataByIDProps {
  id: string
}

export const useDatabase = () => {
  const getDataByID = async ({ id }: GetDataByIDProps): Promise<DbData | null> => {
    const dbRef = ref(getDatabase(), id)

    return get(dbRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val()
        } else {
          return null
        }
      })
      .catch(error => {
        console.error(error)
        return null
      })
  }

  const createNewTrackerID = async ({ id }: CreateNewTrackerIDProps): Promise<void> => {
    const dbRef = ref(getDatabase(), id)

    set(dbRef, {
      createdOn: new Date().toUTCString()
    })
  }

  const setSeenDate = async ({ date, state, id, existingData }: SetSeenDateProps): Promise<void> => {
    const existingStates = existingData?.states || {}
    const existingDates = existingData?.dates || {}

    const updates = {
      '/states': {
        ...existingStates,
        [state]: {
          ...(existingStates?.[state] || {}),
          latestSeen: date.toString(),
          firstSeen: Date.parse(existingStates?.[state]?.firstSeen) < Date.parse(date.toString()) ? existingStates?.[state]?.firstSeen : date.toString(),
          allDatesSeen: {
            ...(existingStates?.[state]?.allDatesSeen || {}),
            [date.toString()]: (existingStates?.[state]?.allDatesSeen?.[date.toString()] || 0) + 1
          }
        }
      },
      '/dates': {
        ...existingDates,
        [date.toString()]: { ...(existingDates[date.toString()] || {}), [state]: (existingDates?.[date.toString()]?.[state] || 0) + 1 }
      }
    }

    update(ref(getDatabase(), id), updates)
  }

  return {
    createNewTrackerID,
    getDataByID,
    setSeenDate
  }
}
