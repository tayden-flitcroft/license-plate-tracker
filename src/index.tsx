import React from 'react'

import { initializeApp } from 'firebase/app'
import { connectDatabaseEmulator, getDatabase } from 'firebase/database'
import { createRoot } from 'react-dom/client'

import { NextUIProvider } from '@nextui-org/react'

import './global.css'

import { LicensePlateTracker } from '@/components/LicensePlateTracker'
import { LicensePlateTrackerProvider } from '@/context/LicensePlateTrackerContext'

const firebaseConfig = {
  apiKey: 'AIzaSyB7dyMNQnFIthIo9HPao1sVbZcFy2PcKlA',
  authDomain: 'license-plate-tracker-7e0d0.firebaseapp.com',
  projectId: 'license-plate-tracker-7e0d0',
  storageBucket: 'license-plate-tracker-7e0d0.appspot.com',
  messagingSenderId: '685367373092',
  appId: '1:685367373092:web:0582b2f05b22face2697b1'
}

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

if (process.env.NODE_ENV === 'development') {
  connectDatabaseEmulator(database, 'localhost', 9000)
}

const root = createRoot(document.querySelector('#app')!)

root.render(
  <NextUIProvider>
    <LicensePlateTrackerProvider>
      <LicensePlateTracker />
    </LicensePlateTrackerProvider>
  </NextUIProvider>
)
