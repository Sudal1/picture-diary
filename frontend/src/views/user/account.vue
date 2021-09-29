<template>
  <div class="info">
    <p> <label for="user_id">User ID</label>{{ user.userId }} </p>
    <p> <label for="user_name">Name</label>{{ user.name }} </p>
    <p> <label for="user_mail">E-mail</label>{{ user.email }} </p>
    <router-link :to="{ name: 'accountEditor' }">
      <button type="submit">Edit Account</button>
    </router-link>
    <br><br>
    <button @click="actionDel()">Delete Account</button>
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
    ...mapMutations(['setDialog']),
    
    actionDel() {
      this.setDialog({
        info: 'Are you sure you want to delete your account?\n(Deleted account cannot be returned.)',
        hasTwoBtn: true,
        show: true
      })
      new Promise((resolve, reject) => {
        this.dialog.resolveFn = resolve
        this.dialog.rejectFn = reject
      }).then(
        async () => {
          try {
            const res = await this.delAccount(this.user.userId)
            if (res.status === '200') { this.$router.push({ name: 'login' }) }
          } catch(err) {
            console.log(err)
          }
        },
        () => {}
      ).catch((err) => { console.log(err) })
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