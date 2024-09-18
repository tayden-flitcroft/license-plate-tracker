import * as ActionCreators from './action-creators'

export const initialState = {
  dbData: {
    dates: {},
    states: {}
  },
  showChangeIDModal: false,
  showInitialTrackerIdModal: !localStorage.getItem('__TRACKER_ID__'),
  trackerID: localStorage.getItem('__TRACKER_ID__') ?? ''
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionCreators.SET_TRACKER_ID: {
      localStorage.setItem('__TRACKER_ID__', action.id)

      return {
        ...state,
        trackerID: action.id
      }
    }
    case ActionCreators.SET_SELECTED_STATE: {
      return {
        ...state,
        selectedState: action.state
      }
    }
    case ActionCreators.SET_SHOW_CHANGE_ID_MODAL: {
      return {
        ...state,
        showChangeIDModal: action.shouldShow
      }
    }
    case ActionCreators.SET_DB_DATA: {
      return {
        ...state,
        dbData: action.data
      }
    }
    case ActionCreators.SET_SHOW_INITIAL_TRACKER_ID_MODAL: {
      return {
        ...state,
        showInitialTrackerIdModal: action.shouldShow
      }
    }
    case ActionCreators.SET_STATE_SEEN_DATES: {
      return {
        ...state,
        stateSeenDates: action.stateSeenDates
      }
    }
    default:
      return state
  }
}
