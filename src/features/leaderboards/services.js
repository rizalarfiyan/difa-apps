import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.mutation({
      query: () => ({
        url: 'leaderboards',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        ...result.map((val) => ({ type: 'Leaderboard', id: val.user.id })),
        { type: 'Leaderboard', id: 'LIST' },
      ],
    }),
  }),
})

export default services
