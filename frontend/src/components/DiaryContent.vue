<template>
  <div class="diaryContent">

    <form class="bg-white shadow-md rounded" @submit.prevent>
      <div class="mb-4">
        <v-date-picker v-model="range" :masks="masks" is-range>
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="calendar">
              <div class="relative flex-grow">
                <i class="xi-calendar"></i>
                <input class="flex-grow bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.start"
                  v-on="inputEvents.start" />
              </div>
              <span class="flex-shrink-0 m-2">
                <i class="xi-long-arrow-right"></i>
              </span>
              <div class="relative flex-grow">
                <i class="xi-calendar"></i>
                <input class="flex-grow bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.end"
                  v-on="inputEvents.end" />
              </div>
            </div>
          </template>
        </v-date-picker>
      </div>
    </form>

    <div id="diaries">

      <div v-for="(diary, index) in getReducedDiaries" :key="index">
        <h2>{{ diary.title }}</h2>
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
      range: {
        start: new Date(2021, 0, 1),
        end: new Date(2021, 11, 31)
      },
      masks: {
        input: 'YYYY-MM-DD'
      }
    }
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
    ...mapActions(['requestDiaries']),

    handleScroll() {
      if (!this.isLoading && this.$route.name === 'diaries') {
        const body = document.body
        const totalHeight = body.scrollHeight
        const scrollTop = body.scrollTop
        const clientHeight = window.innerHeight
        if (totalHeight - scrollTop - clientHeight === 0 && this.moreDiary) {
          this.requestDiaries({
            value: this.tag,
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
  .calendar {
    display:flex;
    flex-direction: row;
    padding-bottom:2rem;
    justify-content: center;
    margin-left:-1.5px;

    i { margin:1rem 1rem 0 0; }
    .xi-long-arrow-right { margin:1rem 2.5rem 1rem 3rem; }
  }
  #diaries {
    display:flex;
    flex-direction:column;
    align-items:center;
      div {
      width:40%;
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