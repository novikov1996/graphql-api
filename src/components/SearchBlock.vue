<template lang="pug">
    .search-block.row
      el-input.geo-input(:placeholder="placeholder" v-model="input")
        el-button(slot="append", icon="el-icon-search" @click="$emit('search', input)")
</template>

<script>
  export default {
    props: {
      placeholder: String
    },
    data () {
      return {
        input: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"
</style>
