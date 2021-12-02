import dayjs from 'dayjs'

export default {
  getCurDateDiaries: (state) => (date) => {
    if (state.sortedDiaries[date]) {
      const diaries = [...state.sortedDiaries[date]]
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map(diary => {
          const newDiary = {}
          for (const p in diary) {
            newDiary[p] = diary[p]
          }
          newDiary.createdAt = dayjs(diary.createdAt).format('YYYY.MM.DD A HH:mm')
          return newDiary
        })
      return diaries
    } else {
      return []
    }
  }
}