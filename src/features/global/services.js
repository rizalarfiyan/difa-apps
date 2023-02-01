import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        ...result.map((val) => ({ type: 'User', id: val.user.id })),
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
})

export default services
