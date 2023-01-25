import React, { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { auth } from '@features'
import Pages from '@pages'
import { ROUTE } from '@constants'
import { Error, GuardedRoute, Layouts } from '@components'
import { progress } from '@lib'

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    progress.start()
    progress.done()
  }, [location.pathname])

  return useRoutes([
    {
      element: <Layouts.BaseLayout />,
      children: [
        {
          element: <GuardedRoute redirectAuth />,
          children: [
            {
              path: ROUTE.login,
              element: <auth.pages.Login />,
            },
            {
              path: ROUTE.register,
              element: <auth.pages.Register />,
            },
          ],
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
