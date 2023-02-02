const APP_NAME = 'DIFA Apps'
const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'

const ROUTE = {
  login: '/login',
  register: '/register',
  threads: '/',
  threadDetail: '/thread/:id',
  leaderboards: '/leaderboards',
}

const STORAGE_KEY = {
  token: 'token',
  theme: 'theme',
}

const COMPONENTS = {
  notification: {
    duration: 3000,
    type: {
      success: 'success',
      error: 'error',
      info: 'info',
      warning: 'warning',
    },
  },
}

const MODE = {
  dark: 'dark',
  light: 'light',
}

const FILTER = {
  all: 'All',
}

export { APP_NAME, API_BASE_URL, ROUTE, STORAGE_KEY, COMPONENTS, MODE, FILTER }
