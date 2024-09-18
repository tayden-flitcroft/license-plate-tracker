import React, { useContext, useState } from 'react'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

import { setShowInitialTrackerIDModal, setTrackerID } from '@/context/action-creators'
import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import { useDatabase } from '@/hooks/useDatabase'

export const SetInitialTrackerIdModal = () => {
  const { dispatch, state } = useContext(LicensePlateTrackerContext)

  const { getDataByID, createNewTrackerID } = useDatabase()

  const [tempTrackerID, setTempTrackerID] = useState(state.trackerID)

  const closeInitialTrackerIDModal = () => dispatch(setShowInitialTrackerIDModal(false))

  const setTrackerId = async () => {
    const dataForId = await getDataByID({ id: tempTrackerID })

    if (!dataForId) {
      await createNewTrackerID({ id: tempTrackerID })
    }

    dispatch(setTrackerID(tempTrackerID))
    closeInitialTrackerIDModal()
  }

  return (
    <Modal isOpen={state.showInitialTrackerIdModal} placement='center' onClose={closeInitialTrackerIDModal} hideCloseButton isDismissable={false}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Set License Plate Tracker ID</ModalHeader>
        <form
          onSubmit={async e => {
            e.preventDefault()
            await setTrackerId()
          }}
        >
          <ModalBody>
            <Input onChange={e => setTempTrackerID(e.target.value)} label='Tracker ID' />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit' onPress={setTrackerId}>
              Set Tracker ID
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
