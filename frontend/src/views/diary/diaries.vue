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

        <div class="today">
          <h2><span>Today's</span> date is <span>2021, November 7</span></h2>
        </div>
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
    const year = ref(new Date().getFullYear())
    const diaries = computed(() => store.state.diaries)
    const isLoading = computed(() => store.state.isLoading)
    const colors = ['red', 'orange', 'green', 'blue', 'pink', 'indigo', 'purple', 'yellow']
    const attributes = computed(() =>
      store.state.diaries.map((diary, index) => ({
        dates: diary.createdAt,
        highlight: { color: colors[index % 8], fillMode: 'light' },
        popover: { label: diary.title, visibility: 'click' }
      }))
    )
    
    const pageChange = (obj) => {
      year.value = obj.year
      month.value = obj.month

      console.log(year.value)
      console.log('month:', month.value)
      // store.dispatch('getDiaries', { page: page.value, date: obj.month, limit: 8 })
    }

    const nextPage = () => {
      page.value++
      // store.dispatch('getDiaries', { page: page.value, date: month.value, limit: 8 })
    }

    const prevPage = () => {
      page.value--
      // store.dispatch('getDiaries', { page: page.value, date: month.value, limit: 8 })
    }

    return {
      page,
      year,
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
  margin:50px 0;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .today {
    width:100%;

    h2 {
      margin:0 80px !important;
      padding-top:50px;
      border-top:1px solid #ddd;
      text-align: center;
      font-size:17px;
      color:#bebebe;
      font-weight:400;
      
      span:nth-child(1) {
        color:var(--point);
      }
      span:nth-child(2) {
        font-weight: 500;
        color:#adacac;
      }
    }
  }
}

.content {
  background:#fff;
  margin-left:5px;
  width:100%;
  overflow: auto;
}
</style>