<template lang="pug">
    .table.row
      label {{title}}
      el-table(:data="data" style="width: 100%" border)
        el-table-column(v-for="{prop, label}, i in cols" :prop="prop", :label="label")
        el-table-column(v-if="icon", fixed="right", label="Operations" width="100" align="center")
          template(slot-scope="{row, $index}")
            i.action(:class="icon", @click="$emit('action', {row, $index})")
</template>

<script>
  export default {
    props: {
      title: String,
      data: Array,
      cols: Array,
      icon: {
        type: String,
        default: null
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"

  .table
    label
      font-size 125%
      font-weight 600
      line-height 200%
      color $primary-color

  .action
    cursor pointer
    font-size 200%
</style>
