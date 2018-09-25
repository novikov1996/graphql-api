<template lang="pug">
  main.page
    .container
      el-tabs(type="card")
        el-tab-pane(label="GEO IP")
          geo-i-p-section
        el-tab-pane(label="Books")
          book-section

</template>

<script>
  import GeoIPSection from '../components/GeoIPSection'
  import BookSection from '../components/BookSection'

  export default {
    components: {
      BookSection,
      GeoIPSection
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"
</style>
