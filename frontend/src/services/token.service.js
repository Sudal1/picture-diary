class TokenService {
  getRefreshToken() {
    const refreshToken = sessionStorage.getItem('refresh_token')
    return refreshToken
  }

  getAccessToken() {
    const accessToken = sessionStorage.getItem('access_token')
    return accessToken
  }

  updateAccessToken(token) {
    sessionStorage.setItem('access_token', token)
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  setUser(user) {
    console.log(JSON.stringify(user))
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    sessionStorage.removeItem('user')
  }
}

export default new TokenService()