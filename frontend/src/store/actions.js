import axios from '../services/axios'
import router from '../router'

const beginLoading = (commit) => {
  commit('isLoadingToggle', true)
  return Date.now()
}

const endLoading = (commit, startTime, toggle) => {
  const leftTime = 500 - (Date.now() - startTime)
  leftTime > 0 ? setTimeout(commit(toggle, false), leftTime) : commit(toggle, false)
}

export default {
  async login ({ commit }, payload) {
    try {
      return await axios.post('/app/users/log-in', payload)
    } catch (err) {
      console.log(err)
    }
  },

  logout({ commit }) {
    commit('unsetUser')
    router.push({ name: 'login' })
  },

  async signUp({ commit }, payload) {
    try {
      return await axios.post('/app/users/sign-up', payload)
    } catch (err) {
      console.log(err)
    }
  },

  async getAccount({ commit }, uid) {
    try {
      return await axios.get(`/app/account/${uid}`)
    } catch (err) {
      console.log(err)
    }
  },
  
  async editAccount ({ commit }, payload) {
    try {
      return await axios.put('/app/account', payload)
    } catch (err) {
      console.log(err)
    }
  },

  async delAccount({ commit }, payload) {
    try {
      return await axios.delete('/app/account', { data: payload })
    } catch (err) {
      console.log(err.message)
    }
  },

  refreshToken({ commit }, accessToken) {
    commit('refreshToken', accessToken)
  },

  async getDiaries ({ commit }, payload) {
    try {
      const startTime = beginLoading(commit)
      if (payload.value) { commit('isLoadingToggle', false) }
      const response = await axios.get('/app/diaries', { params: { payload } })
      commit('setDiaries', response.data.diaries)
      endLoading(commit, startTime, 'isLoadingToggle')
    } catch (err) {
      console.log(err)
    }
  },

  async getDiary ({ commit, state }, id) {
    try {
      const startTime = beginLoading(commit)
      if (router.currentRoute.value.hash) {
        commit('isLoadingToggle', false)
      }
      document.title = 'Loading...'
      const response = await axios.get(`/app/diary/${id}`)
      commit('setDiary', response.data)
      document.title = state.diary.title
      endLoading(commit, startTime, 'isLoadingToggle')
    } catch (err) {
      console.log(err)
    }
  },

  async saveDiary ({ state, commit }, id) {
    try {
      commit('isSavingToggle', false)
      if (id) {
        const response = await axios.put(`/app/diary/${id}`, state.diary)
        commit('isSavingToggle', true)
        return response
      } else {
        const response = await axios.post('/app/diary', state.diary)
        commit('isSavingToggle', true)
        return response
      }
    } catch (err) {
      console.log(err)
    }
  },

  async delDiary ({ commit }, payload) {
    try {
      const response = await axios.delete(`/app/diary/${payload.id}`)
      return response
    } catch (err) {
      console.log(err)
    }
  }

  /*
  async searchDiaries ({ commit }, payload) {
    try {
      document.title = 'Searching...'
      commit('moreDiaryToggle', true)
      const startTime = beginLoading(commit, payload.id)
      const response = await axios.get('/app/someDiaries', { params: { payload } })
      if (!response.data.diaries.length) {
        commit('moreDiaryToggle', false)
        commit('noMoreDiaryToggle', true)
      } else {
        commit('noMoreDiaryToggle', false)
      }
      if (payload.add) {
        commit('addDiaries', response.data.diaries)
        endLoading(commit, startTime, 'loadMoreToggle')
      } else {
        commit('setDiaries', response.data.diaries)
        endLoading(commit, startTime, 'isLoadingToggle')
      }
      document.title = 'Searched diaries'
    } catch (err) {
      console.log(err)
    }
  }
  */
}