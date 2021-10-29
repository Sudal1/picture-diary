<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name">{{ label }}</label>
    <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" :disabled="disabled"
      @input="handleChange" @blur="handleBlur" />

    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
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
      validator(value) {
        return ['false'].includes(value)
      }
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
  margin-bottom: calc(1em * 2.0);
  width: 100%;
}

label {
  display: block;
  padding-left: 4px;
  margin-bottom: 4px;
  width: 100%;
  white-space: nowrap;
}

input {
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 15px 10px;
  outline: none;
  background-color: #ffffff;
  width: 100%;
}

.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  padding-left: 4px;
  margin: 0;
  font-size: 14px;
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
  color: #21a67a;
}

.TextInput.success input:focus {
  border-color: #21a67a;
}

.TextInput.success .help-message {
  color: #21a67a;
}
</style>