<template>
  <div class="wrapper">

    <form class="bg-white shadow-md rounded" @submit.prevent>
      <div class="mb-4">
        <v-date-picker v-model="range" :masks="masks" is-range>
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="calendar">
              <div class="relative flex-grow">
                <i class="xi-calendar"></i>
                <input class="flex-grow bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.start"
                  v-on="inputEvents.start" />
              </div>
              <span class="flex-shrink-0 m-2">
                <i class="xi-long-arrow-right"></i>
              </span>
              <div class="relative flex-grow">
                <i class="xi-calendar"></i>
                <input class="flex-grow bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.end"
                  v-on="inputEvents.end" />
              </div>
            </div>
          </template>
        </v-date-picker>
      </div>
    </form>

    <div class="btns">
      <router-link :to="{ name: 'editor' }" class="write">
        <button>Write</button>
      </router-link>
    </div>

    <div class="content">
      <diary-content :modelValue="range"></diary-content>
    </div>

  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import DiaryContent from '../../components/Diaries.vue'

export default {
  name: 'diaries',
  components: {
    DiaryContent
  },
  setup() {
    const store = useStore()
    const page = ref(1)
    const range = reactive({
      start: dayjs(new Date().setMonth(new Date().getMonth() - 1)).format('YYYY-MM-DD'),
      end: dayjs(Date.now()).format('YYYY-MM-DD')
    })
    const masks = reactive({
      input: 'YYYY-MM-DD'
    })
    const diaries = computed(() => store.state.diaries)

    // this.getDiaries({ page: page, range: range, limit: 10 })

    return { page, range, masks, diaries }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.calendar {
  display: flex;
  flex-direction: row;
  padding-bottom: 2rem;
  justify-content: center;
  margin-left: -1.5px;

  i {
    margin: 1rem 1rem 0 0;
  }

  .xi-long-arrow-right {
    margin: 1rem 2.5rem 1rem 3rem;
  }
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
}

.content {
  padding: 2rem 5rem 0;
}
</style>