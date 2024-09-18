import React, { useContext } from 'react'

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'

interface RenderDateSelectionProps {
  renderNothing: React.ReactElement
  renderSelection: React.ReactElement
}

interface RenderStatesCounterProps {
  renderCounter: React.ReactElement
  renderNothing: React.ReactElement
}

interface RenderStateSeenInstanceProps {
  renderStateSeen: React.ReactElement
  renderNothing: React.ReactElement
}

interface UseMap {
  renderDateSelection: (props: RenderDateSelectionProps) => React.ReactElement
  renderStatesCounter: (props: RenderStatesCounterProps) => React.ReactElement
  renderStateSeenInstance: (props: RenderStateSeenInstanceProps) => React.ReactElement
}

export const useMap = (): UseMap => {
  const { state } = useContext(LicensePlateTrackerContext)

  const renderDateSelection = ({ renderSelection, renderNothing }: RenderDateSelectionProps): React.ReactElement => {
    if (state.selectedState) {
      return renderSelection
    }

    return renderNothing
  }

  const renderStatesCounter = ({ renderCounter, renderNothing }: RenderStatesCounterProps): React.ReactElement => {
    if (Object.keys(state.dbData.states || []).length) {
      return renderCounter
    }

    return renderNothing
  }

  const renderStateSeenInstance = ({ renderStateSeen, renderNothing }: RenderStateSeenInstanceProps): React.ReactElement => {
    if (state.selectedState && state.dbData?.states?.[state.selectedState]) {
      return renderStateSeen
    }

    return renderNothing
  }

  return {
    renderDateSelection,
    renderStatesCounter,
    renderStateSeenInstance
  }
}
