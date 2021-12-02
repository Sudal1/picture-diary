import dayjs from 'dayjs'

export default {
  // user
  setUser: (state, data) => {
    sessionStorage.setItem('access_token', data.result['x_access_token'])
    sessionStorage.setItem('user', data.result.userIdx)
    state.user = { idx: data.result.userIdx }
  },

  setUserInfo: (state, data) => {
    state.status.loggedIn = true
    state.user = data
  },

  unsetUser: (state) => {
    sessionStorage.clear()
    state.status.loggedIn = false
    state.user = {}
  },

  refreshToken(state, accessToken) {
    state.status.loggedIn = true
    state.user = { ...state.user, accessToken: accessToken }
  },

  // diary
  setDiary: (state, diary) => {
    state.diary = diary
  },

  setDiaryKeywordIcon: (state, diary) => {
    for (const keyword of diary.result) {
      if (keyword.sentiment === 'happy') {
        keyword.icon = 'xi-emoticon-happy-o'
      } else if (keyword.sentiment === 'sad') {
        keyword.icon = 'xi-emoticon-sad-o'
      } else {
        keyword.icon = 'xi-emoticon-devil-o'
      }
    }
  },

  setDiaries: (state, diaries) => {
    state.diaries = diaries
  },

  setSortedDiaries: (state) => {
    state.sortedDiaries = {}
    for (const diary of state.diaries) {
      diary.result.sort((a, b) => b.percent - a.percent)
      const createdAt = dayjs(diary.createdAt).format('YYYY-MM')
      state.sortedDiaries[createdAt]
        ? state.sortedDiaries[createdAt].push(diary)
        : state.sortedDiaries[createdAt] = [diary]
    }
  },

  addDiaries: (state, diaries) => {
    state.diaries = state.diaries.concat(diaries)
  },

  addDiaryResult: (state, data) => {
    state.diary.vid = data.vid
    state.diary.sentiment = data.sentiment
    state.diary.result = data.result
  },

  changeDiaryToSend: (state) => {
    state.diary.userIdx = state.user.userIdx || sessionStorage.getItem('user')
    state.diary.result.forEach(elem => {
      state.diary[elem.sentiment] = elem.percent
    })
  },

  changeDiaryToReceive: (state, data) => {
    state.diary.result = [
      { setiment: 'happy', percent: data.happy },
      { sentiment: 'sad', percent: data.sad },
      { sentiment: 'angry', percent: data.angry }
    ]
  },

  setDiaryTitle: (state, title) => {
    state.diary.title = title
  },
  
  setDiaryContent: (state, content) => {
    state.diary.content = content
  },

  setDiaryTags: (state, tags) => {
    state.diary.tags = tags
  },

  updateDiaryTitle: (state, title) => {
    state.diary.title = state.diary.title + title
  },

  updateDiaryContent: (state, content) => {
    state.diary.content = state.diary.content + content
  },

  updateDiaryTags: (state, tag) => {
    state.diary.tags.push(tag.replace(/,/g, ''))
  },

  unsetDiary: (state, data) => {
    const newDiaries = [...state.diaries]
    const idx = state.diaries.findIndex((diary) => diary.id === data.id)
    if (idx !== -1) { newDiaries.splice(idx, 1) }
    state.diaries = newDiaries
  },

  unsetDiaryTag: (state, index) => {
    state.diary.tags.splice(index, 1)
  },

  // toggle
  isLoadingToggle: (state, flag) => {
    state.isLoading = flag
  },

  isSavingToggle: (state, flag) => {
    state.isSaving = flag
  }
}