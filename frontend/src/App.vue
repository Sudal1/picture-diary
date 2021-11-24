<template>
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

a,
button {
  cursor: pointer;
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

// Quill custom
.ql-toolbar {
  border-bottom: 1px dashed #d1d5db !important;
  font-family: 'Roboto' !important;
  padding: 13px 8px !important;
}

.ql-size-large {
  font-size: 24px !important;
}

.ql-container {

  .ql-editor {
    font-size: 16px !important;
    letter-spacing: 0.05em;
    line-height: 1.5;
    font-family: 'Roboto' !important;
    color: #555;
    background: #fff;

    .ql-size-small {
      font-size: 12px !important;
    }

    .ql-size-normal {
      font-size: 16px !important;
    }



    .ql-size-huge {
      font-size: 36px !important;
    }
  }

  .ql-blank {
    background: #fff;
  }

}

// v-calendar custom
.vc-container {
  width: 100%;
  border: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  font-family: 'Roboto' !important;

  .vc-header {
    .vc-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--point);
      letter-spacing: 0.03em !important;
      margin-bottom: 60px;
    }
  }

  .vc-arrows-container>div>.vc-svg-icon {
    color: var(--point) !important;
    height: 35px !important;
    position: relative;
    top: -4px;
    margin: 0 5px;
  }

  .vc-weeks {

    .vc-weekday,
    .vc-day,
    .vc-day-content {
      color: #bebebe !important;
      font-size: 23px !important;
      font-weight: 400 !important;
      ;
    }

    .vc-weekday {
      font-weight: 700 !important;
      margin-bottom: 23px;
    }

    .vc-day {
      padding: 23px 0px !important;
    }

    .vc-highlight {
      padding: 23px;
      margin-left: 1px;
    }

    .vc-focusable {
      background: transparent !important;
    }

  }

  .vc-popover-content-wrapper {

    .vc-popover-content.direction-bottom {
      margin-top: 30px;
    }

    .vc-nav-popover-container {
      background: var(--point) !important;
      border: 0;
      outline: none;
      box-shadow: none;
      border-radius: 0;
      padding: 15px;

      .vc-nav-arrow {
        color: #fff;
      }
    }

    .vc-nav-header {

      .vc-nav-title,
      .vc-nav-title:hover,
      .vc-nav-arrow,
      .vc-nav-arrow:hover {
        background: transparent;
        border: 0;
        outline: 0;
      }

      .vc-nav-title {
        font-size: 16px;
        padding: 3px 0 0;
      }
    }

    .vc-nav-items {
      margin-top: 12px;

      .vc-nav-item {
        border: 0;
        outline: none;
        box-shadow: 0 !important;
        margin: 5px;
      }

      .vc-nav-item:hover {
        background: #fff;
        color: var(--point);
        transition: all 0.35s;
      }

      .vc-nav-item.is-active {
        border: 0;
        outline: 0;
        color: var(--point);
        box-shadow: none;
      }
    }

  }

}
</style>
