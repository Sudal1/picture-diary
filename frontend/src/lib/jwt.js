export function tokenAlive(exp) {
  if (Date.now() >= exp * 1000) { return false }
  return true
}

export function authHeader(type) {
  const accessToken = localStorage.getItem('access_token')

  if (accessToken && type) {
    return { 'x-access-token': accessToken, 'Content-Type': type }
  } else if (accessToken) {
    return { 'x-access-token': accessToken }
  } else {
    return { 'x-access-token': null }
  }
}