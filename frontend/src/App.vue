<template lang="en-US">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'

export default {
  name: 'app',
  setup () {
    onBeforeMount(() => {
      document.addEventListener('visibilitychange', changeTitle, false)
    })

    const changeTitle = () => {
      if (document.hidden) {
        document.title = 'SENSE DIARY'
      } else {
        document.title = 'SENSE DIARY'
      } 
    }

    return { changeTitle }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css');

:root {
  --primary: #565656;
  --point: #8aa594;
}

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

form,
label,
button,
a,
input,
h2,
::placeholder {
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
}

ul,
li {
  list-style: none;
  display: inline-flex;
}

html,
body {
  background-color: #e5eae7;
}

::-webkit-scrollbar {
  display: none;
}

</style>
