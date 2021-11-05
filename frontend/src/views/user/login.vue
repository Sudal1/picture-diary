<template>
    <div class="login">
      <form v-on:submit.prevent="submitForm">

        <label for="userId"><i class="xi-user"></i></label>
        <input type="text" id="userId" placeholder="ID" onfocus="this.placeholder=''"
          onblur="this.placeholder='User ID'" v-model="userId">
        <br><br>
        <label for="password"><i class="xi-key"></i></label>
        <input type="password" id="password" placeholder="Password" onfocus="this.placeholder=''"
          onblur="this.placeholder='Password'" v-model="password" @keydown.enter="actionLogin()">
        <br><br>

        <button type="submit" @click="actionLogin()">Login</button>
        <br><br>
        <router-link :to="{ name: 'signUp' }">
          <button type="submit">Sign Up</button>
        </router-link>

      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'login',
  setup() {
    const router = useRouter()
    const store = useStore()
    const userId = ref('')
    const password = ref('')

    const actionLogin = async () => {
      try {
        const res = await store.dispatch('login', { userId: userId.value, password: password.value })
        store.commit('setUser', res.data)
        router.push({ name: 'account' })
      } catch (err) {
        console.log(err)
        alert('Login failed. Please retry login.')
      }
    }

    return { userId, password, actionLogin }
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
.login button { width: 247px; padding:15px 0 !important; }

</style>