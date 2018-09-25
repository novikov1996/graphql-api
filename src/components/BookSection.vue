<template lang="pug">
  section#book.tab-content
    title-block(title="Book search")
    search-block(placeholder="Please input the title of book", @search="search")
    table-block(
    title="Saved Books", :data="savedBooks", :cols="cols",
    @action="remove",
    icon="el-icon-circle-close-outline")
    table-block(
    v-if="showTable"
    title="Search results", :data="results", :cols="cols",
    @action="addToSavedList",
    icon="el-icon-circle-plus-outline")
</template>

<script>
  import TitleBlock from './TitleBlock'
  import SearchBlock from './SearchBlock'
  import TableBlock from './TableBlock'
  import ls from '../mixins/local-storage'
  export default {
    components: {TableBlock, SearchBlock, TitleBlock},
    mixins: [ls],
    data () {
      return {
        results: [],
        cols: [
          {prop: 'title', label: 'Title'},
          {prop: 'author', label: 'Author'}
        ],
        action: {
          icon: ''
        },
        savedBooks: []
      }
    },
    created () {
      this.getResults()
    },
    computed: {
      showTable () {
        return !!this.results.length
      }
    },
    methods: {
      setResults () {
        this.setItemToLS('saved-books', this.savedBooks)
      },
      getResults () {
        this.savedBooks = this.getItemFromLS('saved-books') || []
      },
      addToSavedList ({row}) {
        this.savedBooks.push(row)
        this.setResults()
      },
      remove (row, i) {
        this.savedBooks.splice(i, 1)
        this.setResults()
      },
      search (input) {
        this.$http.get('http://openlibrary.org/search.json', {
          params: {
            title: input
          }
        }).then(({data: {docs}}) => {
          this.results = docs.map(b => ({title: b.title, author: b.author_name}))
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"
</style>
