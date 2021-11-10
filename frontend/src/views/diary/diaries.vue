<template>
  <div class="diaries">

    <div class="wrapper">
      <div class="calendar">
        <v-calendar locale="en-US" @update:fromPage="pageChange" :max-date="new Date()"
          :attributes="attributes" />
      </div>

      <div class="content">
        <diary-content :modelValue="month"></diary-content>
      </div>
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
.diaries {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92vh;
}

.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 8px solid;
  border-color: var(--point);
  width: 1194px;
  height: 965px;
}

.calendar {
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vc-container {
  width: 500px;
  height: 500px;
}

.vc-pane {
  min-height: 500px;
}

.content {
  background:#fff;
  margin-left:5px;
  width:100%;
  overflow: auto;
}
</style>