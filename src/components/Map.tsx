import React, { useContext } from 'react'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

import { setSelectedState } from '@/context/action-creators'
import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import geography from '@/helpers/geography.json'

export const Map: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useContext(LicensePlateTrackerContext)

  const { dbData, selectedState } = state

  return (
    <ComposableMap projection='geoAlbersUsa'>
      <Geographies geography={geography}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const stateName = geo.properties.name
              const isChecked = dbData.states && stateName in dbData.states
              const isSelected = stateName === selectedState

              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    onClick={() => dispatch(setSelectedState(stateName))}
                    style={{
                      default: {
                        fill: isChecked ? '#D6FFB7' : isSelected ? '#04bbb8' : '#ECEFF1',
                        outline: 'none',
                        stroke: '#607D8B'
                      },
                      hover: {
                        fill: isSelected ? '#04bbb8' : '#CFD8DC',
                        outline: 'none',
                        stroke: '#607D8B'
                      },
                      pressed: {
                        fill: '#FF5722',
                        outline: 'none',
                        stroke: '#607D8B'
                      }
                    }}
                  />
                </React.Fragment>
              )
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  )
}
