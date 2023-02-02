import { Alert, Card, HeadingTitle, MainContainer, Skeleton } from '@components'
import { useEffectOnce, useNotification } from '@hooks'
import { classNames } from '@utils'
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
          <HeadingTitle title='Leaderboards of active users' />
          <div
            className={classNames(
              'mb-12 flex flex-col xxs:gap-3',
              isLoading ? 'gap-3' : 'gap-8'
            )}
          >
            {isLoading ? (
              Array.from({ length: 10 }).map((val, idx) => {
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
