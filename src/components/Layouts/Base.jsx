import React from 'react'
import { Button, Icon, Link, Navbar, UserDropdown } from '@components'
import { Outlet } from 'react-router-dom'
import { ROUTE } from '@constants'
import { useMode } from '@hooks'

function BaseLayout() {
  const { isDark, setMode } = useMode()

  const handleToggleMode = (event) => {
    setMode()
    event.preventDefault()
  }

  return (
    <>
      <Navbar>
        <div className='flex items-center gap-2'>
          <Button
            className='rounded-full bg-transparent !px-2 text-blue-500 hover:bg-blue-50 focus:bg-blue-100 active:bg-blue-50'
            type='button'
            onClick={handleToggleMode}
          >
            <Icon name={isDark ? 'light' : 'dark'} className='h-5 w-5' />
          </Button>
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
