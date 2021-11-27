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

<style lang="scss" rel="stylesheet/scss" scoped>
.massage {
  border-radius:10px;
  padding:2rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight:400;
  letter-spacing: 0.05rem;
}

.massage h2 { margin-bottom:1rem; font-weight:700; letter-spacing: 0.05rem; }

.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;

button {
    width: 10.45rem;
    background: transparent;
    border: 0px;
    font-weight: 600;
    color: var(--primary);
    font-size:14px;

    &:hover {
      color: var(--point) !important;
      transition: 0.3s all;
    }
  }
}

</style>