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

function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] }))
    ),
  })
}

export { classNames, getYear, routeReplace, lazyImport }
