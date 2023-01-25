import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingScreen, Notification } from '@components'
import { Provider } from 'react-redux'
import { createPortal } from 'react-dom'
import store from './store'
import AppRoutes from './routes'
import GlobalProvider from './GlobalProvider'

function App() {
  return (
    <Suspense fallback={<LoadingScreen reason='Initial app' />}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalProvider>
            <AppRoutes />
          </GlobalProvider>
          {createPortal(<Notification.NotificationWrapper />, document.body)}
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
