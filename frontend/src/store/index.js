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
      email: 'eee@email.com'
    },
    diary: {
      title: 'testDiary1',
      content: 'testContent',
      author: 'author',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    diaries: [
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        title: 'testDiary1',
        content: 'testContent',
        author: 'author',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ],
    comments: [],
    tag: '',
    tags: [],
    isLoading: false,
    isSaving: false,
    loadMore: false,
    moreDiary: true,
    noMoreDiary: false,
    dialog: {
      show: false,
      hasTwoBtn: false,
      info: '',
      resolveFn: () => {},
      rejectFn: () => {}
    }
  },
  getters,
  actions,
  mutations
})
