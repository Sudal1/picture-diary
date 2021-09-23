<template>
  <div id="wrapper">
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'

export default {
  name: 'index',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>

</style>