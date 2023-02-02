import React, { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { auth, leaderboards, threads } from '@features'
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
          element: <GuardedRoute requireAuth />,
          children: [
            {
              path: ROUTE.createThread,
              element: <threads.pages.CreateThread />,
            },
          ],
        },
        {
          path: ROUTE.threads,
          element: <threads.pages.Threads />,
        },
        {
          path: ROUTE.threadDetail,
          element: <threads.pages.ThreadDetail />,
        },
        {
          path: ROUTE.leaderboards,
          element: <leaderboards.pages.Leaderboards />,
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
