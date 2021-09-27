<template>
  <div class="wrapper">
    <my-header></my-header>
    <router-view v-show="!isLoading"></router-view>
    <spinner v-show="isLoading"></spinner>
    <div class="status">
      <p class="left">
        <span>{{ userID }}님, 안녕하세요!</span>
        <router-link :to="{ name: 'userEdit' }">
          <span>내 회원정보</span>
        </router-link>
      </p>
      <p class="right" @click="actionLogout">
        <span>로그아웃</span>
      </p>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapState(['user', 'isLoading']),
    time () {
      const hours = new Date().getHours()
      return hours
    },
    userId () {
      return localStorage.getItem('user_id')
    }
  },
  methods: {
    ...mapActions(['logout']),
    actionLogout () {
      this.logout()
      this.$router.go({ name: 'login' })
    },
    handleScroll () {
      this.show = window.scrollY > 400
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  .status {
    background: transparent;
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    color: #fff;
    font-size: 1.125rem;
    display: flex;
    justify-content: space-between;
    p.left {
      margin-left: 1.25rem;
      &:hover {
        color: darkturquoise;
      }
    }
    p.right {
      cursor: pointer;
      margin-right: 1.25rem;
      color: rgb(129, 216, 208);
      &:hover {
        color: rgb(129, 216, 208);
      }
    }
  }
}
</style>