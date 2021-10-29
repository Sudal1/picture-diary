import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

export default createStore({
  strict: true,
  state: {
    user: {
      userId: 'hihi',
      name: 'test',
      email: 'emailemailmdskfgjns@email.com'
    },
    diary: {
      id: 1,
      title: 'testDiary1',
      content: 'testContent',
      author: 'author',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    diaries: [
      {
        id: 1,
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: 2,
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ],
    isLoading: false,
    isSaving: false,
    loadMore: false,
    moreDiary: true,
    noMoreDiary: false
  },
  getters,
  actions,
  mutations
})
