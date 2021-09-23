import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

const beginLoading = (commit, add) => {
  add ? commit('loadMoreToggle', true) : commit('isLoadingToggle', true)
  return Date.now()
}

const endLoading = (commit, startTime, toggle) => {
  const leftTime = 500 - (Date.now() - startTime)
  leftTime > 0 ? setTimeout(commit(toggle, false), leftTime) : commit(toggle, false)
}

export default {
  async login ({ commit }, payload) {
    try {
      return await axios.post(API_URL + '/login', payload)
    } catch (err) {
      console.log(err)
    }
  },

  logout({ commit }) {
    localStorage.clear()
    commit('unsetUser')
  },

  async signUp({ commit }, payload) {
    try {
      await axios.post(API_URL + '/sign-up', payload)
      return await this.login({ commit }, { userId: payload.userId, password: payload.password })
    } catch (err) {
      console.log(err)
    }
  },

  async editAccount ({ commit }, payload) {
    try {
      await axios.post(API_URL, payload)
      return this.logout({ commit })
    } catch (err) {
      console.log(err)
    }
  },

  async delAccount({ commit }, payload) {
    try {
      await axios.delete(API_URL, { data: payload })
      return this.logout({ commit })
    } catch (err) {
      console.log(err.message)
    }
  },

  async saveDiary ({ state, commit }, payload) {
    try {
      commit('isSavingToggle', false)
      if (payload) {
        const response = await axios.put(`${API_URL}/diary/${payload}`, state.diary)
        commit('isSavingToggle', true)
        return response.data
      } else {
        const response = await axios.post(`${API_URL}/diary`, state.diary)
        commit('isSavingToggle', true)
        return response.data
      }
    } catch (err) {
      console.log(err)
    }
  },

  async getDiaries ({ commit }, payload) {
    try {
      commit('moreDiaryToggle', true)
      const startTime = beginLoading(commit, payload.add)
      if (payload.value) {
        commit('isLoadingToggle', false)
      }
      const response = await axios.get(API_URL + '/diaries', { params: { payload } })
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
    } catch (err) {
      console.log(err)
    }
  }
}