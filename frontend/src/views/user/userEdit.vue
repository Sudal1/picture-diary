<template>
  <div class="userEdit">
    <form v-on:submit.prevent="submitForm">

    <label for="user_id">아이디</label>
    <input type="text" id="user_id" v-model="userId" disabled>
    <span>* 아이디는 변경불가</span>
    <br><br>
    <label for="user_password">비밀번호</label>
    <input type="password" id="user_password" v-model="password">
    <br><br>
    <label for="user_name">닉네임</label>
    <input type=“text” id="user_name" v-model="name">
    <br><br>
    <label for="user_email">이메일</label>
    <input type=“email” id="user_email" v-model="email">
    <br><br>
    <button type="submit" @click="actionEdit()">변경하기</button>
    <button @click="$router.go(-1)" style="float:right;">돌아가기</button>

    </form>    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'userEdit',
  data() {
    return {
      userId: '',
      password: '',
      name: '',
      email: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser', 'getLoginStatus'])
  },
  created() {
    this.userId = this.getUser.userId
    this.name = this.getUser.name
    this.email = this.getUser.email
  },
  methods: {
    ...mapActions('auth', ['userEdit']),
  
    async actionEdit() {
      await this.userEdit({
        userId: this.userId,
        newPassword: this.password,
        name: this.name,
        email: this.email
      })
      if (!this.getLoginStatus) {
        alert('회원정보 변경 완료! 다시 로그인해주세요.')
        this.$router.push({ name: 'login' })
      } else {
        alert('회원정보 변경에 실패하였습니다.')
      }
    }
  }
}
</script>

<style scoped>
p,h2 {
  color: #000;
}

.userEdit{
  margin: 100px 0;

}

.userEdit span {
  margin-left:20px;
}

input[type="text"]:disabled {
  background: #e9eaff !important;
}

</style>