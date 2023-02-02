import { useEffectOnce, useNotification, useRouter } from '@hooks'
import React, { useMemo } from 'react'
import { Card, Error, Skeleton, MainContainer, HeadingTitle } from '@components'
import { useSelector } from 'react-redux'
import services from '../services'
import slice from '../slice'

function ThreadDetail() {
  const { query } = useRouter()
  const notification = useNotification()
  const [ApiThread, threadStatus] = services.useGetThreadMutation()
  const thread = useSelector(slice.state)
  const threadId = query.id

  useEffectOnce(async () => {
    try {
      await ApiThread(threadId).unwrap()
    } catch (err) {
      notification.error(err)
    }
  })

  if (threadStatus?.error?.status === 404 || !threadId) {
    return <Error.NotFoundError />
  }

  const threadData = useMemo(() => {
    if (!thread.detail) {
      return {
        thread: null,
        comments: thread.comments,
        owner: null,
      }
    }
    const {
      id,
      title,
      body,
      category,
      createdAt,
      upVotesBy,
      downVotesBy,
      owner,
    } = thread.detail

    return {
      thread: {
        id,
        title,
        body,
        category,
        createdAt,
        totalComments: thread.comments.length,
        upVotesBy,
        downVotesBy,
      },
      owner,
      comments: thread.comments,
    }
  }, [thread.detail, thread.comments])

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
        <div className='!mb-12 space-y-8'>
          <HeadingTitle title='Comment' />
          <div className='space-y-4'>
            {threadStatus.isLoading
              ? Array.from({ length: 4 }).map((_val, idx) => {
                  return <Skeleton.Comment key={idx} />
                })
              : threadData.comments.map((val, idx) => {
                  return (
                    <Card.Comment key={idx} threadId={threadId} comment={val} />
                  )
                })}
          </div>
          {!threadStatus.isLoading && <Card.CommentForm id={threadId} />}
        </div>
      </div>
    </MainContainer>
  )
}

export default ThreadDetail
