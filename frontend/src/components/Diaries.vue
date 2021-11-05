<template>
  <div class="diaryContent">

    <div id="diaries">
      <div v-for="(diary, index) in getReducedDiaries" :key="index">
        <router-link :to="{ name: 'diary', params: { id: diary.id } }">
          <h2>{{ diary.title }}</h2>
        </router-link>
        <time>{{ diary.createdAt }}</time>
        <time>{{ diary.updatedAt }}</time>
        <p>{{ diary.content }}</p>
      </div>

      <p v-if="!loadMore" v-show="!noMoreDiary" class="noMore"></p>
      <p v-if="noMoreDiary" class="noMore">No more content</p>

    </div>
    <spinner v-show="loadMore" class="spinner"></spinner>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Spinner from './Spinner.vue'

export default {
  data() {
    return {
      page: 1
    }
  },
  props: {
    modelValue: Object
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  components: {
    Spinner
  },
  computed: {
    ...mapGetters(['getReducedDiaries']),
    ...mapState(['loadMore', 'moreDiary', 'noMoreDiary', 'isLoading'])
  },
  methods: {
    ...mapMutations(['moreDiaryToggle']),
    ...mapActions(['getDiaries']),

    handleScroll() {
      if (!this.isLoading && this.$route.name === 'diaries') {
        const body = document.body
        const totalHeight = body.scrollHeight
        const scrollTop = body.scrollTop
        const clientHeight = window.innerHeight
        if (totalHeight - scrollTop - clientHeight === 0 && this.moreDiary) {
          this.getDiaries({
            range: this.modelValue,
            add: true,
            page: ++this.page
          })
        }
        if (!this.moreDiary) {
          this.page = 1
        }
      }
    }
  },
  
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.handleScroll)
    next()
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