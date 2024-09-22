import React, { useContext } from 'react'

import { Divider, Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Snippet } from '@nextui-org/react'

import { setShowChangeIDModal } from '@/context/action-creators'
import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'

export const NavigationBar: React.FC = () => {
  const { state, dispatch } = useContext(LicensePlateTrackerContext)

  return (
    <Navbar className='bg-slate-200' maxWidth='full'>
      <NavbarContent>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className='pr-3' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-slate-800'>License Plate Tracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu className='bg-slate-200 border-t border-slate-300'>
        <NavbarMenuItem className='flex justify-between items-center'>
          Current Tracker ID:
          <Snippet className='float-right' hideSymbol variant='bordered'>
            {state.trackerID}
          </Snippet>
        </NavbarMenuItem>
        <Divider />
        <NavbarMenuItem>
          <Link className='cursor-pointer' href='#' color='primary' onPress={() => dispatch(setShowChangeIDModal(true))}>
            Change License Plate Tracker ID
          </Link>
        </NavbarMenuItem>
        <Divider />
        <NavbarMenuItem>
          <Link
            className='cursor-pointer'
            href='#'
            color='danger'
            onPress={() => {
              localStorage.clear()
              location.reload()
            }}
          >
            Log Out
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
