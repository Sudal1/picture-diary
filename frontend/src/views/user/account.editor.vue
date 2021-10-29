<template>
  <div class="accountEditor">
    <Form @submit="onSubmit" :validation-schema="schema">
      <TextInput
        name="userId"
        type="text"
        label="User ID"
        placeholder="User ID"
        disabled="false"
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
        name="dob"
        type="date"
        label="Date of Birth"
      />
      <TextInput
        name="name"
        label="Name"
        placeholder="Name"
      />
      <TextInput
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email address (aaa@example.com)"
        success-message="E-mail is verified"
      />
      <div class="btnWrap">
        <router-link :to="{ name: 'account' }"><i class="xi-long-arrow-left"></i></router-link>
        <button class="submit-btn" type="submit">Edit</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '../../components/TextInput.vue'

export default defineComponent({
  name: 'accountEditor',
  components: {
    Form,
    TextInput
  },
  setup() {
    const store = useStore()

    const schema = Yup.object().shape({
      userId: Yup.string(),
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
        .matches(/^[가-힣a-zA-Z\s]+$/, 'Must be a combination of characters'),
      email: Yup.string()
        .required('E-mail is required')
        .email()
    })

    async function onSubmit(values) {
      try {
        alert(JSON.stringify(values))
        const res = await store.dispatch('editAccount', values)
        res.data ? store.dispatch('logout') : alert('Edit failed.')
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

<style lang="scss" rel="stylesheet/scss" scoped>
.btnWrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btnWrap .submit-btn {
  position: relative;
  top: 3px;
  margin-left: auto; 
}
</style>