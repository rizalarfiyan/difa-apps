import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { auth } from '@features'
import { storage, validAuth } from '@utils'
import { STORAGE_KEY } from '@constants'
import { LoadingScreen } from '@components'
import { useAuth, useEffectOnce, useMode } from '@hooks'

function GlobalProvider({ children }) {
  const [isAvaliable, setIsAvaliable] = useState(false)
  const { isLoggedIn, hasToken, logout, addToken } = useAuth()
  const { getInitialMode, setMode } = useMode()
  const [userInfo, { isLoading }] = auth.services.useUserInfoMutation()

  const parseUserAuth = async () => {
    const getToken = storage.get(STORAGE_KEY.token)
    if (!validAuth(getToken)) {
      logout()
      return
    }
    if (!hasToken) addToken(getToken)
    if (!isLoggedIn) {
      try {
        await userInfo().unwrap()
      } catch (err) {
        logout()
      }
    }
  }

  useEffectOnce(async () => {
    await setMode(getInitialMode())
    await parseUserAuth()
    setIsAvaliable(true)
  })

  const reason = useMemo(() => {
    if (isLoading) {
      return 'Fetching User Info...'
    }
    return 'Initialize Apps...'
  })

  if (!isLoading && isAvaliable) {
    return children
  }

  return <LoadingScreen reason={reason} />
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
