<template>
  <div class="editor">

    <div class="title">
      <input type="text" v-model="title" placeholder="Title" onfocus="this.placeholder=''"
        onblur="this.placeholder='Title'">
    </div>

    <div class="content">
      <QuillEditor
        theme="snow"
        v-model:content="content"
        contentType="html"
        placeholder="What happened today? Hmm..."
        :toolbar="state.toolbarOptions"
      />
      <div class="tags">
        <ul>
          <li><button>tag1 <i class="material-icons">clear</i></button></li>
          <li><button>tag2 <i class="material-icons">clear</i></button></li>
          <li><button>tag3 <i class="material-icons">clear</i></button></li>
        </ul>
      </div>

      <input
        type="text"
        class="tagInput"
        placeholder="Tags (Separated by comma ',')"
        v-model="tag"
        onfocus="this.placeholder=''"
        @keypress="addTag($event)"
      >
      <button @click="submit()">Write</button>
      <button class="back" @click="goBack"><i class="xi-angle-left"></i>back to previous</button>
    </div>

    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onUpdated, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Dialog from '../../components/Dialog.vue'


export default defineComponent({
  name: 'editor',
  components: {
    QuillEditor,
    Dialog
  },
  setup: (props, { emit }) => {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const Dialog = ref(null)
    const state = ref({
      firstUpdate: true,
      canLeaveSite: true,
      toolbarOptions: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ script: 'sub' }, { script: 'super' }],
        ['clean']
      ]
    })
    
    const diary = computed(() => store.state.diary)
    const tags = computed(() => store.state.tags)
    const title = computed({
      get: () => store.state.diary.title || '',
      set: val => store.commit('setDiaryTitle', val)
    })
    const content = computed({
      get: () => store.state.diary.content || '',
      set: val => store.commit('setDiaryContent', val)
    })
    const tag = computed({
      get: () => store.state.tag || '',
      set: val => tags.value.pop(val.trim().replace(/,/g, ''))
    })

    const did = route.params.id
    store.commit('isSavingToggle', false)
    // if (did) { store.dispatch('getDiary', did) }
    store.commit('setDiary', { title: '', content: '' })

    watch(title, () => {
      state.value.canLeaveSite = false
      changeCanLeaveSite()
    })

    watch(content, () => {
      state.value.canLeaveSite = false
      changeCanLeaveSite()
    })

    onUpdated(() => {
      if (state.value.firstUpdate) { state.value.canLeaveSite = true }
      state.value.firstUpdate = false
    })

    onMounted(() => {
      window.addEventListener('beforeunload', unLoadEvent)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', unLoadEvent)
    })

    const unLoadEvent = (event) => {
      if (!state.value.canLeaveSite) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    const changeCanLeaveSite = () => {
      emit('change-can-leave-site', state.value.canLeaveSite)
    }

    const addTag = (event) => {
      if (event.code === 'Comma') {
        console.log(event.target.value)
      }
    }

    const submit = async () => {
      console.log(store.state.diary)
      try {
        const response = await store.dispatch('saveDiary', route.params.id)
        if (response) {
          state.value.canLeaveSite = true
          changeCanLeaveSite()
          router.push({ name: 'diary', params: { id: response.id } })
        } else {
          alert('Cannot save diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }

    const goBack = () => {
      router.go(-1)
    }

    return { 
      Dialog,
      state,
      diary,
      title,
      content,
      tag,
      addTag,
      submit,
      goBack
    }
  },
  async beforeRouteLeave (to, from, next) {
    if (this.state.canLeaveSite) {
      next()
    } else {
      const ok = await this.Dialog.show({
        title: 'Leave this page',
        message: 'Are you sure you want to leave current page?',
        okButton: 'Sure'
      })
      if (ok) {
        next()
      }
    }
  }
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:72vh;

  .title {
     width: 1194px;
     height:65px;
  }

  .title input {
    width: 100%;
    font-size: 16px;
    padding:20px;
    border:0;
    border-left: 8px solid;
    border-color: var(--point);
    color: #555;
    letter-spacing: 0.05em;
  }

  .content {
    margin: 2rem 0 2rem 0;
    width: 1194px;
    height: 450px;
    background: #fff;

    .tags {
      margin-bottom: -1rem;
    }

    .tags ul {
      display: inline-block;

      button {
        width: 100%;
        margin-right: 1em;
        padding: 10px 10px 10px 13px;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          font-size:11px;
          margin-left:4px;
        }
      }
    }

  }

  .tagInput {
    margin-top: 2rem;
    padding:20px;
    font-size: 16px;
    color: #555;
    letter-spacing: 0.05em;
    border: 0;
    width: 100%;
  }

  button {
    width: 1194px;
    background: var(--point);
    color:#fff;
    border:0;
    padding:20px 0;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.2em;
    margin-top:2rem;
    cursor: pointer;
  }

.back {
  color: var(--primary);
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  margin-top: 40px;
  border: 0;
  background: transparent;
  cursor: pointer;

  i {
    font-weight: bold;
    position: relative;
    top: 0.5px;
    margin-right: 5px;
  }
}

}






</style>