import { Alert, Card, MainContainer, Skeleton } from '@components'
import { useEffectOnce, useNotification } from '@hooks'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import services from '../services'
import slice from '../slice'

function Leaderboards() {
  const [ApiLeaderboards, { isLoading }] = services.useLeaderboardsMutation()
  const notification = useNotification()
  const rawLeaderboards = useSelector(slice.state)
  const leaderboards = useMemo(() => {
    return rawLeaderboards?.lists || []
  }, [rawLeaderboards])

  useEffectOnce(async () => {
    try {
      await ApiLeaderboards().unwrap()
    } catch (err) {
      notification.error(err)
    }
  })

  return (
    <MainContainer>
      <div className='container'>
        <div className='mx-auto max-w-3xl'>
          <div className='relative mb-10 flex items-start justify-center'>
            <h1 className='text-2xl font-semibold text-gray-700 dark:text-white'>
              Leaderboards of active users
            </h1>
            <div className='my-auto ml-4 flex-grow border-t border-gray-200 dark:border-gray-600' />
          </div>
          <div className='mb-12 flex flex-col gap-3'>
            {isLoading ? (
              Array.from({ length: 3 }).map((val, idx) => {
                return <Skeleton.Leaderboards key={idx} />
              })
            ) : !leaderboards.length > 0 ? (
              <Alert message='Data of leaderboard not found' />
            ) : (
              leaderboards.map((val, idx) => {
                return (
                  <Card.Leaderboards
                    key={idx}
                    num={idx + 1}
                    user={val.user}
                    score={val.score}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default Leaderboards
