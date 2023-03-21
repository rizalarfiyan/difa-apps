const { ROUTE } = require('../../src/constants')

const element = {
  name: 'form input[name="name"]',
  email: 'form input[name="email"]',
  password: 'form input[name="password"]',
  passwordConfirmation: 'form input[name="password_confirmation"]',
  button: 'form button',
  error: ' ~ div p',
  notification: '#notifications > div > *',
  dropdown: '#user-dropdown',
}

const data = {
  email: 'admin@admin.com',
  password: 'password',
  name: `User ${+new Date()}`,
  uniqEmail: `difa.${+new Date()}@gmail.com`,
}

const endpoint = {
  login: /v1\/login$/gm,
  register: /v1\/register$/gm,
  me: /v1\/users\/me$/gm,
  threads: /v1\/threads$/gm,
  users: /v1\/users$/gm,
  leaderboards: /v1\/leaderboards$/gm,
}

const page = {
  leaderboards: 10,
}

module.exports = {
  element,
  data,
  endpoint,
  page,
  route: ROUTE,
}
