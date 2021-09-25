import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

export default createStore({
  strict: true,
  state: {
    user: {},
    diary: {},
    diaries: [],
    comments: [],
    tag: '',
    tags: [],
    isLoading: false,
    isSaving: false,
    loadMore: false,
    moreDiary: true,
    noMoreDiary: false,
    headline: {},
    dialog: {
      show: false,
      hasTwoBtn: false,
      info: 'Loading...',
      resolveFn: () => {},
      rejectFn: () => {}
    }
  },
  getters,
  actions,
  mutations
})
