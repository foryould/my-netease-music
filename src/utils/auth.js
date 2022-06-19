export function setToken(token) {
  localStorage.setItem('token', token)
}
export function getToken() {
  return localStorage.getItem('token')
}
export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}
