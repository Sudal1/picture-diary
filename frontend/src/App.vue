<template>
  <div id="app">
    <router-view></router-view>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <dialog-box v-if="dialog.show"></dialog-box>
    </transition>
  </div>
</template>

<script>
import DialogBox from './components/PopupModal.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  mounted () {
    document.addEventListener('visibilitychange', this.changeTitle, false)
  },
  components: {
    DialogBox
  },
  computed: {
    ...mapState(['isLoading', 'dialog'])
  },
  methods: {
    changeTitle () {
      if (document.hidden) {
        document.title = 'Picture Diary'
      } else {
        document.title = '그림일기'
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&display=swap');
@import url('https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css');

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

:root {
  --primary-color: #838383;
  --error-color: #f23648;
  --error-bg-color: #fff;
  --success-color: #21a67a;
  --success-bg-color: #ffffff;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  font-size: 15px;
  color: #888;
}

#app a { font-size:14px; text-decoration: none; color:#888; }
#app input,button,textarea,select { font-size:14px; border: 1px solid #838383; background:#fff; color:#666; font-family: 'Roboto', 'Noto Sans KR', sans-serif !important; }
#app input,textarea,select { padding:15px; }
#app button { padding:15px 30px ; font-weight:bold; cursor: pointer; background: #e9eaff; }
#app label { font-weight:bold; width:60px; display: inline-block; color:#666; }

i { font-size:26px; position:relative; top:5px; }
</style>
