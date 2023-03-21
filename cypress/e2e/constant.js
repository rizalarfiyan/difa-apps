const { ROUTE } = require('../../src/constants')

const element = {
  email: 'form input[type="email"]',
  password: 'form input[type="password"]',
  button: 'form button',
  error: ' ~ div p',
  notification: '#notifications > div > *',
  dropdown: '#user-dropdown',
}

const data = {
  email: 'admin@admin.com',
  password: 'password',
}

const endpoint = {
  login: /v1\/login$/gm,
  me: /v1\/users\/me$/gm,
  threads: /v1\/threads$/gm,
  users: /v1\/users$/gm,
}

module.exports = {
  element,
  data,
  endpoint,
  route: ROUTE,
}
