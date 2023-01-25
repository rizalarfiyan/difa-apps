const APP_NAME = 'DIFA Apps'
const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'

const ROUTE = {
  login: '/login',
  register: '/register',
  threads: '/',
  threadDetail: '/threads/:id',
  leaderboards: '/leaderboards',
}

const STORAGE_KEY = {
  token: 'token',
}

export { APP_NAME, API_BASE_URL, ROUTE, STORAGE_KEY }
