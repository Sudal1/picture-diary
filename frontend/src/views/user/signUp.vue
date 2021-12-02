<template>
  <div class="signUp">
    <Form @submit="onSubmit" :validation-schema="schema">
      <h2>Sign Up</h2>
      <TextInput
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email"
        success-message="E-mail is verified"
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
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '../../components/TextInput.vue'

export default {
  name: 'signUp',
  components: {
    Form,
    TextInput
  },
  setup() {
    const router = useRouter()
    const store = useStore()

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
        const res = await store.dispatch('signUp', JSON.stringify(values))
        if (res.data) {
          const response = await store.dispatch('login', { email: values.email, password: values.password })
          store.commit('setUser', response.data)
          router.push({ name: 'home' })
        } else {
          alert('Sign up failed.')
        }
      } catch (err) {
        console.log(err)
        alert('Sign up failed. Please try again.')
      }
    }
    
    return {
      onSubmit,
      schema
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.signUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin:50px 0;
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
  position: relative;

  h2 {
    text-transform: uppercase;
    text-decoration: underline;
    color: var(--point);
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.1em;
    margin-top: 49px;
  }
}

.submit-btn {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93px;
  background: var(--point);
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  border: 0;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.back {
  color: var(--primary);
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-weight: bold;
    margin-right: 10px;
    position: relative;
    top:-0.7px;
  }
}
</style>