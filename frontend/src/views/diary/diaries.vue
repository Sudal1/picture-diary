<template>
  <div class="diaries">
    <div class="wrapper">

      <div class="calendar">
        <v-calendar
          locale="en-US"
          :max-date="new Date()"
          :attributes="attributes"
          @update:fromPage="pageChange"
        />
      </div>

      <div class="content">
        <spinner v-show="isLoading" class="spinner"></spinner>
        <diary-content
          v-show="!isLoading"
          :modelValue="month"
          @update:onNextPage="nextPage"
          @update:onPrevPage="prevPage"
        ></diary-content>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import DiaryContent from '../../components/Diaries.vue'
import Spinner from '../../components/Spinner.vue'

export default {
  name: 'diaries',
  components: {
    DiaryContent,
    Spinner
  },
  setup() {
    const store = useStore()
    const page = ref(1)
    const month = ref(new Date().getMonth())
    const diaries = computed(() => store.state.diaries)
    const isLoading = computed(() => store.state.isLoading)
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
      // store.dispatch('getDiaries', { page: page.value, date: obj.month, limit: 8 })
    }

    const nextPage = () => {
      page.value++
      store.dispatch('getDiaries', { page: page.value, date: month.value, limit: 8 })
    }

    const prevPage = () => {
      page.value--
      store.dispatch('getDiaries', { page: page.value, date: month.value, limit: 8 })
    }

    return {
      page,
      month,
      diaries,
      isLoading,
      attributes,
      pageChange,
      nextPage,
      prevPage
    }
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
  width: 250px;
  height: 250px;
}

.content {
  background:#fff;
  margin-left:5px;
  width:100%;
  overflow: auto;
}
</style>