import React from 'react'
import { Icon, Link, Navbar, UserDropdown } from '@components'
import { Outlet } from 'react-router-dom'
import { ROUTE } from '@constants'

function BaseLayout() {
  return (
    <>
      <Navbar>
        <div className='flex items-center gap-2'>
          <Link
            to={ROUTE.threads}
            rightIcon={<Icon name='thread' className='ml-2 h-5 w-5' />}
          >
            Threads
          </Link>
          <Link
            to={ROUTE.leaderboards}
            rightIcon={<Icon name='leaderboard' className='ml-2 h-5 w-5' />}
          >
            Leaderboards
          </Link>
          <UserDropdown />
        </div>
      </Navbar>
      <Outlet />
    </>
  )
}

export default BaseLayout
