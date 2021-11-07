import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const user = JSON.parse(localStorage.getItem('user'))
const diaries = []
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

for (let i  = 1; i < 9; i++) {
  diaries.push({
    id: i,
    title: 'testDiary' + i,
    content: 'testContent',
    author: 'testName',
    createdAt: new Date(year, month, i + i),
    updatedAt: new Date(year, month, i)
  })
}

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
    diaries: diaries,
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
