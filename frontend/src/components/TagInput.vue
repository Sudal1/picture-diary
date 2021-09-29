<template>
  <div class="tag_div" v-if="show">
    <input type="text" class="newInput" placeholder="Tag" v-model="tagContent" onfocus="this.placeholder=''"
      @blur="isRepeated" @keydown.enter="addTag" />
    <button class="submit-btn" @click="delTag">Del Tag</button>
    <button class="submit-btn" @click="addTag" v-if="index === tags.length - 1">Add Tag(Enter)</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return { show: true }
  },
  props: {
    tags: Array,
    index: Number
  },
  computed: {
    tagContent: {
      get() { return this.tags[this.index] },
      set(value) { this.$emit('update:tags', value) }
    }
  },
  methods: {
    ...mapMutations(['setDialog']),

    delTag() {
      this.$emit('delTag:tags', this.index)
    },

    addTag() {
      this.$emit('addTag:tags', '')
      setTimeout(() => {
        document.getElementsByClassName('newInput')[this.index + 1].focus() 
      }, 0)
    },

    isRepeated() {
      let currentIndex = this.index
      const currentValue = this.tags[currentIndex]
      while (currentIndex) {
        if (currentValue.toLowerCase() === this.tags[currentIndex - 1].toLowerCase()) { 
          this.setDialog({
            info: 'The same tag cannot be repeated.',
            hasTwoBtn: false,
            show: true
          })
          this.$emit('is-repeated:tags', this.index)
          // this.tags.splice(this.index, 1, '')
          break
        } else {
          currentIndex--
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.tag_div {
  position: relative;
  display: inline-block;

  &:hover i.icon-shanchu1 {
    opacity: 1;
    transition: 1s;
  }

  .newInput {
    border: none;
    border-bottom: 0.125rem solid rgb(129, 216, 208);
    outline: none;
    background: transparent;
    color: #ffffff;
    margin-bottom: 0.625rem;
    margin-right: 0.3125rem;
    text-align: center;
    width: 6.25rem;
    height: 1.875rem;
    font-size: 1rem;
  }
}

.submit-btn {
  background: var(--primary-color);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

</style>