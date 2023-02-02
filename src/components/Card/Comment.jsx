import React from 'react'
import PropTypes from 'prop-types'
import { classNames, timeAgo } from '@utils'
import { Button, Icon } from '@components'
import { threads } from '@features'
import { useUsers } from '@hooks'
import format from 'html-react-parser'

function Comment({ threadId, comment }) {
  if (!comment) return ''

  const { me } = useUsers()
  const { action, handleLike, handleDislike } = threads.hooks.useActionComment({
    id: comment.id,
    threadId,
    me,
    like: comment.upVotesBy.length,
    dislike: comment.downVotesBy.length,
    hasLike: comment.upVotesBy.includes(me?.id) || 0,
    hasDislike: comment.downVotesBy.includes(me?.id) || 0,
  })

  return (
    <div className='relative flex flex-col gap-5 rounded-md border-2 border-transparent bg-white p-4 shadow-lg transition-colors duration-300 hover:border-blue-500 dark:bg-gray-600 sm:p-6 md:p-8'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center justify-between gap-3'>
          <div className='h-14 w-14 min-w-[56px] overflow-hidden rounded-md bg-gray-200 dark:bg-gray-400'>
            <img src={comment.owner.avatar} alt={comment.owner.name} />
          </div>
          <div className='flex flex-col'>
            <h5 className='font-semibold text-gray-700 dark:text-white'>
              {comment.owner.name}
            </h5>
            <span className='text-sm text-gray-500 dark:text-gray-200'>
              {timeAgo(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className='text-gray-600 dark:text-gray-300'>
        {format(comment.content)}
      </div>
      <div className='flex items-center gap-3'>
        <Button
          variant='outline-info'
          leftIcon={<Icon name='like' className='mr-2 h-5 w-5' />}
          className={classNames(
            action.like.isActive && '!bg-blue-50 dark:!bg-opacity-10'
          )}
          isLoading={action.like.isLoading}
          disabled={action.like.isDisable}
          onClick={handleLike}
        >
          {action.like.count}
        </Button>
        <Button
          variant='outline-danger'
          leftIcon={<Icon name='dislike' className='mr-2 h-5 w-5' />}
          className={classNames(
            action.dislike.isActive && '!bg-red-50 dark:!bg-opacity-10'
          )}
          isLoading={action.dislike.isLoading}
          disabled={action.dislike.isDisable}
          onClick={handleDislike}
        >
          {action.dislike.count}
        </Button>
      </div>
    </div>
  )
}

Comment.defaultProps = {
  comment: null,
}

Comment.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string,
  }),
}

export default Comment
