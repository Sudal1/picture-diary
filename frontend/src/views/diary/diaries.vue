<template>
  <div class="wrapper">

    <div class="content">
      <diary-content></diary-content>
    </div>

  </div>
</template>

<script>
import DiaryContent from '../../components/Diaries.vue'

export default {
  name: 'diaries',
  data() {
    return {}
  },
  components: {
    DiaryContent
  }
}
</script>

<style scoped>
.content {
  padding: 2rem 5rem 0;
}
</style>