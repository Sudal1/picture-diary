<template>
  <div class="info">
    <p> <label for="user_id">User ID</label>{{ user.userId }} </p>
    <p> <label for="user_name">Name</label>{{ user.name }} </p>
    <p> <label for="user_mail">E-mail</label>{{ user.email }} </p>
    <router-link :to="{ name: 'accountEditor' }">
      <button type="submit">Edit</button>
    </router-link>
    <button @click="actionDel()">Delete</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'account',
  computed: {
    ...mapState(['user', 'dialog'])
  },
  methods: {
    ...mapActions(['delAccount']),
    ...mapMutations(['setDialog', 'setDialogFn']),
    
    actionDel() {
      this.setDialog({
        info: 'Are you sure you want to delete your account?',
        hasTwoBtn: true,
        show: true
      })
      new Promise((resolve, reject) => {
        this.setDialogFn(resolve, reject)
      }).then(() => {
          console.log('resolve')
          // this.delAccount(this.user.userId)
        }
      ).catch((err) => { console.log(err) })
    }
  }
}
</script>

<style scoped>
p,
h2 {
  color: #838383;
  margin: 30px 0;
}

.info {
  text-align: center;
}
</style>