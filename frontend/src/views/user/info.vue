<template>
  <div class="info">
    <p> <label for="user_id">아이디</label>{{ getUser.userId }} </p>
    <p> <label for="user_name">닉네임</label>{{ getUser.name }} </p>
    <p> <label for="user_mail">이메일</label>{{ getUser.email }} </p>
    <router-link :to="{ name: 'userEdit' }">
      <button type="submit">회원정보 변경</button>
    </router-link>
    <br><br>
    <button @click="actionDel()">회원 탈퇴</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'info',
  computed: {
    ...mapGetters('auth', ['getUser', 'getLoginStatus'])
  },
  methods: {
    ...mapActions('auth', ['userDel']),
    
    async actionDel() {
      if (confirm('회원탈퇴를 하시겠습니까?')) {
        await this.userDel(this.getUser.userId)
        if (!this.getLoginStatus) {
          alert('회원탈퇴가 완료되었습니다. 로그인 화면으로 돌아갑니다')
          this.$router.push({ name: 'login' })
        } else {
          alert('회원탈퇴가 완료되지 않았습니다.')
        }
      }
    }
  }
}
</script>

<style scoped>
p,h2 {
  color: #838383;
  margin: 30px 0; 
}

.info {text-align:center;}
</style>