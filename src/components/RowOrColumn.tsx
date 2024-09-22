import React, { useContext } from 'react'

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'

export const RowOrColumn: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { state } = useContext(LicensePlateTrackerContext)

  return <div className={`flex gap-8 ${state.isSmallView ? 'flex-col' : 'flex-row'}`}>{children}</div>
}
