<template>
  <div class="wrapper">
    <my-header></my-header>
    <router-view v-show="!isLoading"></router-view>
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
  data () {
    return { show: false }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  components: {
    MyHeader,
    MyFooter,
    Spinner
  },
  computed: {
    ...mapState(['isLoading'])
  },
  methods: {
    handleScroll () {
      this.show = window.scrollY > 400
    }
  }
}
</script>

<style>
</style>