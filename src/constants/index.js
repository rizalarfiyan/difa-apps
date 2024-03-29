const APP_NAME = 'DIFA Apps'
const API_BASE_URL = 'https://forum-api.dicoding.dev/v1'

const ROUTE = {
  login: '/login',
  register: '/register',
  threads: '/',
  createThread: '/new',
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

const SKELETON = {
  leaderboards: 10,
  category: 4,
  threads: 4,
}

export {
  APP_NAME,
  API_BASE_URL,
  ROUTE,
  STORAGE_KEY,
  COMPONENTS,
  MODE,
  FILTER,
  SKELETON,
}
