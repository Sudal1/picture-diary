import dayjs from 'dayjs'

export default {
  getReducedDiaries: (state) => {
    const diaries = state.diaries.map(diary => {
      const newDiary = {}
      for (const p in diary) {
        newDiary[p] = diary[p]
      }
      newDiary.content = diary.content.replace(/<[^>]*>/g, '').slice(0, 100) + '......'
      newDiary.createdAt = dayjs(diary.createdAt).format('YYYY.MM.DD A HH:mm')
      newDiary.updatedAt = dayjs(diary.updatedAt).format('YYYY.MM.DD A HH:mm')
      return newDiary
    })
    return diaries
  }
}