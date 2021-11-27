import axiosInstance from './axios'
import TokenService from './token.service'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getAccessToken()
      if (token) { config.headers.Authorization = 'Bearer' + token }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => { return res },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== '/app/users/log-in' && err.response) {
        // Access token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          
          try {
            const rs = await axiosInstance.post('/app/users/refreshToken', {
              refreshToken: TokenService.getRefreshToken()
            })
            const { accessToken } = rs.data

            store.dispatch('refreshToken', accessToken)
            TokenService.updateAccessToken(accessToken)

            return axiosInstance(originalConfig)
          } catch (error) {
            return Promise.reject(error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
}

export default setup