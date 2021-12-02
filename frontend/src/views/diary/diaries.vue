<template>
  <div class="diaries">
    <div class="wrapper">

      <div class="calendar">
        <v-calendar locale="en-US" :max-date="new Date()" :attributes="attributes" @update:from-page="pageChange" />
        <div class="today">
          <h2>The analyzed emotional status of the month is <span>{{ count.max }}</span></h2>

          <div class="barWrap">
            
              <div class="bar">
                <div class="happy" :style="[{'width': `${count.happy}%`}]" v-if="count.happy">
                  <span>{{ count.happy }}%</span><p><i class="xi-emoticon-happy-o"></i> happy</p>
                </div>
                <div class="sad" :style="[{'width': `${count.sad}%`}]" v-if="count.sad">
                  <span>{{ count.sad }}%</span>
                  <p><i class="xi-emoticon-sad-o"></i> sad</p>
                </div>
                <div class="angry" :style="[{'width': `${count.angry}%`}]" v-if="count.angry">
                  <span>{{ count.angry }}%</span>
                  <p><i class="xi-emoticon-devil-o"></i> angry</p>
                </div>
              </div>
          </div>

        </div>
      </div>

      <div class="content">
        <Spinner v-show="isLoading" class="spinner"></Spinner>
        <diary-content v-show="!isLoading" :date="date"></diary-content>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import DiaryContent from '../../components/Diaries.vue'
import Spinner from '../../components/Spinner.vue'

const colors = { happy: 'orange', sad: 'indigo', angry: 'red' }

export default {
  name: 'diaries',
  components: {
    DiaryContent,
    Spinner
  },
  setup() {
    const store = useStore()
    const date = ref({ date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) })
    const count = ref({ happy: 0, sad: 0, angry: 0, count: 0, max: '' })
    const isLoading = computed(() => store.state.isLoading)
    const attributes = computed(() => store.state.sortedDiaries[date.value.date].map(diary => ({
      dates: diary.createdAt,
      highlight: { color: colors[diary.result[0].sentiment], fillMode: 'light' },
      keyword: diary.result[0].sentiment
    })))
    
    const countChange = (list) => {
      count.value = { happy: 0, sad: 0, angry: 0, count: list.length, max: '' }
      for (const attr of list) { count.value[attr.keyword] = (count.value[attr.keyword] || 0) + 1 }
      count.value = {
        happy: Math.round((count.value.happy / count.value.count) * 100),
        sad: Math.round((count.value.sad / count.value.count) * 100),
        angry: Math.round((count.value.angry / count.value.count) * 100),
        count: list.length,
        max: Object.keys(count.value).find(key => count.value[key] === Math.max(...[count.value.happy, count.value.sad, count.value.angry]))
      }
    }
    countChange(attributes.value)

    const pageChange = (obj) => {
      date.value.date = obj.year + '-' + ('0' + obj.month).slice(-2)
      countChange(attributes.value)
    }

    return {
      date,
      count,
      isLoading,
      attributes,
      pageChange
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.diaries {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin:50px 0;
}

.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 8px solid;
  border-color: var(--point);
  width: 1194px;
  height: 965px;
}

.calendar {
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .today {
    width: 100%;

    h2 {
      margin: 0 80px !important;
      padding-top: 50px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 16px;
      color: #bebebe;
      font-weight: 500;

      span {
        color: var(--point);
      }
    }


    p {
      display: flex;
      flex-direction: row;
      justify-content: center;

      span {
        margin: 0 2rem;
        padding: 0.2rem 0.8rem 0.3rem;
        display: flex;
        align-items: center;
        border-radius: 100px;
        font-size:16px;
        font-weight:500;
        letter-spacing: 0.1rem;
        
        i {
          font-size:20px;
        }
      }

      span:nth-child(1) {
        background: #feebc8;
      }

      span:nth-child(2) {
        background: #c3dafe;
      }

      span:nth-child(3) {
        background: #fed7d7;
      }
    }

  }

}

.content {
  background: #fff;
  margin-left: 5px;
  width: 100%;
}


.barWrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2.5rem 80px 2.5rem;
}

.bar {
  width: 100%;
  height: 1.2rem;
  background-color: #eee;
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1rem;
    color: #8d8d8d;
    font-weight: 500;

    span {
      margin: 2px 0 0 1px;
      font-size: 14px;
      color: var(--primary);
    }

    p {
      font-size: 14px;
      margin: 1rem 0 0 -0.5em;

      i {
        font-size: 16px;
        margin-right: 0.1rem;
        font-weight: 400;
      }

      ;
    }
  }
}

.bar div:first-child {
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
}

.bar div:last-child {
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

.happy {
  height: 100%;
  background-color: #feebc8;
}

.sad {
  height: 100%;
  background-color: #c3dafe;
}

.angry {
  height: 100%;
  background-color: #fed7d7;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>