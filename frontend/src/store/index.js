import { createStore } from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const user = sessionStorage.getItem('user')
const diaries = []
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const hour = date.getHours()
const minute = date.getMinutes()

for (let i = 1; i < 200; i++) {
  diaries.push({
    diaryIdx: String(i),
    title: 'testDiary' + i,
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five.',
    tags: ['tag1', 'tag2', 'tag3'],
    createdAt: new Date(year, (month + i) % 12, i, hour, minute),
    vid: 'PO0vpohz53M',
    sentiment: 'happy',
    result: [{ sentiment: 'happy', percent: 50 }, { sentiment: 'sad', percent: 50 }, { sentiment: 'angry', percent: 50 }]
  })
}

export default createStore({
  strict: true,
  state: {
    user: {},
    status: user ? { loggedIn: true } : { loggedIn: false },
    diary: {},
    diaries: diaries,
    sortedDiaries: {},
    tag: '',
    tags: [],
    isLoading: false,
    isSaving: false
  },
  getters,
  actions,
  mutations
})
