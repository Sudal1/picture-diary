<template>
  <div class="header">

    <router-link :to="{ name: 'home' }">
      <div class="title">
        <h2>그림<span>일기</span></h2>
        <p><span>Picture</span>Diary</p>
      </div>
    </router-link>

    <nav>
      <ul class="catalog">
        <span>Welcome {{ userId }}.</span>
        <router-link to="/home" tag="li">Home</router-link>
        <router-link to="/about" tag="li">About</router-link>
        <router-link to="/account" tag="li">Account</router-link>
        <router-link to="/diaries" tag="li">Diary</router-link>
        <li v-show="userId" @click="actionLogout">Logout</li>
        <router-link to='/login' tag="li" v-show="!userId">Login</router-link>
      </ul>
    </nav>

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
h2 {
  position: relative;
  left: 5px;
  color: #c5c5c5;
  letter-spacing: 3px;
  font-size: 28px;
  font-weight: bold;
}

h2>span {
  margin-left: 15px;
  color: #c2c4ff;
}

p {
  color: #c5c5c5;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 3px;
  margin-top: 10px;
}

p>span {
  margin-right: 13px;
  color: #c2c4ff;
}

.header {
  display: flex;
  flex-direction: row;
  border-top: 7px solid #c2c4ff;
  padding: 30px 30px 33px;
  align-items: center;
}

.header .title {
  flex-shrink: 2;
  flex-grow: 1;
}

.header .search {
  flex-shrink: 1;
  margin-top: 3px;
}

.header .search input {
  border: 0 !important;
  padding: 0px 0 5px !important;
  font-size: 16px !important;
  width: 150px;
}

.header .search button {
  border: 0 !important;
  padding: 0px 0 5px !important;
  margin-left: 5px;
  position: relative;
  top: 1px;
  background: transparent !important;
}

.header .search button i {
  font-size: 24px;
  color: #c5c5c5;
}

.header nav {
  float: right;
  position: relative;
  color: #000;
  ul {
    padding-left: 0;
    list-style: none;
    li {
      text-align: center;
      cursor: pointer;
      transition: 1s;
      &:hover {
        transition: 1s;
        color: rgb(87, 87, 87)
      }
    }
  }
}
</style>