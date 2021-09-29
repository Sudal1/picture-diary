<template>
  <table>
    <thead>
      <tr>
        <th>제목</th>
        <th>태그</th>
        <th>날짜</th>
        <th>내용</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(diary, idx) in diaries" :key="idx">
        <router-link :to="{ name: 'editor', params: { id: diary.id } }" tag="td" class="title">{{ diary.title }}</router-link>
        <td>{{ diary.tags }}</td>
        <td>{{ diary.createdAt }}</td>
        <td>
          <router-link :to="{ name: 'editor', params: { id: diary.id } }" tag="i"></router-link>
          <i class="icon" @click="deleteConfirm(diary.id)"></i>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td @click="prePage">이전 페이지</td>
        <td colspan="2">{{page}} p</td>
        <td @click="nextPage">다음 페이지</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return { page: 1 }
  },
  computed: {
    ...mapState(['diaries', 'dialog'])
  },
  methods: {
    ...mapActions(['delDiary']),
    ...mapMutations(['setDialog']),
    nextPage() {
      this.page++
      this.$emit('addPage')
    },
    prePage() {
      if (!(this.page - 1)) {
        alert('첫 페이지 입니다.')
      } else {
        this.page--
        this.$emit('dropPage')
      }
    },
    deleteConfirm(id) {
      this.setDialog({
        info: '일기를 삭제하시겠습니까？',
        hasTwoBtn: true,
        show: true
      })
      new Promise((resolve, reject) => {
        this.dialog.resolveFn = resolve
        this.dialog.rejectFn = reject
      }).then(() => {
        this.delDiary({
          id: id,
          page: this.page,
          route: this.$route
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

table {
  border-left: 0.1875rem solid rgb(129, 216, 208);
  border-right: 0.1875rem solid rgb(129, 216, 208);
  margin: 0 auto;
  text-align: center;
  max-height: 25rem;
  min-width: 70%;

  th,
  td {
    width: 25%;
  }

  thead,
  tfoot {
    color: darkturquoise;
  }

  tbody {
    color: #ffffff;
  }

  tr {
    height: 2.5rem;
    line-height: 1.875rem;
  }

  i {
    font-size: 1.25rem;
    margin-right: 0.625rem;
    color: rgb(129, 216, 208);
    cursor: pointer;

    &:hover {
      color: #ffc520;
    }
  }

  tfoot tr td:nth-child(1),
  tfoot tr td:nth-child(3) {
    cursor: pointer;

    &:hover {
      color: #ffc520;
    }
  }
}

.title {
  cursor: pointer;

  &:hover {
    color: #ffc520;
  }
}

</style>