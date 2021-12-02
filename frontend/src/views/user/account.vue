<template>
  <div class="accountEditor">
    <Form @submit="onSubmit" :validation-schema="schema">
      <h2>Account Edit</h2>
      <TextInput
        name="email"
        type="email"
        label="E-mail"
        :disabled="true"
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
      <TextInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Type it again"
        success-message="Password is verified."
      />
      <TextInput
        name="nickname"
        type="text"
        label="Name"
        placeholder="Name"
      />
      <button class="submit-btn" type="submit">Submit</button>
    </Form>
    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '../../components/TextInput.vue'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'account',
  components: {
    Form,
    TextInput,
    Dialog
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const Dialog = ref(null)

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail is required')
        .email(),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      nickname: Yup.string()
        .required('Name is required.')
        .matches(/^[가-힣a-zA-Z\s]+$/, 'Must be a combination of characters')
    })

    async function onSubmit(values) {
      try {
        const res = await store.dispatch('editAccount', values)
        res.data ? store.dispatch('logout') : alert('Edit account failed.')
      } catch (err) {
        console.log(err)
        alert('Edit account failed.')
      }
    }

    const accountDelete = async () => {
      try {
        const ok = await Dialog.value.show({
          title: 'Delete Account',
          message: 'Are you sure you want to delete your account?',
          okButton: 'Delete'
        })
        if (ok) {
          const uid = store.state.user.userIdx || JSON.parse(sessionStorage.getItem('user'))
          const response = await store.dispatch('delAccount', uid)
          response.data ? router.push({ name: 'login' }) : alert('Cannot delete account(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }
    
    return {
      Dialog,
      schema,
      onSubmit,
      accountDelete
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.accountEditor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:50px 0;
  width: 100%;
  height: 87vh;
}

form {
  width: 453px;
  height: 720px;
  background: #fff;
  border-top: 8px solid;
  border-color: var(--point);
  display: flex;
  flex-direction: column;
  align-items: center;
  position:relative;

  h2 {
    text-transform: uppercase;
    text-decoration: underline;
    color: var(--point);
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-top:49px;
  }
}


.submit-btn {
  position:absolute;
  bottom:0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93px;
  background: var(--point);
  color:#fff;
  font-size:16px;
  text-transform: uppercase;
  border:0;
  font-weight: 700;
  letter-spacing: 0.2em;
}

a {
  color: var(--primary);
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  margin-top:77px;

  i { font-weight: bold; position:relative; top:0.5px; margin-right: 5px; }
}
</style>