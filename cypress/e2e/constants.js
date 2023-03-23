const { ROUTE, SKELETON } = require('../../src/constants')

const element = {
  name: 'form input[name="name"]',
  email: 'form input[name="email"]',
  password: 'form input[name="password"]',
  passwordConfirmation: 'form input[name="password_confirmation"]',
  button: 'form button',
  error: ' ~ div p',
  notification: '#notifications > div > *',
  dropdown: '#user-dropdown',
  title: 'form input[name="title"]',
  category: 'form input[name="category"]',
  content: 'form textarea[name="content"]',
}

const data = {
  email: 'admin@admin.com',
  password: 'password',
  name: `User ${+new Date()}`,
  uniqEmail: `difa.${+new Date()}@gmail.com`,
  title: `Thread ${+new Date()}`,
  category: 'general',
  content: 'This is a content from testing',
}

const endpoint = {
  login: /v1\/login$/gm,
  register: /v1\/register$/gm,
  me: /v1\/users\/me$/gm,
  threads: /v1\/threads$/gm,
  threadsUp: /v1\/threads\/(thread-.*)\/up-vote$/gm,
  threadsDown: /v1\/threads\/(thread-.*)\/down-vote$/gm,
  threadsNeutral: /v1\/threads\/(thread-.*)\/neutral-vote$/gm,
  users: /v1\/users$/gm,
  leaderboards: /v1\/leaderboards$/gm,
}

module.exports = {
  element,
  data,
  endpoint,
  skeleton: SKELETON,
  route: ROUTE,
}
