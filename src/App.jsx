import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingScreen } from '@components'
import { Provider } from 'react-redux'
import store from './store'
import AppRoutes from './routes'

function App() {
  return (
    <Suspense fallback={<LoadingScreen reason='Initial app' />}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
