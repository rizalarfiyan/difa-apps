import { ROUTE } from '@constants'
import { threads } from '@features'
import { useNotification, useRouter } from '@hooks'
import { useEffect, useState } from 'react'

const useActionThread = ({
  id,
  threadId,
  me,
  like,
  dislike,
  hasLike,
  hasDislike,
}) => {
  const [action, setAction] = useState({
    like: {
      count: like,
      isActive: hasLike,
      isLoading: false,
      isDisable: false,
    },
    dislike: {
      count: dislike,
      isActive: hasDislike,
      isLoading: false,
      isDisable: false,
    },
  })

  const notification = useNotification()
  const { navigate, pathname } = useRouter()
  const [upVote, upVoteState] = threads.services.useUpCommentThreadMutation()
  const [downVote, downVoteState] =
    threads.services.useDownCommentThreadMutation()
  const [neutralVote, neutralVoteState] =
    threads.services.useNeutralCommentThreadMutation()

  useEffect(() => {
    setAction((prev) => ({
      like: {
        ...prev.like,
        isLoading: !!(
          upVoteState.isLoading ||
          (prev.like.isActive && neutralVoteState.isLoading)
        ),
        isDisable: downVoteState.isLoading || neutralVoteState.isLoading,
      },
      dislike: {
        ...prev.dislike,
        isLoading: !!(
          downVoteState.isLoading ||
          (prev.dislike.isActive && neutralVoteState.isLoading)
        ),
        isDisable: upVoteState.isLoading || neutralVoteState.isLoading,
      },
    }))
  }, [
    upVoteState.isLoading,
    downVoteState.isLoading,
    neutralVoteState.isLoading,
  ])

  useEffect(() => {
    if (!me) {
      setAction((prev) => ({
        like: {
          ...prev.like,
          isActive: false,
        },
        dislike: {
          ...prev.dislike,
          isActive: false,
        },
      }))
    }
  }, [me])

  const backLogin = () => {
    notification.info('Please login first!')
    navigate(ROUTE.login, {
      state: {
        redirect: pathname,
      },
    })
  }

  const handleLike = async (event) => {
    if (!me) {
      backLogin()
      return
    }
    if (
      !(action.like.isActive || action.dislike.isActive) ||
      action.dislike.isActive
    ) {
      try {
        await upVote({ threadId, id }).unwrap()
        if (action.dislike.isActive) {
          setAction((prev) => ({
            like: {
              ...prev.like,
              count: prev.like.count + 1,
              isActive: true,
            },
            dislike: {
              ...prev.dislike,
              count: prev.dislike.count - 1,
              isActive: false,
            },
          }))
        } else {
          setAction((prev) => ({
            ...prev,
            like: {
              ...prev.like,
              count: prev.like.count + 1,
              isActive: true,
            },
          }))
        }
      } catch (err) {
        notification.error(err)
      }
    }
    if (action.like.isActive) {
      try {
        await neutralVote({ threadId, id }).unwrap()
        setAction((prev) => ({
          ...prev,
          like: {
            ...prev.like,
            count: prev.like.count - 1,
            isActive: false,
          },
        }))
      } catch (err) {
        notification.error(err)
      }
    }
    event.preventDefault()
  }

  const handleDislike = async (event) => {
    if (!me) {
      backLogin()
      return
    }
    if (
      !(action.dislike.isActive || action.like.isActive) ||
      action.like.isActive
    ) {
      try {
        await downVote({ threadId, id }).unwrap()
        if (action.like.isActive) {
          setAction((prev) => ({
            dislike: {
              ...prev.dislike,
              count: prev.dislike.count + 1,
              isActive: true,
            },
            like: {
              ...prev.like,
              count: prev.like.count - 1,
              isActive: false,
            },
          }))
        } else {
          setAction((prev) => ({
            ...prev,
            dislike: {
              ...prev.dislike,
              count: prev.dislike.count + 1,
              isActive: true,
            },
          }))
        }
      } catch (err) {
        notification.error(err)
      }
    }
    if (action.dislike.isActive) {
      try {
        await neutralVote({ threadId, id }).unwrap()
        setAction((prev) => ({
          ...prev,
          dislike: {
            ...prev.dislike,
            count: prev.dislike.count - 1,
            isActive: false,
          },
        }))
      } catch (err) {
        notification.error(err)
      }
    }
    event.preventDefault()
  }

  return {
    action,
    handleLike,
    handleDislike,
  }
}

export default useActionThread
