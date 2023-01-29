import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    leaderboards: builder.mutation({
      query: () => ({
        url: 'leaderboards',
        method: 'GET',
      }),
    }),
  }),
})

export default services
