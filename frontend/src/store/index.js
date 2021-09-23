import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

export default createStore({
  state: {
    user: {},
    diary: {},
    diaries: [],
    comments: [],
    draft: {},
    drafts: {},
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
