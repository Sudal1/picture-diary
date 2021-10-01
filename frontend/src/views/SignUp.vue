<template>
  <div class="signUp">
    <Form @submit="onSubmit" :validation-schema="schema">
      <TextInput
        name="userId"
        type="text"
        label="User ID"
        placeholder="User ID"
        success-message=""
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        success-message=""
      />
      <TextInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Type it again"
        success-message="Password is verified."
      />
      <TextInput
        name="dob"
        type="date"
        label="Date of Birth"
        placeholder=""
        success-message=""
      />
      <TextInput
        name="name"
        type="text"
        label="Name"
        placeholder="Name"
        success-message=""
      />
      <TextInput
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email address (aaa@example.com)"
        success-message="E-mail is verified"
      />
      <button type="submit">Sign Up</button>
      <button @click="$router.go(-1)">Back</button>
    </Form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '../components/TextInput.vue'

export default defineComponent({
  name: 'signUp',
  components: {
    Form,
    TextInput
  },
  setup() {
    const store = useStore()

    const schema = Yup.object().shape({
      userId: Yup.string()
        .required('User ID is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Please select one'),
      name: Yup.string()
        .required('Name is required.')
        .matches(/^[가-힣a-zA-Z\s]+$/, 'Name must be a combination of characters'),
      email: Yup.string()
        .required('E-mail is required')
        .email()
    })

    async function onSubmit(values) {
      try {
        console.log(values)
        const res = await store.dispatch('signUp', values)
        res.data ? this.$router.push({ name: 'account' }) : alert('Sign up failed.')
      } catch (err) {
        console.log(err)
      }
    }
    
    return {
      onSubmit,
      schema
    }
  }
})
</script>

<style scoped>
.signUp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>