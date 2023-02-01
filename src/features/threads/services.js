import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    threads: builder.mutation({
      query: () => ({
        url: 'threads',
        method: 'GET',
      }),
    }),
    create: builder.mutation({
      query: (body) => ({
        url: 'threads',
        method: 'POST',
        body,
      }),
    }),
    detail: builder.mutation({
      query: () => ({
        url: 'thread',
        method: 'GET',
      }),
    }),
  }),
})

export default services
