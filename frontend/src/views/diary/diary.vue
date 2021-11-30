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
              :video-id="vid"
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
            <p>
            <i :class="m[0].icon"></i>
            {{ m[0].tag }}
            </p>
            <k-progress class="progress"
              status="error" 
              type="line"
              :border="true"
              :color="'#8aa594'"
              :percent="m[0].percent"
              :line-height="14">
            </k-progress>

            <div v-for="item in keywords" :key="item">
              <p>
              <i :class="item.icon"></i>
              {{ item.tag }}
              </p>
              <k-progress class="progress"
                status="warning" 
                type="line"
                :border="true"
                :color="'#ddd'"
                :percent="item.percent"
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
            <router-link :to="{ name: 'editor', params: { id: diary.id } }">
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
<!--
        <div class="progress">

           <h2 class="keyword">Keyword</h2>

          {{ percents[2].tag }}
           <k-progress class="progress"
            status="error" 
            type="line"
            :border="true"
            :color="'#8aa594'"
            :percent="percents[2].percent"
            :line-height="12">
           </k-progress>

            <div v-for="item in percents" :key="item">
             {{ item.tag }}
             <k-progress class="progress"
             status="warning" 
             type="line"
             :border="true"
             :color="'#ddd'"
             :percent="item.percent"
             :line-height="12">
             </k-progress>
            </div> 

        </div>
-->       
    </div>

      <Dialog ref="Dialog"></Dialog>
    </div>

    <button class="back" @click="$router.push({ name: 'diaries' })"><i class="xi-angle-left"></i>back to
      previous</button>

  </div>

</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'diary',
  components: {
    Dialog
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const Dialog = ref(null)
    const Player = {
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      modestbranding: 1,
      start: 1,
      ref: 0
    }
    const diary = computed(() => store.state.diaries.find(elem => String(elem.diaryIdx) === route.params.id))
    const state = reactive({
      year: dayjs(diary.value.createdAt).format('YYYY'),
      month: dayjs(diary.value.createdAt).format('MMMM'),
      day: dayjs(diary.value.createdAt).format('D'),
      time: dayjs(diary.value.createdAt).format('A hh:mm')
    })
    
    const vid = 'PO0vpohz53M'
    const percents = [
      {
        percent: 10,
        tag: 'happy'
      },
      {
        percent: 20,
        tag: 'sad'
      },
      {
        percent: 70,
        tag: 'angry'
      }
    ]
    for (const keyword of percents) {
      if (keyword.tag === 'happy') {
        keyword.icon = 'xi-emoticon-happy-o'
      } else if (keyword.tag === 'sad') {
        keyword.icon = 'xi-emoticon-sad-o'
      } else {
        keyword.icon = 'xi-emoticon-devil-o'
      }
    }
    const m = percents.filter((item) => {
      return item.percent === Math.max.apply(Math, percents.map((item) => item.percent))
    })
    const keywords = percents.filter((item) => item.percent !== m[0].percent)

    const submit = async () => {
      try {
        const ok = await Dialog.value.show({
          title: 'Delete this diary',
          message: 'Are you sure you want to delele this diary?',
          okButton: 'Yes'
        })
        if (ok) {
          const response = await store.dispatch('delDiary', diary.value.id)
          response.data ? router.push({
            name: 'diaries'
          }) : alert('Cannot delete diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }

    return {
      Dialog,
      Player,
      diary,
      state,
      vid,
      percents,
      keywords,
      submit,
      m
    }
  }
}
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 8px solid;
  border-color: var(--point);
  width: 1194px;
  height: 100%;
}

.recommend {
  display: flex;
  flex-direction: column;
  flex:1.125;

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
  flex:1;

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
    height: 625px;

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




</style>