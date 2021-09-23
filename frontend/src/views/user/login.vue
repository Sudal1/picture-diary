<template>
  <div class="login">
    <form v-on:submit.prevent="submitForm">

      <label for="userId"><i class="xi-user"></i></label>
      <input type="text" id="userId" placeholder="아이디" v-model="userId">
      <br><br>
      <label for="password"><i class="xi-key"></i></label>
      <input type="password" id="password" placeholder="패스워드" v-model="password" @keydown.enter="actionLogin()">
      <br><br>
      <p>{{info}}</p>
      <br><br>
      <button type="submit" @click="actionLogin()">로그인</button>
      <br><br>
      
      <router-link :to="{ name: 'signUp' }">
        <button type="submit">회원가입</button>
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
  mounted() {
    if (this.$store.state.user.userId) { this.$router.push({ name: 'info' }) }
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations(['setUser']),
  
    async actionLogin() {
      try {
        const res = await this.login({ userId: this.userId, password: this.password })
        this.info = '로그인 중...'
        this.setUser(res.data)
        this.$router.push({ name: 'info' })
      } catch (err) {
        console.log(err)
        this.info = '로그인에 실패하였습니다.'
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

.login { display: flex;  flex-direction:row; justify-content: center; }
.login label { width: 40px !important; }
.login button { width: 260px; padding:15px 0 !important; letter-spacing: 5px;}

</style>