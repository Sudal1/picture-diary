import dayjs from 'dayjs'

export default {
  getDiariesFormated: (state) => {
    const diaries = state.diaries.map(diary => {
      const newDiary = {}
      for (const p in diary) { newDiary[p] = diary[p] }
      newDiary.content = diary.content.replace(/<[^>]*>/g, '').slice(0, 50) + '......'
      newDiary.createdAt = dayjs(diary.createdAt).format('YYYY.MM.DD A HH:mm')
      return newDiary
    })
    return diaries
  }
}