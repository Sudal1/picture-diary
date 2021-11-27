<template>
  <div class="wrapper">
    <my-header></my-header>
    <router-view></router-view>
    <div class="btns" v-show="!isLoading">
      <router-link :to="{ name: 'editor' }" class="write">
        <button><i class="material-icons">edit</i></button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MyHeader from '../components/MyHeader.vue'

export default {
  name: 'index',
  components: {
    MyHeader
  },
  setup() {
    const store = useStore()
    const isLoading = computed(() => store.state.isLoading)

    return { isLoading }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.btns {
  position:fixed;
  bottom:3%;
  right:2%;

  button {
    background: var(--point);
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 0;
    color: #fff;
    font-size: 24px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>