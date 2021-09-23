<template>
  <div>
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
        placeholder="Number"
        success-message=""
      />
      <SignInput
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email address (aaa@example.com)"
        success-message="E-mail is verified"
      />

      <button class="submit-btn" @click="$router.go(-1)">Back</button>
      <button class="submit-btn" type="submit">Sign Up</button>

    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import SignInput from '../../components/SignInput.vue'

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
      email: Yup.string()
        .required('Email is required')
        .email()
    })

    const onSubmit = async (values) => {
      try {
        const res = await this.signUp(values)
        res.data ? this.$router.push({ name: 'info' }) : alert('Sign up failed.')
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

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  width: 100%;
  height: 100%;
}

form {
  width: 300px;
  margin: 0px auto;
  padding-bottom: 60px;
}

.submit-btn {
  background: var(--primary-color);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.submit-btn:hover {
  transform: scale(1.1);
}
</style>