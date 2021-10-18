<template>
  <div class="wrapper">
    <p> <label for="user_id">User ID</label>{{ user.userId }} </p>
    <p> <label for="user_name">Name</label>{{ user.name }} </p>
    <p> <label for="user_mail">E-mail</label>{{ user.email }} </p>
    <router-link :to="{ name: 'accountEditor' }">
      <button type="submit">Edit</button>
    </router-link>
    <button @click="actionDel()">Delete</button>
    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'account',
  components: {
    Dialog
  },
  computed: {
    ...mapState(['user', 'dialog'])
  },
  methods: {
    ...mapActions(['delAccount']),
    ...mapMutations(['setDialog', 'setDialogFn']),

    async actionDel() {
      try {
        const ok = await this.$refs.Dialog.show({
          title: 'Delete Account',
          message: 'Are you sure you want to delete your account?',
          okButton: 'Delete'
        })
        if (ok) {
          const response = await this.delAccount(this.user.userId)
          if (response.data) {
            this.$router.push({
              name: 'login'
            })
          } else {
            alert('Cannot delete account(Server error).')
          }
        }
      } catch (err) {
        console.log(err)
      }
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

.wrapper {
  text-align: center;
}
</style>