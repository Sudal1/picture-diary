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
        :toolbar="option.toolbarOptions"
      />

      <transition-group name="list" tag="div" class="tags">
        <ul v-for="(item, index) in tags" :key="item" v-show="tags">
           <li>{{ item }}<button @click="delTag(index)"><i class="material-icons">clear</i></button></li>
        </ul>
      </transition-group>

      <input
        type="text"
        class="tagInput"
        placeholder="Tags ( Separated by comma `,` )"
        onfocus="this.placeholder=''"
        :value="tag"
        @keyup="addTag($event)"
      >
      <button @click="submit()" class="write">Write</button>
    </div>

    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onUpdated, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
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
      canLeaveSite: true
    })
    const option = {
      toolbarOptions: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ direction: 'rtl' }],
        ['clean']
      ]
    }

    if (!route.params.id) {
      store.commit('setDiary', { title: '', content: '', tags: [] })
    } else if (route.params.date && route.params.id) {
      store.commit('setDiary', store.state.sortedDiaries[route.params.date].find(elem => String(elem.diaryIdx) === route.params.id))
    }
    
    const diary = computed(() => store.state.diary)
    const title = computed({
      get: () => store.state.diary.title || '',
      set: val => store.commit('setDiaryTitle', val)
    })
    const content = computed({
      get: () => store.state.diary.content || '',
      set: val => store.commit('setDiaryContent', val)
    })
    const tag = ref('')
    const tags = computed({
      get: () => store.state.diary.tags || '',
      set: val => store.commit('setDiaryTags', val)
    })

    console.log(diary.value)

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
        store.commit('updateDiaryTags', event.target.value)
        tag.value = ''
        event.target.value = ''
      }
    }

    const delTag = (index) => {
      store.commit('unsetDiaryTag', index)
    }

    const submit = async () => {
      try {
        state.value.canLeaveSite = true
        changeCanLeaveSite()
        const response = await store.dispatch('saveDiaryInMachine')
        response.data ? store.commit('addDiaryResult', response.data.result) : alert('Cannot save diary(MServer error).')
        const curDate = dayjs(new Date()).format('YYYY-MM')
        const backRes = await store.dispatch('saveDiary', diary.value?.diaryIdx)
        backRes.data ? router.push({ name: 'diary', params: { date: curDate, id: backRes.data.result.diaryIdx || diary.value.diaryIdx } }) : alert('Cannot save diary(DServer error).')
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
      option,
      diary,
      title,
      content,
      tag,
      tags,
      addTag,
      delTag,
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
  height: 72vh;

  .title {
    width: 1194px;
    height: 65px;

    input {
      width: 100%;
      font-size: 16px;
      padding: 20px;
      border: 0;
      border-left: 8px solid;
      border-color: var(--point);
      color: #555;
      letter-spacing: 0.05em;
    }
  }

  .content {
    margin: 2rem 0 2rem 0;
    width: 1194px;
    height: 450px;
    background: #fff;

    .tags {
      margin-bottom: -1rem;
      display: flex;
      flex-direction: row;

      ul {
        margin-top:1rem;

        li {
          margin-right: 1em;
          padding: 8px 8px 8px 11px;
          max-height:35px;
          color:#fff;
          font-size: 12px;
          background: var(--point);
          letter-spacing: 0.2em;
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            color:#fff;
            font-weight:bold;
            margin-left:2px;
            border:0;
            background: transparent;
            position:relative;
            top:1px;
          }

          i {
            font-size: 16px;
          }
        }
      }
    }

    .tagInput {
      margin-top: 2rem;
      padding: 20px;
      font-size: 16px;
      color: #555;
      letter-spacing: 0.05em;
      border: 0;
      width: 100%;
    }

    button.write {
      width: 1194px;
      background: var(--point);
      color: #fff;
      border: 0;
      padding: 20px 0;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.2em;
      margin-top: 2.5rem;
      cursor: pointer;
    }


  }


  .back {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2.5rem;

    button {
      color: var(--primary);
      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 0.2em;
      margin-top:10px;
      border: 0;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-weight: bold;
        margin-right: 10px;
      }
    }

  }

}

.list-enter-active,
.list-leave-active {
  transition: all .3s ease-in;
}
.list-enter-from{
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(0px);
}
</style>