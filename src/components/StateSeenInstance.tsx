import React, { useContext, useEffect } from 'react'

import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'

import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'

export const StateSeenInstance: React.FC = () => {
  const { state } = useContext(LicensePlateTrackerContext)

  const columns = [
    {
      label: 'Date',
      key: 'date'
    },
    {
      label: 'Times Seen',
      key: 'timesSeen'
    }
  ]

  return (
    <Table isStriped onSortChange={() => {}}>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn allowsSorting key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No Dates to Show'} items={state.stateSeenDates.reverse()}>
        {item => <TableRow key={item.key}>{columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  )
}
