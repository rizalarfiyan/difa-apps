import { Alert, MainContainer, Skeleton } from '@components'
import { FILTER } from '@constants'
import { useEffectOnce, useNotification } from '@hooks'
import { titleCase } from '@utils'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import services from '../services'
import slice from '../slice'

function Threads() {
  const [ApiThreads, { isLoading }] = services.useGetThreadsMutation()
  const notification = useNotification()
  const rawThreads = useSelector(slice.state)
  const [category, setCategory] = useState(FILTER.all)

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }

  const threads = useMemo(() => {
    const lists = rawThreads?.lists || []
    const categories = [FILTER.all, ...(rawThreads?.categories || [])].map(
      (val) => ({
        name: val,
        checked: val === category,
      })
    )
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
    } catch (err) {
      notification.error(err)
    }
  })

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
                : threads.categories.map((val, idx) => {
                    return (
                      <div key={idx}>
                        <input
                          type='radio'
                          id={`category-${val.name}`}
                          name='category'
                          value={val.name}
                          className='peer hidden'
                          checked={val.checked}
                          onChange={handleChangeCategory}
                        />
                        <label
                          htmlFor={`category-${val.name}`}
                          className='block w-full cursor-pointer rounded-md border-2 border-gray-300 bg-white py-2 px-3 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 peer-checked:border-blue-500 peer-checked:text-blue-700'
                        >
                          {titleCase(val.name)}
                        </label>
                      </div>
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
                return <div key={idx}>{val.title}</div>
              })
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default Threads
