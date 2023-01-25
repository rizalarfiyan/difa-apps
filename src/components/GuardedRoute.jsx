import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth, useEffectOnce, useNotification } from '@hooks'

function GuardedRoute({ requireAuth, redirectAuth }) {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const notification = useNotification()
  const cond = {
    isRequiredAuth: !isLoggedIn && requireAuth,
    isAuth: isLoggedIn && redirectAuth,
  }

  useEffectOnce(() => {
    if (cond.isRequiredAuth) {
      notification.info('Login required!')
    }
    if (cond.isAuth) {
      notification.info('Already login!')
    }
  })

  if (cond.isRequiredAuth) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  if (cond.isAuth) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

GuardedRoute.defaultProps = {
  requireAuth: false,
  redirectAuth: false,
}

GuardedRoute.propTypes = {
  requireAuth: PropTypes.bool,
  redirectAuth: PropTypes.bool,
}

export default GuardedRoute
