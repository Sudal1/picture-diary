<template>
  <div class="wrapper">

    <div class="title">
      <input type="text" placeholder="Title" onfocus="this.placeholder=''" onblur="this.placeholder='Title'"
        v-model="title">
    </div>

    <div class="content">
      <textarea id="editor" spellcheck="false" v-model="content" v-focus></textarea>
    </div>
    
    <button class="submit-btn" @click="saveDiary($route.params.id)">Write!</button>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'editor',
  data() {
    return {
      firstUpdate: true,
      isChange: false
    }
  },
  directives: {
    focus: {
      mounted (el) {
        el.focus()
      }
    }
  },
  created() {
    const id = this.$route.params.id
    this.isSavingToggle(false)
    if (id) { return this.getDiary(id) }
    this.setDiary({
      content: '',
      title: ''
    })
  },
  updated() {
    if (this.firstUpdate) { this.isChange = false }
    this.firstUpdate = false
  },
  computed: {
    ...mapState(['diary', 'isSaving', 'dialog']),

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
    ...mapMutations(['setDiary', 'updateDiaryContent', 'updateDiaryTitle', 'isSavingToggle', 'setDialog']),
    ...mapActions(['saveDiary', 'getDiary'])
  },
  watch: {
    title() {
      this.isChange = true
    },
    content() {
      this.isChange = true
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isChange && !this.isSaving) {
      this.setDialog({
        info: 'You have unsaved data. Are you sure you want to exit?\n(Unsaved data will be destroyed.)',
        hasTwoBtn: true,
        show: true
      })
      new Promise((resolve, reject) => {
        this.dialog.resolveFn = resolve
        this.dialog.rejectFn = reject
      }).then(() => {
        next()
      }, () => {
        next(false)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.wrapper {
  display: flex;
  width: 40%;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;

  .title {
    width: 100%;
    margin-top: 50px;
  }
  .title input {
    width: 100%;
    height: 3.125rem;
    margin-bottom: 20px;
    font-size:16px;
  }

  .content {
    border: 0.5px solid rgb(0, 0, 0);
    width: 100%;
    height: 45rem;
    margin-bottom: 20px;

    #editor {
      width: 100%;
      height: 45rem;
      border: none;
      background: transparent;
      resize: none;
      outline: none;
      overflow-y: auto;
      white-space: pre-wrap;
    }
  }

  .submit-btn {
    margin-left: auto;
    margin-bottom: 50px;
  }
}
</style>