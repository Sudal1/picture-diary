<template>
  <div class="diaryContent">

    <div class="page">
      <i class="xi-angle-left" @click="prevPage"></i>{{ page }}<i class="xi-angle-right" @click="nextPage"></i>
    </div>

    <div id="diaries">
      <div class="list" v-for="(diary, index) in curPageDiaries" :key="index">
        <div class="point">
          <i class="xi-full-moon"></i>
        </div>

        <div class="info">
          <div class="time">{{ diary.createdAt }}</div>
          <router-link :to="{ name: 'diary', params: { id: diary.diaryIdx } }">
            <h2>{{ diary.title }}</h2>
          </router-link>
        </div>
      </div>
    </div>

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

    watch(curDate, () => { page.value = 1 })

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
      curPageDiaries,
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
    color:#adadad;
    text-align:right;
    margin:40px 26px -25px 0;

    i {
      margin: 0 10px;
      color: #dedede;
      font-weight: bold;
    }
  }
  #diaries {
    .list {
      margin: 0px 40px;
      border-bottom:1px solid #e3e3e3;
      display: flex;
      direction: row;
      $colors: #fed7d7, #feebc8, #c6f6d5, #bee3f8, #fed7e2, #c3dafe, #e9d8fd, #fefcbf;
      @each $item in $colors {
        $index: index($colors, $item);
        &:nth-child(#{$index}) {
          color: $item;
        }
      }

      .point {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        font-size:12px;
      }

      h2 {
        font-size:16px;
        font-style: italic;
        color:#999999;
        letter-spacing: 0.09em;
        margin:15px 0 30px;
        font-weight:600;
      }

      .time {
        font-size:14px;
        color:#bebebe;
        font-weight: 500;
        letter-spacing: 0.05em;
        margin-top:30px;
      }
    }

  .list:nth-last-child(1) { border:0; }

    p.noMore {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      color: #000000;
      margin-top: 1.875rem;
      margin-bottom: 1.875rem;
      text-align: center;
    }
  }
}
</style>