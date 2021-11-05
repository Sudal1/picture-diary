<template>
  <div class="header">

    <div class="title">
      <router-link :to="{ name: 'home' }">
        <h2>그림<span>일기</span></h2>
        <p><span>Picture</span>Diary</p>
      </router-link>
    </div>

    <nav>
      <ul class="catalog">
        <span v-show="userId">Welcome {{ userId }}!</span>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/account">Account</router-link>
        </li>
        <li>
          <router-link to="/diaries">Diary</router-link>
        </li>
        <li v-show="userId" @click="actionLogout">Logout</li>
        <li>
          <router-link to='/login' v-show="!userId">Login</router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import EventBus from '../common/EventBus'

export default {
  setup() {
    const store = useStore()
    const userId = computed(() => localStorage.getItem('user'))

    onMounted(() => {
      EventBus.on('logout', () => store.dispatch('logout'))
    })
    
    onBeforeUnmount(() => {
      EventBus.remove('logout')
    })

    const actionLogout = () => {
      store.dispatch('logout')
    }

    return { userId, actionLogout }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
h2 {
  color: #c5c5c5;
  letter-spacing: 3px;
  font-size: 28px;
  font-weight: bold;
}

h2 > span {
  margin-left: 15px;
  color: #c2c4ff;
}

p {
  color: #c5c5c5;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 3px;
  margin-top: 10px;
  margin-left: 0px;
}

p > span {
  margin-right: 13px;
  color: #c2c4ff;
}

.header {
  display: flex;
  flex-direction: row;
  border-top: 7px solid #c2c4ff;
  padding: 30px 30px 33px;
  align-items: center;
  z-index:100;
}

.header .title {
  flex-shrink: 2;
  flex-grow: 1;
}

.header nav {
  color: #000;
  flex-shrink: 1;
}

.header nav > ul {  
  list-style: none;
}

.header nav > ul li {
  margin-left: 20px;
  display:inline-block;
}


</style>