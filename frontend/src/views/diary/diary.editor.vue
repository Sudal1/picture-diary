<template>
  <div class="wrapper">

    <div class="title">
      <input type="text" placeholder="Title" onfocus="this.placeholder=''" onblur="this.placeholder='Title'"
        v-model="title">
    </div>

    <div class="content">
      <textarea id="editor" spellcheck="false" v-model="content" v-focus></textarea>
    </div>
    
    <button class="submit-btn" @click="submit()">Write!</button>
    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'editor',
  components: {
    Dialog
  },
  directives: {
    focus: {
      mounted (el) { el.focus() }
    }
  },
  data() {
    return {
      firstUpdate: true,
      canLeaveSite: true
    }
  },
  created() {
    const id = this.$route.params.id
    this.isSavingToggle(false)
    // if (id) { return this.getDiary(id) }
    this.setDiary({
      title: '',
      content: ''
    })
  },
  updated() {
    if (this.firstUpdate) { this.canLeaveSite = true }
    this.firstUpdate = false
  },
  computed: {
    ...mapState(['diary', 'isSaving']),

    title: {
      get () { return this.diary.title || '' },
      set (value) { this.updateDiaryTitle(value) }
    },

    content: {
      get () { return this.diary.content },
      set (value) { this.updateDiaryContent(value) }
    }
  },
  methods: {
    ...mapMutations(['setDiary', 'updateDiaryContent', 'updateDiaryTitle', 'isSavingToggle']),
    ...mapActions(['saveDiary', 'getDiary']),

    async submit() {
      try {
        const response = await this.saveDiary(this.$route.params.id)
        if (response) {
          this.canLeaveSite = true
          this.changeCanLeaveSite()
          this.$router.push({ name: 'diary', params: { id: response.id } })
        } else {
          alert('Cannot save diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    },

    unLoadEvent (event) {
      if (!this.canLeaveSite) {
        event.preventDefault()
        event.returnValue = ''        
      }
    },

    changeCanLeaveSite () {
      this.$emit('change-can-leave-site', this.canLeaveSite)
    }
  },
  watch: {
    title: function() {
      this.canLeaveSite = false
      this.changeCanLeaveSite()
    },
    content: function () {
      this.canLeaveSite = false
      this.changeCanLeaveSite()
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unLoadEvent)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.unLoadEvent)
  },
  async beforeRouteLeave (to, from, next) {
    if (this.canLeaveSite) {
      next()
    } else {
      const ok = await this.$refs.Dialog.show({
        title: 'Leave this page',
        message: 'Are you sure you want to leave current page?',
        okButton: 'Sure'
      })
      if (ok) {
        next()
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.wrapper {
  display: flex;
  width: 30%;
  margin: 0 auto;
  flex-direction: column;

  .title {
    width: 100%;
  }
  .title input {
    width: 100%;
    height: 3.125rem;
    font-size:16px;
  }

  .content {
    margin: 2rem 0 1.5rem 0;

    #editor {
      width: 100%;
      outline: none;
      white-space: pre-wrap;
      min-height: 30rem;
    }
  }

  .submit-btn {
    margin-left: auto;
  }
}
</style>