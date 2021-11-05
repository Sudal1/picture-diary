import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const user = JSON.parse(localStorage.getItem('user'))

export default createStore({
  strict: true,
  state: {
    user: {
      userId: 'TestId',
      email: 'email@email.com',
      name: 'TestName'
    },
    status: user ? { loggedIn: true } : { loggedIn: false },
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
    draft: {},
    drafts: {},
    tag: '',
    tags: [],
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
