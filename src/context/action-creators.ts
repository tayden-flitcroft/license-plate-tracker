import { DbData, StateSeenDates } from '@/@types'

export const SET_TRACKER_ID = 'set-tracker-id'
export const setTrackerID = (id: string) => ({ type: SET_TRACKER_ID, id })

export const SET_SELECTED_STATE = 'set-selected-state'
export const setSelectedState = (state: string) => ({ type: SET_SELECTED_STATE, state })

export const SET_SHOW_CHANGE_ID_MODAL = 'set-show-change-id-modal'
export const setShowChangeIDModal = (shouldShow: boolean) => ({ type: SET_SHOW_CHANGE_ID_MODAL, shouldShow })

export const SET_DB_DATA = 'set-db-data'
export const setDBData = (data: DbData) => ({ type: SET_DB_DATA, data })

export const SET_SHOW_INITIAL_TRACKER_ID_MODAL = 'set-show-initial-tracker-id-modal'
export const setShowInitialTrackerIDModal = (shouldShow: boolean) => ({ type: SET_SHOW_INITIAL_TRACKER_ID_MODAL, shouldShow })

export const SET_STATE_SEEN_DATES = 'set-state-seen-dates'
export const setStateSeenDates = (stateSeenDates: StateSeenDates[]) => ({ type: SET_STATE_SEEN_DATES, stateSeenDates })

export const SET_IS_SMALL_VIEW = 'set-is-small-view'
export const setIsSmallView = (isSmallView: boolean) => ({ type: SET_IS_SMALL_VIEW, isSmallView })
