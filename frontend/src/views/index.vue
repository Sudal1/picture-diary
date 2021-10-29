<template>
  <div class="wrapper">
    <my-header></my-header>
      <div class="container">
        <router-view v-show="!isLoading"></router-view>
      </div>
      <spinner v-show="isLoading"></spinner>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '../components/MyHeader.vue'
import MyFooter from '../components/MyFooter.vue'
import Spinner  from '../components/Spinner.vue'

export default {
  name: 'index',
  components: {
    MyHeader,
    MyFooter,
    Spinner
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style>
.container {
  min-height: 79vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>