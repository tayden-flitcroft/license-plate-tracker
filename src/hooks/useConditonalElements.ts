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

interface RenderA2HSBannerProps {
  renderBanner: React.ReactElement
  renderNothing: React.ReactElement
}

interface UseConditionalElements {
  renderA2HSBanner: (props: RenderA2HSBannerProps) => React.ReactElement
  renderDateSelection: (props: RenderDateSelectionProps) => React.ReactElement
  renderStatesCounter: (props: RenderStatesCounterProps) => React.ReactElement
  renderStateSeenInstance: (props: RenderStateSeenInstanceProps) => React.ReactElement
}

export const useConditionalElements = (): UseConditionalElements => {
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

  const renderA2HSBanner = ({ renderBanner, renderNothing }: RenderA2HSBannerProps): React.ReactElement => {
    if (state.showA2HSBanner && state.trackerID) {
      return renderBanner
    }

    return renderNothing
  }

  return {
    renderA2HSBanner,
    renderDateSelection,
    renderStatesCounter,
    renderStateSeenInstance
  }
}
