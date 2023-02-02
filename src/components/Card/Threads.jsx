import React from 'react'
import PropTypes from 'prop-types'
import { classNames, htmlTags, routeReplace, timeAgo } from '@utils'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@components'
import { ROUTE } from '@constants'
import { useUsers } from '@hooks'
import { threads } from '@features'

function Threads({ thread }) {
  const { me, userById } = useUsers()

  const user = userById(thread.ownerId)
  const content = htmlTags(thread.body, true)

  const { action, handleLike, handleDislike } = threads.hooks.useActionThread({
    id: thread.id,
    me,
    like: thread.upVotesBy.length,
    dislike: thread.downVotesBy.length,
    hasLike: thread.upVotesBy.includes(me?.id) || 0,
    hasDislike: thread.downVotesBy.includes(me?.id) || 0,
  })

  return (
    <div className='relative flex flex-col gap-5 rounded-md border-2 border-transparent bg-white p-4 shadow-lg transition-colors duration-300 hover:border-blue-500 dark:bg-gray-600 sm:p-6 md:p-8'>
      <Link to={routeReplace(ROUTE.threadDetail, thread.id)}>
        <h2 className='text-2xl font-semibold text-gray-700 dark:text-white'>
          {thread.title}
        </h2>
      </Link>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center justify-between gap-3'>
          <div className='h-14 w-14 min-w-[56px] overflow-hidden rounded-md bg-gray-200 dark:bg-gray-400'>
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className='flex flex-col'>
            <h5 className='font-semibold text-gray-700 dark:text-white'>
              {user.name}
            </h5>
            <span className='text-sm text-gray-500 dark:text-gray-200'>
              {timeAgo(thread.createdAt)}
            </span>
          </div>
        </div>
        <div className='rounded-full border-2 border-blue-500 px-4 py-1 text-blue-700 dark:text-white'>
          {thread.category}
        </div>
      </div>
      <div className='text-gray-600 line-clamp-3 dark:text-gray-300'>
        {content}
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
        <div className='inline-flex h-9 min-h-[2.25rem] flex-shrink-0 select-none items-center justify-center whitespace-nowrap rounded-md bg-transparent px-4 align-middle text-base font-medium leading-5 text-gray-600 outline-none duration-75 ease-out hover:bg-gray-50 active:bg-gray-100 dark:text-white dark:hover:bg-opacity-10'>
          <Icon name='comment' className='mr-2 h-5 w-5' />
          <span>{thread.totalComments}</span>
        </div>
      </div>
    </div>
  )
}

Threads.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default Threads
