<template>
  <div class="diaryContent">

    <div class="page">
      <i class="xi-angle-left"></i> 1 <i class="xi-angle-right"></i>
    </div>

    <div id="diaries">

      <div class="list" v-for="(diary, index) in reducedDiaries" :key="index">

        <div class="point">
          <i class="xi-full-moon"></i>
        </div>

        <div class="info">
          <div class="time">{{ diary.createdAt }}</div>
          <router-link :to="{ name: 'diary', params: { id: diary.id } }">
            <h2>{{ diary.title }}</h2>
          </router-link>
        </div>

      </div>

    </div>

    <p v-if="!state.loadMore" v-show="!state.noMoreDiary" class="noMore"></p>
    <p v-if="state.noMoreDiary" class="noMore">No more content</p>

    <spinner v-show="state.loadMore" class="spinner"></spinner>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Spinner from './Spinner.vue'

export default {
  props: {
    modelValue: Number
  },
  components: {
    Spinner
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    
    const page = ref(1)
    const reducedDiaries = computed(() => store.getters.getReducedDiaries)
    const state = reactive({
      isLoading: computed(() => store.state.isLoading),
      loadMore: computed(() => store.state.loadMore),
      moreDiary: computed(() => store.state.moreDiary),
      noMoreDiary: computed(() => store.state.noMoreDiary)
    })

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    // setInterval(() => console.log(props.modelValue), 3000)
    const handleScroll = () => {
      if (!state.isLoading && route.name === 'diaries') {
        const body = document.body
        const totalHeight = body.scrollHeight
        const scrollTop = body.scrollTop
        const clientHeight = window.innerHeight
        if (totalHeight - scrollTop - clientHeight === 0 && state.moreDiary) {
          store.dispatch('getDiaries', {
            date: props.modelValue,
            add: true,
            page: ++page.value
          })
        }
        if (!state.moreDiary) {
          page.value = 1
        }
      }
    }

    return { page, reducedDiaries, state, handleScroll }
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

      .point {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        font-size:12px;
        color: #fee9bf;
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