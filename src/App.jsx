import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingScreen } from './components'
import AppRoutes from './routes'

function App() {
  return (
    <Suspense fallback={<LoadingScreen reason='Initial app' />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
