import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { auth } from '@features'

function GuardedRoute({ requireAuth, redirectAuth }) {
  const getAuth = useSelector(auth.slice.state)
  const location = useLocation()
  const isRequiredAuth = !getAuth.user && requireAuth
  const isAuth = getAuth.user && redirectAuth

  if (isRequiredAuth) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  if (isAuth) {
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
