<template>
    <div class="login">
      <form v-on:submit.prevent="submitForm">

        <label for="userId"><i class="xi-user"></i></label>
        <input type="text" id="userId" placeholder="User ID" onfocus="this.placeholder=''"
          onblur="this.placeholder='User ID'" v-model="userId">
        <br><br>
        <label for="password"><i class="xi-key"></i></label>
        <input type="password" id="password" placeholder="Password" onfocus="this.placeholder=''"
          onblur="this.placeholder='Password'" v-model="password" @keydown.enter="actionLogin()">
        <br><br>
        <p v-show="info">{{info}}</p>
        <button type="submit" @click="actionLogin()">Login</button>
        <br><br>

        <router-link :to="{ name: 'signUp' }">
          <button type="submit">Sign Up</button>
        </router-link>

      </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      userId: '',
      password: '',
      info: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations(['setUser']),
  
    async actionLogin() {
      try {
        this.info = 'Logging in...'
        const res = await this.login({ userId: this.userId, password: this.password })
        this.setUser(res.data)
        this.$router.push({ name: 'account' })
      } catch (err) {
        console.log(err)
        this.info = 'Login failed.'
      }
    }
  },
  watch: {
    name () {
      this.info = ''
    },
    password () {
      this.info = ''
    }
  }
}
</script>

<style scoped>

p {
  color: #000;
  text-align:center;
  margin-bottom:30px;
  font-size:16px !important;
  font-weight:bold;
}

.login { display: flex;  align-items: center; justify-content: center;  width: 100%; height: 100vh; }
.login label { width: 40px !important; }
.login button { width: 248px; padding:15px 0 !important; }


</style>