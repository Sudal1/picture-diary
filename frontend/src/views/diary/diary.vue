<template>
  <div class="diaryView">
    <div class="wrapper">
      <div class="recommend">

        <div class="media">
          <div class="info">
            <h2>Media</h2>
            <p>We <span>recommend</span> this media</p>
            <p>Analyzed with our products</p>
          </div>
          <div class="youtube">
            <youtube-iframe
              :key="JSON.stringify(diary.vid)"
              :video-id="diary.vid"
              :player-width="518"
              :player-height="292"
              :player-parameters="Player"
            ></youtube-iframe>
          </div>
        </div>

        <div class="keyword">
          <div class="info">
            <h2>Sentiment</h2>
            <p>We <span>recommend</span> this media</p>
            <p>based on the analysis below</p>
          </div>
          <div class="progressWrap">
            <div v-for="keyword in state.happyKeyword" :key="keyword">
              <p><i :class="keyword.icon"></i>{{ keyword.sentiment }}</p>
              <k-progress class="progress"
                type="line"
                :border="true"
                :color="keyword.sentiment === diary.sentiment ? '#8aa594' : '#ddd'"
                :percent="keyword.percent"
                :line-height="14">
              </k-progress>
            </div> 
            
            <div v-for="keyword in state.otherKeywords" :key="keyword">
              <p><i :class="keyword.icon"></i>{{ keyword.sentiment }}</p>
              <k-progress class="progress"
                type="line"
                :border="true"
                :color="keyword.sentiment === diary.sentiment ? '#8aa594' : '#ddd'"
                :percent="keyword.percent"
                :line-height="14">
              </k-progress>
            </div>
          </div>  
        </div>

      </div>

      <div class="contents">
        <div class="title">
          <div class="createdAt">{{ state.year }} <span>{{ state.month }}</span> {{ state.day }}</div>
          <h2>{{ diary.title }}</h2>
        </div>

        <div class="diaryContent" v-html="diary.content"></div>

        <div class="etc">
          <div class="time">{{ state.time }}</div>
          <div class="btns">
            <router-link :to="{ name: 'editor', params: { date: curDate, id: diary.diaryIdx } }">
              <button style="margin-right:20px;"><i class="material-icons">edit</i> Edit</button>
            </router-link>
            <button @click="submit()"><i class="material-icons">delete</i> Del</button>
          </div>
        </div>

        <div class="tag">
          <ul v-for="tag in diary.tags" :key="tag">
            <li>#{{ tag }}</li>
          </ul>
        </div>
      </div>

    </div>
    <Dialog ref="Dialog"></Dialog>
    <div class="page">
      <button @click="prevPage"><i class="material-icons" :style="[curIdx>0 ? {'color':'var(--point)','cursor':'pointer'} : {'color':'#ddd','cursor':'default'}]">arrow_back_ios_new</i></button>
      <button @click="nextPage"><i class="material-icons" :style="[curIdx<curDateDiaries.length-1 ? {'color':'var(--point)','cursor':'pointer'} : {'color':'#ddd','cursor':'default'}]">arrow_forward_ios</i></button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Dialog from '../../components/Dialog.vue'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default defineComponent({
  name: 'diary',
  components: {
    Dialog
  },
  props: {
    date: String,
    id: String
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const Dialog = ref(null)
    const Player = {
      origin: 'http://localhost:8080',
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      modestbranding: 1,
      start: 1,
      ref: 0
    }
    const curDate = computed(() => props.date)
    const curDateDiaries = computed(() => store.getters.getCurDateDiaries(curDate.value))
    const curIdx = computed(() => curDateDiaries.value.findIndex(diary => String(diary.diaryIdx) === props.id))
    const diary = computed(() => curDateDiaries.value[curIdx.value])

    store.commit('setDiary', diary.value)
    store.commit('setDiaryKeywordIcon', diary.value)
    
    const state = reactive({
      happyKeyword: computed(() => diary.value?.result.filter(keyword => keyword.sentiment === 'happy')),
      otherKeywords: computed(() => diary.value?.result.filter(keyword => keyword.sentiment !== 'happy')),
      year: computed(() => diary.value?.createdAt.slice(0, 4)),
      month: computed(() => months[diary.value?.createdAt.slice(5, 7) - 1]),
      day: computed(() => diary.value?.createdAt.slice(9, 10)),
      time: computed(() => diary.value?.createdAt.slice(-8))
    })

    onBeforeMount(() => {
      document.title = diary.value?.title
    })
    
    const submit = async () => {
      try {
        const ok = await Dialog.value.show({
          title: 'Delete this diary',
          message: 'Are you sure you want to delele this diary?',
          okButton: 'Yes'
        })
        if (ok) {
          const response = await store.dispatch('delDiary', diary.value.diaryIdx)
          response.data ? router.push({ name: 'diaries' }) : alert('Cannot delete diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }

    const prevPage = () => {
      const prevIdx = curIdx.value - 1
      if (curDateDiaries.value[prevIdx]) { router.push({ name: 'diary', params: { date: curDate.value, id: curDateDiaries.value[prevIdx].diaryIdx } }) }
    }

    const nextPage = () => {
      const nextIdx = curIdx.value + 1
      if (curDateDiaries.value[nextIdx]) { router.push({ name: 'diary', params: { date: curDate.value, id: curDateDiaries.value[nextIdx].diaryIdx } }) }
    }

    return {
      Dialog,
      Player,
      curIdx,
      curDate,
      curDateDiaries,
      diary,
      state,
      submit,
      prevPage,
      nextPage
    }
  }
})
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.diaryView {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 50px 0;
}

.wrapper {
  display: inline-flex;
  border-top: 8px solid;
  border-color: var(--point);
  width: 1194px;
}

.recommend {
  display: flex;
  flex-direction: column;

  .media {
    background: #fff;
    padding: 52px 37px;
  }

  .keyword {
    margin-top: 5px;
    background: #fff;
    padding: 52px 37px 44px;
    color: #8d8d8d;

    .progressWrap {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.1em;

      p {
        margin: 20px 0;

        i {
          font-size: 20px;
          position: relative;
          top:3px;
        }
      }
    }
  }

  .info {
    border-left: 3px solid;
    border-color: var(--point);
    padding-left: 18px;
    margin-bottom:40px;

    h2 {
      color: var(--point);
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 25px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      line-height: 19px;

    }

    p:nth-child(2) {
      font-size: 16px;
      color: #8d8d8d;
      font-weight: 500;
      letter-spacing: 0.03em;
      margin-bottom: 5px;

      span {
        color: var(--point);
      }
    }

    p:nth-child(3) {
      font-size: 14px;
      color: #9d9d9d;
      font-weight: 300;
      font-style: italic;
      letter-spacing: 0.03em;
    }
  }


  .etc {
    ul {
      font-size: 14px;
      color: var(--point);
      font-family: 'Roboto Condensed', sans-serif;
      letter-spacing: 0.1em;
      margin-right: 5px;
    }

    p {
      font-size: 12px;
      color: #979797;
      margin-top: 14px;
      letter-spacing: 0.05em;
    }
  }
}

.contents {
  background: #fff;
  margin-left: 5px;
  padding: 52px 37px;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  max-height:976px;

  .title {
    .createdAt {
      text-transform: uppercase;
      font-size: 16px;
      letter-spacing: 0.1em;

      span {
        color: var(--point);
        font-weight: 900;
      }
    }

    h2 {
      font-size: 20px;
      font-style: italic;
      letter-spacing: 0.03em;
      color: #8d8d8d;
      padding: 25px 0;
      border-bottom: 1px solid #d6d6d6;
      margin-bottom: 25px;
    }
  }

  .diaryContent {
    color: #9f9f9f;
    line-height: 1.8;
    overflow-y: scroll;
    padding-right:10px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 0px;
    }

    &::-webkit-scrollbar-track {
      width:6px;
      background-color: transparent;
    }
  }

  .etc {
    padding: 25px 0;
    color: #c1c1c1;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .btns {
      display: flex;
      flex-direction: row;

      button {
        border: 0;
        width: 100%;
        text-transform: uppercase;
        background: transparent;
        color: var(--point);
        font-weight: 700;
        letter-spacing: 0.1em;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;

        i {
          margin-right:5px;
          font-size:20px;
        }
      }
    }

    .time {
      font-style: italic;
      text-transform: lowercase;
      width: 100%;
    }
  }

  .tag {
    border-top: 1px solid #d6d6d6;
    padding-top: 25px;

    ul {
      font-size: 14px;
      color: var(--point);
      font-family: 'Roboto Condensed', sans-serif;
      letter-spacing: 0.1em;
      margin-right: 5px;
    }
  }

}

.back {
  color: var(--primary);
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  margin-top: 50px;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;

  i {
    font-weight: bold;
    margin-right: 10px;
  }
}

.page {
  width: 100%;
  position: absolute;
  top: calc(50% - 50px);

  button {
    border: 0;
    background: transparent;
    cursor: none;

    i {
      color: var(--point);
      font-size: 48px;
      font-weight: bold;
    }
  }

  button:nth-child(1) {
    position: absolute;
    left: 1%;
  }

  button:nth-child(2) {
    position: absolute;
    right: 1%;
  }

}
</style>