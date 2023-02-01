import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.mutation({
      query: () => ({
        url: 'threads',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Thread', id })),
        { type: 'Thread', id: 'LIST' },
      ],
    }),
    addThread: builder.mutation({
      query: (body) => ({
        url: 'threads',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Thread', id: 'LIST' }],
    }),
    getThread: builder.mutation({
      query: () => ({
        url: 'thread',
        method: 'GET',
      }),
      providesTags: (_thread, _err, id) => [{ type: 'Thread', id }],
    }),
  }),
})

export default services
