<template>
  <div class="diaryContent">

    <div class="page">
      <i class="xi-angle-left" @click="prevPage"></i>{{ page }}<i class="xi-angle-right" @click="nextPage"></i>
    </div>

    <transition-group name="diaries" id="diaries" tag="div">
      <div class="list" v-for="diary in curPageDiaries" :key="diary">
        <div class="point" :style="[{'color': `${colors[diary.result[0].sentiment]}`}]">
          <i class="xi-full-moon"></i>
        </div>

        <div class="info">
          <div class="time">{{ diary.createdAt }}</div>
          <router-link :to="{ name: 'diary', params: { date: curDate, id: diary.diaryIdx } }">
            <h2>{{ diary.title }}</h2>
          </router-link>
        </div>
      </div>

      <div class="empty" v-if="!curPageDiaries.length">
        <h2>There is no written diary.<br>Write a new diary.</h2>
      </div>
    </transition-group>

  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    date: Object
  },
  setup(props, { emit }) {
    const store = useStore()
    const page = ref(1)
    const curDate = computed(() => props.date.date)
    const curDateDiaries = computed(() => store.getters.getCurDateDiaries(curDate.value))
    const curPageDiaries = computed(() => curDateDiaries.value.slice(8 * (page.value - 1), 8 * page.value))
    const colors = { happy: '#feebc8', sad: '#c3dafe', angry: '#fed7d7' }

    watch(curDate, () => {
      page.value = 1
    })

    const nextPage = () => {
      if (page.value <= parseInt(curDateDiaries.value.length / 8)) {
        page.value++
      }
    }

    const prevPage = () => {
      if (page.value > 1) {
        page.value--
      }
    }

    return {
      page,
      curDate,
      curDateDiaries,
      curPageDiaries,
      colors,
      nextPage,
      prevPage
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.diaryContent {
  .page {
    font-weight: 700;
    font-size: 14px;
    color: #adadad;
    text-align: right;
    margin: 40px 26px -25px 0;

    i {
      margin: 0 10px;
      color: #dedede;
      font-weight: bold;
    }
  }

  #diaries {
    .list {
      margin: 0px 40px;
      border-bottom: 1px solid #e3e3e3;
      display: flex;
      direction: row;

      .point {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        font-size: 12px;
      }

      h2 {
        font-size: 16px;
        font-style: italic;
        color: #999999;
        letter-spacing: 0.09em;
        margin: 15px 0 30px;
        font-weight: 600;
      }

      .time {
        font-size: 14px;
        color: #bebebe;
        font-weight: 500;
        letter-spacing: 0.05em;
        margin-top: 30px;
      }
    }

    .list:nth-last-child(1) {
      border: 0;
    }

    .empty {
      display: grid;
      place-items: center;
      min-height: 65vh;
      text-align: center;

      h2 {
       font-size:20px;
       color:#999;
      }
    }


  }

  .diaries-enter-active {
    transition: all 0.5s;
  }

  .diaries-enter-from,
  .diaries-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>