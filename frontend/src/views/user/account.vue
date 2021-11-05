<template>
  <div class="wrapper">

    <p> <label for="user_id">User ID</label>{{ user.userId }} </p>
    <p> <label for="user_name">Name</label>{{ user.name }} </p>
    <p> <label for="user_mail">E-mail</label>{{ user.email }} </p>

    <router-link :to="{ name: 'accountEditor' }">
      <button type="submit">Edit</button>
    </router-link>
    <br><br>
    <button @click="actionDel()">Delete</button>

    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { ref, defineExpose, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'account',
  components: {
    Dialog
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = computed(() => store.state.user)
    const Dialog = ref(null)
    defineExpose({ Dialog })

    const actionDel = async () => {
      try {
        const ok = await Dialog.value.show({
          title: 'Delete Account',
          message: 'Are you sure you want to delete your account?',
          okButton: 'Delete'
        })
        if (ok) {
          const response = await store.dispatch('delAccount', user.value.userId)
          response.data ? router.push({ name: 'login' }) : alert('Cannot delete account(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }

    return { user, Dialog, actionDel }
  }
}
</script>

<style scoped>
.wrapper {
  text-align: center;
}

p,
h2 {
  word-break: keep-all;
  color: #838383;
  margin: 30px 0;
}

button {
  width: 200px;
  padding: 15px 0 !important;
}
</style>