<template>
  <div class="accountEditor">
    <Form @submit="onSubmit" :validation-schema="schema">
      <h2>Account Edit</h2>
      <TextInput
        name="userId"
        type="text"
        label="User ID"
        placeholder="ID"
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
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email address (aaa@example.com)"
        success-message="E-mail is verified"
      />
      <TextInput
        name="name"
        type="text"
        label="Name"
        placeholder="Name"
      />
      <TextInput
        name="dob"
        type="date"
        label="Date of Birth"
        placeholder=""
      />
      <button class="submit-btn" type="submit">Submit</button>
    </Form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '../../components/TextInput.vue'

export default {
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
        const res = await store.dispatch('editAccount', JSON.stringify(values))
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
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.accountEditor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

form {
  width: 453px;
  height: 970px;
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