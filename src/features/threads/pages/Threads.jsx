import { Alert, MainContainer, RadioCategory, Skeleton } from '@components'
import { FILTER } from '@constants'
import { global } from '@features'
import { useEffectOnce, useNotification, useUsers } from '@hooks'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import services from '../services'
import slice from '../slice'

function Threads() {
  const [loading, setLoading] = useState(true)
  const [ApiThreads, threadsStatus] = services.useGetThreadsMutation()
  const [ApiUsers, usersState] = global.services.useGetUsersMutation()
  const notification = useNotification()
  const rawThreads = useSelector(slice.state)
  const [category, setCategory] = useState(FILTER.all)
  const { userById } = useUsers()

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }

  const threads = useMemo(() => {
    const lists = rawThreads?.lists || []
    const categories = [
      {
        name: FILTER.all,
        count: lists.length,
      },
      ...(rawThreads?.categories || []),
    ]
    if (category !== FILTER.all) {
      return {
        lists: lists.filter((val) => val.category === category),
        error: `Data of thread category ${category} not found`,
        categories,
      }
    }
    return {
      lists,
      error: 'Data of thread not found',
      categories,
    }
  }, [rawThreads, category])

  useEffectOnce(async () => {
    try {
      await ApiThreads().unwrap()
      await ApiUsers().unwrap()
      setLoading(false)
    } catch (err) {
      notification.error(err)
    }
  })

  const isLoading = threadsStatus.isLoading || usersState.isLoading || loading

  return (
    <MainContainer>
      <div className='container'>
        <div className='flex justify-between gap-6'>
          <div className='w-60 space-y-4'>
            <h1 className='text-2xl font-semibold text-gray-700 dark:text-white'>
              Category
            </h1>
            <div className='flex w-full flex-col gap-2'>
              {isLoading
                ? Array.from({ length: 4 }).map((_val, idx) => {
                    return <Skeleton.ThreadsCategory key={idx} />
                  })
                : threads.categories.map(({ name, count }, idx) => {
                    return (
                      <RadioCategory
                        key={idx}
                        name={name}
                        value={name}
                        id={`category-${name}`}
                        checkedValue={category}
                        onChange={handleChangeCategory}
                        count={count}
                      />
                    )
                  })}
            </div>
          </div>
          <div className='w-full'>
            {isLoading ? (
              <span>Loading....</span>
            ) : !threads.lists.length > 0 ? (
              <Alert message={threads.error} />
            ) : (
              threads.lists.map((val, idx) => {
                const user = userById(val.ownerId)
                return (
                  <div key={idx}>
                    <h2>{val.title}</h2>
                    <span>oleh {user.name}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default Threads
