import React from 'react'

const classNames = (...args) => args.filter(Boolean).join(' ')

const getYear = () => {
  const currentYear = new Date().getFullYear()
  let yearDate = currentYear
  if (currentYear !== 2023) {
    yearDate = `2023 - ${currentYear}`
  }
  return yearDate
}

const routeReplace = (path, ...url) => {
  const data = Array.from(path.matchAll(/:[^\\/]+/g), (m) => m[0])
  return data.reduce((acc, val, idx) => {
    if (url?.[idx]) {
      return acc.replace(val, url[idx])
    }
    return acc
  }, path)
}

const lazyImport = (factory, name) => {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] }))
    ),
  })
}

const validAuth = (token) => {
  if (!token) return false
  try {
    const getToken = JSON.parse(atob(token.split('.')[1]))
    if (getToken.exp * 1000 < Date.now()) return false
    return true
  } catch (e) {
    return false
  }
}

const serializeQuery = (query) => {
  return `?${Object.keys(query)
    .reduce((acc, val) => {
      acc.push(`${val}=${encodeURIComponent(query[val])}`)
      return acc
    }, [])
    .join('&')}`
}

const getAvatar = (name) => {
  return `https://ui-avatars.com/api/${serializeQuery({
    name,
    background: 'random',
  })}`
}

const titleCase = (str) => {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

const timeAgo = (date) => {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ]
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const interval = intervals.find((i) => i.seconds < seconds)
  const count = Math.floor(seconds / interval.seconds)
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
}

export {
  classNames,
  getYear,
  routeReplace,
  lazyImport,
  validAuth,
  serializeQuery,
  getAvatar,
  titleCase,
  timeAgo,
}
