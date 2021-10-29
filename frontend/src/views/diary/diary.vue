<template>
  <div class="wrapper">

    <div class="title">
      <h2>{{ diary.title }}</h2>
    </div>

    <div class="info">
      <span><i class="xi-star"></i>{{ diary.author }}</span>
      <span><i class="xi-calendar"></i>{{ diary.createdAt }}</span>
    </div>

    <div class="content">{{ diary.content }}</div>

    <router-link :to="{ name: 'editor', params: { id: diary.id } }">
      <button style="margin-right:20px;">수정</button>
    </router-link>
    <button @click="submit()">삭제</button>
    <button @click="$router.push({ name: 'diaries' })" style="float:right;">목록</button>

    <Dialog ref="Dialog"></Dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Dialog from '../../components/Dialog.vue'

export default {
  name: 'diary',
  components: {
    Dialog
  },
  created() {
    // this.getDiary(this.$route.params.id)
  },
  computed: {
    ...mapState(['diary'])
  },
  methods: {
    ...mapActions(['getDiary', 'delDiary']),
    
    async submit() {
      try {
        const ok = await this.$refs.Dialog.show({
          title: 'Delete this diary',
          message: 'Are you sure you want to delele this diary?',
          okButton: 'Yes'
        })
        if (ok) {
          const response = await this.delDiary(this.diary.id)
          response ? this.$router.push({ name: 'diaries' }) : alert('Cannot delete diary(Server error).')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
h2 { font-style:italic; font-size:28px; text-align:center; margin-bottom:30px; color:#666 !important; }
.subject, .content, .tag { border-bottom:1px solid #888; }
.info { border-bottom:1px dotted #888; text-align:center; }
.info, .content, .tag { padding:20px 20px; }
.content { text-align:left; white-space: pre-line; padding:30px 0px; line-height:2.0; }
.postShow ul { display:inline-block; list-style: none; margin-right:20px; }
.tag ul:not(:last-child):after {
  content:",";
}
.info span { margin:0 20px; }
button { margin: 30px 0 0 0; }
.postShow i { font-size:20px; color:#c2c4ff; position: relative; top:4px; margin-right:10px; }
.subject i { position: relative; top:-0px; }
</style>