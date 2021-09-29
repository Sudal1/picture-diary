<template>
  <div class="diaryContent">
    <div id="diaries">

      <div class="tags">
        <div class="tagFlex">
          <button v-for="(tag, index) in getTags"
            :class="{activeBtn: selectIndex === index}"
            @click="switchTag({value: tag, page: 1}, index, tag)"
            :key="index"
          >{{ tag }}</button>
        </div>
      </div>

      <div v-for="(diary, index) in getReducedDiaries" id="diary" :key="index">
        <h2>{{ diary.title }}</h2>
        <time>{{ diary.createdAt }}</time>
        <time>{{ diary.updatedAt }}</time>
        <p>{{ diary.content }}</p>
        <router-link :to="{ name: 'diary', params: { id: diary.id, index: index, page: page }, hash: '#diary' }"
          tag="button" exact>
          <span>Continue reading</span>
        </router-link>
        <span class="diaryTag">{{ diary.tags }}</span>
      </div>

      <p v-if="!loadMore" v-show="!noMoreDiary" class="noMore">Scroll down to load</p>
      <p v-if="noMoreDiary" class="noMore">No more content</p>

    </div>
    <spinner v-show="loadMore" class="spinner"></spinner>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Spinner from '../../components/Spinner.vue'

export default {
  data() {
    return {
      selectIndex: 0,
      page: 1
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.setHeadline({ content: '일기 목록' })
    this.getDiaries({ page: 1 })
    this.getTags()
  },
  components: {
    Spinner
  },
  computed: {
    ...mapGetters(['getReducedDiaries', 'getTags']),
    ...mapState(['tag', 'loadMore', 'moreDiary', 'noMoreDiary', 'isLoading'])
  },
  methods: {
    ...mapMutations(['setHeadline', 'setTag', 'moreDiaryToggle']),
    ...mapActions(['getDiaries', 'getTags', 'searchDiaries']),

    switchTag(payload, index, tag) {
      this.getDiaries(payload)
      this.selectIndex = index
      this.setTag(tag)
    },

    handleScroll() {
      if (!this.isLoading && this.$route.name === 'diaries') {
        const body = document.body
        const totalHeight = body.scrollHeight
        const scrollTop = body.scrollTop
        const clientHeight = window.innerHeight
        if (totalHeight - scrollTop - clientHeight === 0 && this.moreDiary) {
          this.getAlldiaries({
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
  #diaries {
    padding: 1.875rem 12.5rem 0;

    .tags {
      .tagFlex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .activeBtn {
          background: #ffc520;
          color: #ffffff;
          transition: 1s;
        }

        button {
          transition: 1s;
          padding-left: 1rem;
          padding-right: 0.2rem;
          text-align: center;
          background: rgb(129, 216, 208);
          color: #00193a;
          margin: 0 1.25rem 1.25rem 0;
        }
      }
    }

    div#diary {
      color: #fff;
      width: 100%;
      border-bottom: 0.125rem solid rgb(129, 216, 208);

      h2 {
        color: rgb(129, 216, 208);
        margin-top: 1.875rem;
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
        margin-bottom: 1.875rem;
      }

      button {
        width: 8.75rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 1.25rem;
        border-radius: 0.25rem;
        margin-left: calc(100% - 8.75rem);
      }

      .diaryTag {
        margin-bottom: 1.875rem;
        margin-right: 0.625rem;
      }

      .commentNumber {
        color: #ffffff;
      }
    }

    p.noMore {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      color: #ffffff;
      margin-top: 1.875rem;
      margin-bottom: 1.875rem;
      text-align: center;
    }
  }
}

@media screen and (max-width: 440px) {
  #diaries {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}
</style>