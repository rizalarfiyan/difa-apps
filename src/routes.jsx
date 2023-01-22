import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Error } from './components'
import Pages from './pages'

function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Pages.Home />,
    },
    {
      path: '*',
      element: <Error.NotFoundError />,
    },
  ])
}

export default AppRoutes
