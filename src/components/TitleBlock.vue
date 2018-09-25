<template lang="pug">
  .title.row
    h1 {{title}}
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"
  .title
    font-size 200%
    font-weight bold
    color $primary-color

</style>
