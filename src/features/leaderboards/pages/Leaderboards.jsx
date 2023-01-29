import { MainContainer } from '@components'
import React from 'react'

function Leaderboards() {
  const leaderboards = [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=admin&background=random',
      },
      score: 10,
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=admin&background=random',
      },
      score: 5,
    },
  ]

  return (
    <MainContainer>
      <div className='container'>
        <div className='mx-auto max-w-3xl'>
          <div className='relative mb-12 flex items-start justify-center'>
            <h1 className='text-2xl font-semibold text-gray-700'>
              Leaderboards of active users
            </h1>
            <div className='my-auto ml-4 flex-grow border-t border-gray-400' />
          </div>
          <div className='flex flex-col gap-3'>
            {leaderboards.map((val, idx) => {
              return (
                <div
                  key={idx}
                  className='flex items-center justify-between rounded-md border-2 border-transparent bg-white p-3 shadow-lg transition-colors duration-300 hover:border-blue-500'
                >
                  <div className='flex items-center gap-3'>
                    <span className='py-4 px-2 text-xl font-semibold text-gray-700'>
                      {idx + 1}
                    </span>
                    <div className='h-16 w-16 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-400'>
                      <img src={val.user.avatar} alt={val.user.name} />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-700'>
                        {val.user.name}
                      </h3>
                      <span className='text-sm text-gray-500'>
                        {val.user.email}
                      </span>
                    </div>
                  </div>
                  <div className='mr-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 font-semibold text-blue-500'>
                    {val.score}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default Leaderboards
