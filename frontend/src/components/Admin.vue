<template>
  <div class="wrapper">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
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