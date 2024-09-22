import { StatesList } from './enums'

export interface LicensePlateTrackerState {
  dbData: DbData
  selectedState?: keyof typeof StatesList
  showA2HSBanner: boolean
  showChangeIDModal: boolean
  showInitialTrackerIdModal: boolean
  stateSeenDates: StateSeenDates[]
  trackerID: string
}

export interface StateSeenDates {
  date: string
  key: number | string
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
