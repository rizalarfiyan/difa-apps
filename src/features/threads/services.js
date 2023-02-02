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
      query: (id) => ({
        url: `threads/${id}`,
        method: 'GET',
      }),
      providesTags: (_thread, _err, id) => [{ type: 'Thread', id }],
    }),
    upVoteThread: builder.mutation({
      query: (id) => ({
        url: `threads/${id}/up-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [{ type: 'Thread', id: `up-${id}` }],
    }),
    downVoteThread: builder.mutation({
      query: (id) => ({
        url: `threads/${id}/down-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [
        { type: 'Thread', id: `down-${id}` },
      ],
    }),
    neutralVoteThread: builder.mutation({
      query: (id) => ({
        url: `threads/${id}/neutral-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [
        { type: 'Thread', id: `neutral-${id}` },
      ],
    }),
    addComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `threads/${id}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Thread', id: 'LIST' }],
    }),
    upCommentThread: builder.mutation({
      query: (threadId, commentId) => ({
        url: `threads/${threadId}/comments/${commentId}/up-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [
        { type: 'Thread', id: `comment-up-${id}` },
      ],
    }),
    downCommentThread: builder.mutation({
      query: (threadId, commentId) => ({
        url: `threads/${threadId}/comments/${commentId}/down-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [
        { type: 'Thread', id: `comment-down-${id}` },
      ],
    }),
    neutralCommentThread: builder.mutation({
      query: (threadId, commentId) => ({
        url: `threads/${threadId}/comments/${commentId}/neutral-vote`,
        method: 'POST',
      }),
      providesTags: (_thread, _err, id) => [
        { type: 'Thread', id: `comment-neutral-${id}` },
      ],
    }),
  }),
})

export default services
