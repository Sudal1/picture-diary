<template>
  <div class="wrapper">

    <div class="title">
      <input
        type="text"
        v-model="title"
        placeholder="Title"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='Title'"
      >
    </div>

    <div class="content">
      <QuillEditor
        theme="snow"
        v-model:content="content"
        contentType="text"
        placeholder="What happened today? Hmm..."
        :toolbar="state.toolbarOptions"
      />
    </div>
    
    <button class="submit-btn" @click="submit()">Write!</button>
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
        [{ color: [] }, { background: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ script: 'sub' }, { script: 'super' }],
        ['clean']
      ]
    })
    const diary = computed(() => store.state.diary)
    const title = computed({
      get: () => store.state.diary.title || '',
      set: val => store.commit('updateDiaryTitle', val)
    })
    const contentText = ref('')
    const content = computed({
      get: () => store.state.diary.content || '',
      set: val => store.commit('updateDiaryContent', val)
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

    const submit = async () => {
      console.log([title.value, content.value, contentText.value])
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

    return { Dialog, state, diary, title, contentText, content, submit }
  },
  async beforeRouteLeave (to, from, next) {
    if (this.state.canLeaveSite) {
      next()
    } else {
      const ok = await this.Dialog.value.show({
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
    font-size: 16px;
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