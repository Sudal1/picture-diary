export default {
  // user
  setUser: (state, data) => {
    localStorage.setItem('access_token', data.token.accessToken)
    localStorage.setItem('refresh_token', data.token.refreshToken)
    localStorage.setItem('user_id', data.user.userId)

    state.user = data.user
  },

  unsetUser: (state) => {
    localStorage.clear()
    state.user = {}
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

  updateDiary: (state, data) => {
    const newDiaries = [...state.diaries]
    const idx = state.diaries.findIndex((diary) => diary.id === data.id)
    if (idx !== -1) { newDiaries[idx] = data }
    state.diaries = newDiaries
  },

  unsetDiary: (state, data) => {
    const newDiaries = [...state.diaries]
    const idx = state.diaries.findIndex((diary) => diary.id === data.id)
    if (idx !== -1) { newDiaries.splice(idx, 1) }
    state.diaries = newDiaries
  },

  // tags
  setTag: (state, tag) => {
    state.tag = tag
  },
  setTags: (state, tags) => {
    state.tags = tags
  },

  // toggle
  isSavingToggle: (state, flag) => {
    state.isSaving = flag
  },

  isLoadingToggle: (state, flag) => {
    state.isLoading = flag
  },

  loadMoreToggle: (state, flag) => {
    state.loadMore = flag
  },

  moreDiaryToggle: (state, flag) => {
    state.moreDiary = flag
  },

  noMoreDiaryToggle: (state, flag) => {
    state.noMoreDiary = flag
  },

  setHeadline: (state, data) => {
    state.headline = data
  },

  // comment
  setComments: (state, data) => {
    state.comments = [...data]
  },

  // dialog
  setDialog: (state, data) => {
    state.dialog = data
    state.dialog.resolveFn = () => {}
    state.dialog.rejectFn = () => {}
  }
}