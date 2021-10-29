<template>
  <popup-modal ref="popup">
    <div class="massage">
      <h2>{{ title }}</h2>
      {{ message }}
      </div>
    <div class="btns">
      <button @click="_cancel">{{ cancelButton }}</button>
      <button @click="_confirm">{{ okButton }}</button>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
  name: 'Dialog',

  components: {
    PopupModal
  },

  data: () => ({
    title: undefined,
    message: undefined,
    okButton: undefined,
    cancelButton: 'Cancle',

    resolvePromise: undefined,
    rejectPromise: undefined
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) { this.cancelButton = opts.cancelButton }
      this.$refs.popup.open()

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
    }
  }
}
</script>

<style scoped>
.massage {
  border-radius:10px;
  padding:1rem;
  min-width: 18rem;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.massage h2 { margin-bottom:1rem; }

.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top:1rem;
}

.btns button { 
  width:10.45rem;
  background: transparent;
  border: 1px solid transparent;
}
</style>