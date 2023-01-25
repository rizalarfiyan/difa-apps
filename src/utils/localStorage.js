const storage = {
  hasValid: typeof window !== 'undefined' && typeof Storage !== 'undefined',
  get: (key, isJson = false) => {
    if (!storage.hasValid) throw new Error('Local Storage not avaliable!')
    const data = window.localStorage.getItem(key)
    if (isJson) return JSON.parse(data)
    return data
  },
  set: (key, value, isJson = false) => {
    if (!storage.hasValid) throw new Error('Local Storage not avaliable!')
    window.localStorage.setItem(key, isJson ? JSON.stringify(value) : value)
  },
  remove: (key) => {
    if (!storage.hasValid) throw new Error('Local Storage not avaliable!')
    window.localStorage.removeItem(key)
  },
  clear: () => {
    if (!storage.hasValid) throw new Error('Local Storage not avaliable!')
    window.localStorage.clear()
  },
}

export default storage
