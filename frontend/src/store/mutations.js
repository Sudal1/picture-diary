export default {
  // user
  setUser: (state, data) => {
    sessionStorage.setItem('access_token', data.result.jwt)
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

  setDiaries: (state, diaries) => {
    state.diaries = diaries
  },

  addDiaries: (state, diaries) => {
    state.diaries = state.diaries.concat(diaries)
  },

  setDiaryTitle: (state, title) => {
    state.diary.title = title
  },
  
  setDiaryContent: (state, content) => {
    state.diary.content = content
  },

  updateDiaryTitle: (state, title) => {
    state.diary.title = state.diary.title + title
  },

  updateDiaryContent: (state, content) => {
    state.diary.content = state.diary.content + content
  },

  unsetDiary: (state, data) => {
    const newDiaries = [...state.diaries]
    const idx = state.diaries.findIndex((diary) => diary.id === data.id)
    if (idx !== -1) { newDiaries.splice(idx, 1) }
    state.diaries = newDiaries
  },

  // tag
  setTags: (state, tags) => {
    state.tags = tags
  },

  setTag: (state, tag) => {
    state.tag = tag
  },

  // toggle
  isLoadingToggle: (state, flag) => {
    state.isLoading = flag
  },

  isSavingToggle: (state, flag) => {
    state.isSaving = flag
  }
}