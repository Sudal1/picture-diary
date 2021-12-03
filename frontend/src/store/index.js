import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const user = sessionStorage.getItem('user')

export default createStore({
  strict: true,
  state: {
    user: {},
    status: user ? { loggedIn: true } : { loggedIn: false },
    diary: {},
    diaries: [],
    sortedDiaries: {},
    tag: '',
    tags: [],
    isLoading: false,
    isUpdated: false
  },
  getters,
  actions,
  mutations
})
