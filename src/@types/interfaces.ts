import { StatesList } from './enums'

export interface LicensePlateTrackerState {
  dbData: DbData
  showChangeIDModal: boolean
  selectedState?: keyof typeof StatesList
  showInitialTrackerIdModal: boolean
  trackerID: string
  stateSeenDates: StateSeenDates[]
}

export interface StateSeenDates {
  key: number | string
  date: string
  timesSeen: number
}

export interface DbData {
  createdOn: string
  dates: Record<string, Record<keyof typeof StatesList, number>>
  states: Record<keyof typeof StatesList, State>
}

interface State {
  allDatesSeen: Record<string, number>
  firstSeen: string
  lastSeen: string
}
