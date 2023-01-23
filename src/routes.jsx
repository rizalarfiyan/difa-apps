import React from 'react'
import { useRoutes } from 'react-router-dom'
import { auth } from '@features'
import Pages from '@pages'
import { ROUTE } from '@constants'
import { Error, Layouts } from './components'

function AppRoutes() {
  return useRoutes([
    {
      element: <Layouts.BaseLayout />,
      children: [
        {
          path: ROUTE.login,
          element: <auth.pages.Login />,
        },
        {
          path: ROUTE.register,
          element: <auth.pages.Register />,
        },
        {
          path: ROUTE.threads,
          element: <Pages.Threads />,
        },
        {
          path: ROUTE.threadDetail,
          element: <Pages.ThreadDetail />,
        },
        {
          path: ROUTE.leaderboards,
          element: <Pages.Leaderboards />,
        },
        {
          path: '*',
          element: <Error.NotFoundError />,
        },
      ],
    },
  ])
}

export default AppRoutes
