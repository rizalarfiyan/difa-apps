import { useEffectOnce, useNotification, useRouter } from '@hooks'
import React, { useMemo } from 'react'
import { Card, Error, Skeleton, MainContainer, HeadingTitle } from '@components'
import services from '../services'

function ThreadDetail() {
  const { query } = useRouter()
  const notification = useNotification()
  const [ApiThread, threadStatus] = services.useGetThreadMutation()

  useEffectOnce(async () => {
    try {
      await ApiThread(query.id).unwrap()
    } catch (err) {
      notification.error(err)
    }
  })

  if (threadStatus?.error?.status === 404) {
    return <Error.NotFoundError />
  }

  const threadData = useMemo(() => {
    if (!threadStatus?.data?.data?.detailThread) {
      return {
        thread: null,
        comments: [],
        owner: null,
      }
    }
    const {
      id,
      title,
      body,
      category,
      createdAt,
      comments,
      upVotesBy,
      downVotesBy,
      owner,
    } = threadStatus.data.data.detailThread

    return {
      thread: {
        id,
        title,
        body,
        category,
        createdAt,
        totalComments: comments.length,
        upVotesBy,
        downVotesBy,
      },
      owner,
      comments,
    }
  }, [threadStatus?.data?.data?.detailThread])

  return (
    <MainContainer>
      <div className='container space-y-8'>
        <div>
          {threadStatus.isLoading ? (
            <Skeleton.Thread />
          ) : (
            <Card.Threads
              thread={threadData.thread}
              owner={threadData.owner}
              enableFormat
            />
          )}
        </div>
        <div>
          <HeadingTitle title='Add Comment' />
          <Card.CommentForm />
        </div>
      </div>
    </MainContainer>
  )
}

export default ThreadDetail
