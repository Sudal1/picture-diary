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
      return await axios.get(`/app/users/${uid}`)
    } catch (err) {
      console.log(err)
    }
  },
  
  async editAccount ({ commit, state }, payload) {
    try {
      const uid = state.user.userIdx || sessionStorage.getItem('user')
      return await axios.patch(`/app/users/${uid}`, payload)
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

  async getDiaries ({ commit, state }) {
    try {
      const uid = state.user.userIdx || sessionStorage.getItem('user')
      const startTime = beginLoading(commit)
      const response = await axios.get(`/app/diaries/${uid}`)
      commit('setDiaries', response.data)
      commit('setSortedDiaries')
      commit('isUpdatedToggle', true)
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

  async saveDiaryInMachine ({ state, commit }) {
    try {
      commit('isSavingToggle', false)
      let diary = { ...state.diary }
      diary.content = diary.content.replace(/<[^>]*>/g, '')
      diary = JSON.stringify(diary)
      const response = await axios.post('/predict', JSON.parse(diary))
      commit('isSavingToggle', true)
      return response
    } catch (err) {
      console.log(err)
    }
  },

  async saveDiary ({ state, commit }, id) {
    try {
      commit('isSavingToggle', false)
      const uid = state.user.userIdx || sessionStorage.getItem('user')
      let response = null
      let diary = { ...state.diary }
      diary.userIdx = uid
      diary.tags = [...state.diary.tags].join(',')
      diary.result.forEach(elem => { diary[elem.sentiment] = elem.percent })
      delete diary.result
      diary = JSON.stringify(diary)
      id
        ? response = await axios.patch(`/app/diaries/${uid}/${id}`, JSON.parse(diary))
        : response = await axios.post(`/app/diaries/${uid}`, JSON.parse(diary))
      commit('isSavingToggle', true)
      commit('isUpdatedToggle', false)
      return response
    } catch (err) {
      console.log(err)
    }
  },

  async delDiary ({ commit, state }, id) {
    try {
      const uid = state.user.userIdx || sessionStorage.getItem('user')
      const response = await axios.delete(`/app/diaries/${uid}/${id}`)
      commit('isUpdatedToggle', false)
      return response
    } catch (err) {
      console.log(err)
    }
  }
}