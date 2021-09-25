export default {
  reducedDiaries: (state) => {
    const diaries = state.diaries.map(diary => {
      const newDiary = {}
      for (const p in diary) {
        newDiary[p] = diary[p]
      }
      newDiary.content = (diary.content || '').replace(/<[^>]*>/g, '').slice(0, 100) + '......'
      return newDiary
    })
    return diaries
  },
  
  allTags: (state) => {
    state.tags.unshift('all')
    return state.tags
  }
}