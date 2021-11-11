<template>
  <div class="diaryView">
    <div class="wrapper">

      <div class="recommend">

        <div class="music">

          <div class="info">
            <h2>Music</h2>
            <p>We <span>recommend</span> this music</p>
            <p>Analyzed by our products</p>
          </div>

          <div class="youtube">
            <youtube-iframe
              :video-id="diary.vid"
              :player-width="502"
              :player-height="290"
              :player-parameters="Player"
            ></youtube-iframe>
          </div>

          <div class="etc">
            <ul v-for="tag in diary.tags" :key="tag">
              <li># {{ tag }}</li>
            </ul>
            <p>We analyzed your sentiment with the following keywords.</p>
          </div>

        </div>

        <div class="media">

          <div class="info">
            <h2>Media</h2>
            <p>We <span>recommend</span> this media</p>
            <p>Analyzed by our products</p>
          </div>

          <div class="youtube">
            <youtube-iframe
              :video-id="vid"
              :player-width="502"
              :player-height="290"
              :player-parameters="Player"
            ></youtube-iframe>
          </div>

          <div class="etc">
            <ul v-for="tag in diary.tags" :key="tag">
              <li># {{ tag }}</li>
            </ul>
            <p>We analyzed your sentiment with the following keywords.</p>
          </div>

        </div>

      </div>

      <div class="contents">

        <div class="title">
          <div class="createdAt">{{ state.year }} <span>{{ state.month }}</span> {{ state.day }}</div>
          <h2>{{ diary.title }}</h2>
        </div>

        <div class="content">{{ diary.content }}</div>

        <div class="etc">
          <div class="time">{{ state.time }}</div>
          <div class="btns">
            <router-link :to="{ name: 'editor', params: { id: diary.id } }">
              <button style="margin-right:20px;">Edit</button>
            </router-link>
            <button @click="submit()">Del</button>
          </div>
        </div>

        <ul v-for="tag in diary.tags" :key="tag">
          <li>#{{ tag }}</li>
        </ul>

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
    const diary = computed(() => store.state.diary)
    const state = reactive({
      year: dayjs(diary.value.createdAt).format('YYYY'),
      month: dayjs(diary.value.createdAt).format('MMMM'),
      day: dayjs(diary.value.createdAt).format('D'),
      time: dayjs(diary.value.createdAt).format('A hh:mm')
    })
    const Player = { 
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      modestbranding: 1,
      start: 1,
      ref: 0
    }
    const vid = 'GknKBj6b79I'

    // store.dispatch('getDiary', route.params.id)

    const submit = async () => {
      try {
        const ok = await Dialog.value.show({
          title: 'Delete this diary',
          message: 'Are you sure you want to delele this diary?',
          okButton: 'Yes'
        })
        if (ok) {
          const response = await store.dispatch('delDiary', diary.value.id)
          response.data ? router.push({ name: 'diaries' }) : alert('Cannot delete diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }

    return { diary, state, Dialog, Player, vid, submit }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.diaryView {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 110px 0;
}

.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 8px solid;
  border-color: var(--point);
  width: 1194px;
}

.recommend {
  width: 100%;

  .music {
    background: #fff;
    padding: 52px 37px;
  }

  .media {
    margin-top: 5px;
    background: #fff;
    padding: 52px 37px;
  }

  .info {
    border-left: 3px solid;
    border-color: var(--point);
    padding-left: 18px;

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

  .youtube {
    margin: 40px 0;
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
  width: 100%;
  margin-left: 5px;
  padding: 52px 37px;

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

  .content {
    color: #9f9f9f;
    font-size: 16px;
    line-height: 1.8;
  }

  .etc {
    padding: 25px 0;
    border-bottom: 1px solid #d6d6d6;
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
      }
    }

    .time {
      font-style: italic;
      text-transform: lowercase;
      width: 100%;
    }
  }

  ul {
    font-size: 14px;
    color: var(--point);
    font-family: 'Roboto Condensed', sans-serif;
    letter-spacing: 0.1em;
    margin-right: 5px;
    padding: 25px 0 0;
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