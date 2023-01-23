import { api } from '@lib'

const services = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
    userInfo: builder.mutation({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
    }),
  }),
})

export default services
