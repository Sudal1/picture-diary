<template>
  <div class="signUp">
    <Form @submit.prevent="onSubmit" :validation-schema="schema">
      <SignInput
        name="userId"
        type="text"
        label="User ID"
        placeholder="User ID"
        success-message="Confirmed."
      />
      <SignInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        success-message=""
      />
      <SignInput
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Type it again"
        success-message="Password is verified."
      />
      <SignInput
        name="dob"
        type="text"
        label="Date of Birth"
        placeholder="Date (YYYY-MM-DD)"
        success-message=""
      />
      <SignInput
        name="name"
        type="text"
        label="Name"
        placeholder="Name"
        success-message=""
      />
      <SignInput
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
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import SignInput from '../components/SignInput.vue'

export default defineComponent({
  name: 'signUp',
  components: {
    Form,
    SignInput
  },
  setup() {
    const schema = Yup.object().shape({
      userId: Yup.string()
        .required('User ID is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
      name: Yup.string()
        .required('Name is required.')
        .matches(/^[가-힣a-zA-Z\s]+$/, 'Name can only be a combination of English, Korean, and space.'),
      email: Yup.string()
        .required('Email is required')
        .email()
    })

    const onSubmit = async (values) => {
      try {
        console.log('v: ', JSON.stringify(values))
        // const res = await this.signUp(values)
        // res.data ? this.$router.push({ name: 'account' }) : alert('Sign up failed.')
      } catch (err) {
        console.log(err)
      }
    }

    return {
      schema,
      onSubmit
    }
  },
  methods: {
    ...mapActions(['signUp'])
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}

.signUp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.signUp > form {
  width: 300px;
  margin: 0px auto;
  padding-bottom: 60px;
}

.signUp > button {
  width: 100%;
}
</style>