<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage || meta.valid">{{ errorMessage || successMessage }}</p>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
import { useStore } from 'vuex'

export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    successMessage: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta
    } = useField(props.name, undefined, {
      initialValue: store.state.user ? store.state.user[props.name] : ''
    })

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta
    }
  }
}
</script>

<style scoped>
.TextInput {
  position: relative;
}

label {
  display: block;
  margin-top:38px;
  margin-bottom: 12px;
  width: 100%;
  white-space: nowrap;
  color:#909090;
  font-size:14px;
  font-weight: 500;
  
}

input {
  border: 2px solid #e1e1e1;
  padding: 14px 10px;
  outline: none;
  background-color: #ffffff;
  width:254px;
  font-size:14px;
  margin-bottom:9px;
  color:#959595;
  font-weight: 500;
}

input::placeholder { font-size:14px; color:#cbcbcb; font-weight: 500; }

.help-message {
  position: absolute;
  bottom: -16px;
  margin: 0;
  font-size: 13px;
}

.TextInput.has-error input {
  background-color: #fff;
  color: #f23648;
}

.TextInput.has-error input:focus {
  border-color: #f23648;
}

.TextInput.has-error .help-message {
  color: #f23648;
}

.TextInput.success input {
  background-color: #fff;
}

.TextInput.success input:focus {
  border-color: rgba(138,165,148,0.5);
}

.TextInput.success .help-message {
  color:var(--point);
}
</style>