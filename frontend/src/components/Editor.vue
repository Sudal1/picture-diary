<template>
  <div class="wrapper">
    <div class="title">
      <input type="text" placeholder="Title" onfocus="this.placeholder=''" onblur="this.placeholder='Title'"
        v-model="title">
    </div>
    <div id="tags">
      <tag-input v-for="(item, index) in tags" :tags="tags" :index="index" :key="index"></tag-input>
    </div>
    <div class="content">
      <textarea id="editor" spellcheck="false" v-model="content" v-focus></textarea>
    </div>
    <button class="publish" @click="saveDiary($route.params.id)">작성 완료</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import TagInput from './TagInput.vue'

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
    this.isSaving_toggle(false)
    if (id) { return this.getDiary(id) }
    this.setDiary({
      content: '',
      title: '',
      tags: ['']
    })
  },
  mounted() {
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
    },

    tags: {
      get () { return this.diary.tags },
      set (value) { this.updateDiaryTags(value) }
    }
  },
  methods: {
    ...mapMutations(['setDiary', 'updateDiaryContent', 'updateDiaryTitle', 'updateDiaryTags', 'isSavingToggle', 'setDialog']),
    ...mapActions(['saveDiary', 'getDiary'])
  },
  components: {
    TagInput
  },
  watch: {
    title() {
      this.isChange = true
    },
    content() {
      this.isChange = true
    },
    tags() {
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
  position: relative;
  padding: 0 3.125rem 0;

  input {
    border: none;
    border-bottom: 0.125rem solid rgb(129, 216, 208);
    outline: none;
    background: transparent;
    color: #ffffff;
    margin-bottom: 0.625rem;
    text-align: center;
  }

  .title input {
    width: 100%;
    height: 3.125rem;
    font-size: 1.875rem;
  }

  #tags {
    input {
      width: 6.25rem;
      height: 1.875rem;
      font-size: 1rem;
      margin-right: 0.125rem;
    }
  }

  .content {
    border: 0.125rem solid rgb(129, 216, 208);
    position: relative;
    height: 29.375rem;

    #editor {
      width: 100%;
      height: 29.375rem;
      border: none;
      background: transparent;
      resize: none;
      outline: none;
      font-size: 1rem;
      overflow-y: auto;
      white-space: pre-wrap;
      font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑", STXihei, "华文细黑", serif;
      color: #E5E9F2;
    }
  }
}

.publish {
  width: 6.25rem;
  position: fixed;
  left: 1rem;
  bottom: 32.5rem;
  background: rgb(129, 216, 208);
  color: #000;
}

.active {
  background: rgb(129, 216, 208);
  color: #111111;
}

@media screen and (max-width: 440px) {
  .wrapper {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    margin-bottom: 5rem;
  }

  .publish {
    position: absolute !important;
    bottom: -3rem !important;
    left: 1rem !important;
  }

  #tags {
    width: 13.7rem !important;
  }
}

</style>