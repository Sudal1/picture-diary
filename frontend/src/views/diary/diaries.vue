<template>
  <div class="wrapper">

    <div class="list">
      <diary-content></diary-content>
    </div>

    <router-link :to="{ name: 'editor' }" class="write" tag="button">
      <span>Write</span>
    </router-link>

  </div>
</template>

<script>
import DiaryContent from '../../components/DiaryContent.vue'

export default {
  data() {
    return {}
  },
  components: {
    DiaryContent
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  position: relative;
  padding-top: 0.625rem;

  .list {
    div { padding: 2rem 5rem 0; }
  }
}
</style>