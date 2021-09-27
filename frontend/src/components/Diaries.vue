<template>
  <div class="wrapper">
    <p>다이어리</p>
    <diary-content @addPage="nextPage" @dropPage="prePage"></diary-content>
    <router-link :to="{ name: 'editor' }" class="addPost" tag="button">
      <span>일기 쓰기</span>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DiaryContent from './DiaryContent'

export default {
  data() {
    return { page: 1 }
  },
  created() {
    this.getDiaries({ page: this.page, limit: 10 })
  },
  components: {
    DiaryContent
  },
  computed: {
    ...mapState(['diaries'])
  },
  methods: {
    ...mapActions(['getDiaries']),
    nextPage() {
      this.page++
      this.getDiaries({ page: this.page, limit: 10 })
    },
    prePage() {
      this.page--
      this.getDiaries({ page: this.page, limit: 10 })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  position: relative;
  padding-top: 0.625rem;
  /*height: 35.625rem;*/
  color: #ffffff;
  p {
    border-bottom: 0.1875rem double rgb(129, 216, 208);
    width: 12.5rem;
    font-size: 1.875rem;
    margin: 0 auto 2.5rem;
    padding-bottom: 0.625rem;
    text-align: center;
  }
  .addPost {
    position: fixed;
    bottom: 1.25rem;
    right: 1.25rem;
  }
}
@media screen and (max-width: 440px) {
  .wrapper {
    padding-top: 2rem !important;
    margin-bottom: 4rem;
    .addPost {
      position: absolute !important;
      bottom: -3rem !important;
    }
  }
}
</style>