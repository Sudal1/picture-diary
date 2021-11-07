<template>
  <div class="wrapper">

    <div class="calendar">
      <v-calendar
        is-expanded
        locale="en-US"
        @update:fromPage="pageChange"
        :max-date="new Date()"
        :attributes="attributes" />
    </div>

    <div class="content">
      <diary-content :modelValue="month"></diary-content>
    </div>

    <div class="btns">
      <router-link :to="{ name: 'editor' }" class="write">
        <button>Write</button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import DiaryContent from '../../components/Diaries.vue'

export default {
  name: 'diaries',
  components: {
    DiaryContent
  },
  setup() {
    const store = useStore()
    const page = ref(1)
    const month = ref(new Date().getMonth())
    const diaries = computed(() => store.state.diaries)
    const attributes = computed(() =>
      store.state.diaries.map(diary => ({
        dates: diary.createdAt,
        highlight: { color: 'green', fillMode: 'light' },
        popover: { label: diary.title, visibility: 'click' }
      }))
    )
    
    const pageChange = (obj) => {
      month.value = obj.month
      console.log('month:', month.value)
      // this.getDiaries({ page: page, date: obj.month, limit: 10 })
    }

    // this.getDiaries({ page: page, date: date, limit: 10 })

    return { page, month, attributes, diaries, pageChange }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

.calendar {
}

.content {
}

.btns {
}
</style>