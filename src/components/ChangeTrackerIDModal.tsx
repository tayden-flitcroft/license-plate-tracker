import React, { useContext, useState } from 'react'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

import { setShowChangeIDModal, setTrackerID } from '@/context/action-creators'
import { LicensePlateTrackerContext } from '@/context/LicensePlateTrackerContext'
import { useDatabase } from '@/hooks/useDatabase'

export const ChangeTrackerIDModal = () => {
  const { dispatch, state } = useContext(LicensePlateTrackerContext)

  const { getDataByID, createNewTrackerID } = useDatabase()

  const [tempTrackerID, setTempTrackerID] = useState(state.trackerID)

  const closeChangeIDModal = () => dispatch(setShowChangeIDModal(false))

  const handleChangeTrackerID = async () => {
    const dataForId = await getDataByID({ id: tempTrackerID })

    if (!dataForId) {
      await createNewTrackerID({ id: tempTrackerID })
    }

    dispatch(setTrackerID(tempTrackerID))
    closeChangeIDModal()
  }

  return (
    <Modal isOpen={state.showChangeIDModal} placement='center' onClose={closeChangeIDModal}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Change License Plate Tracker ID</ModalHeader>
        <form
          onSubmit={async e => {
            e.preventDefault()
            await handleChangeTrackerID()
          }}
        >
          <ModalBody>
            <Input placeholder={state.trackerID} onChange={e => setTempTrackerID(e.target.value)} label='Tracker ID' />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={closeChangeIDModal}>
              Close
            </Button>
            <Button color='primary' onPress={handleChangeTrackerID}>
              Change Tracker ID
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
