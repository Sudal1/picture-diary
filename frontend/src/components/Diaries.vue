<template>
  <div class="diaryContent">

    <div id="diaries">
      <div v-for="(diary, index) in reducedDiaries" :key="index">
        <router-link :to="{ name: 'diary', params: { id: diary.id } }">
          <h2>{{ diary.title }}</h2>
        </router-link>
        <time>{{ diary.createdAt }}</time>
        <time>{{ diary.updatedAt }}</time>
        <p>{{ diary.content }}</p>
      </div>

      <p v-if="!state.loadMore" v-show="!state.noMoreDiary" class="noMore"></p>
      <p v-if="state.noMoreDiary" class="noMore">No more content</p>

    </div>
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
  #diaries {
    flex-direction: row;

    div {
      width: 100%;
      background: #d9daff;
      border-radius: 15px;
      margin-bottom: 1.875rem;
      padding: 1.7rem 1.7rem;

      h2 {
        margin-bottom: 1.25rem;
      }

      time {
        margin-top: 0.625rem;
        margin-right: 0.625rem;
      }

      p {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin-top: 1.875rem;
      }
    }

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