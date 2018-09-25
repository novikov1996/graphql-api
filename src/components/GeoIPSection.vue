<template lang="pug">
  section#geo.tab-content
    title-block(title="Search by IP")
    search-block(placeholder="Please input IP", @search="search")
    .result-block.row
      p {{result ? `Search result: country: ${result.country}, IP: ${result.ip}` : `The result will be here`}}
    table-block(v-if="showTable",title="Search history", :data="results", :cols="cols")
</template>

<script>
  import gql from 'graphql-tag'
  import moment from 'moment'
  import TitleBlock from './TitleBlock'
  import SearchBlock from './SearchBlock'
  import TableBlock from './TableBlock'
  import ls from '../mixins/local-storage'

  const getGeoData = gql`query getLocation($ip: String!) {
            getLocation(ip: $ip) {
              country {
                names {
                  en
                }
                geoname_id
                iso_code
              }
              location {
                latitude
                longitude
              }
            }
          }`

  export default {
    mixins: [ls],
    components: {TableBlock, SearchBlock, TitleBlock},
    data () {
      return {
        result: null,
        results: [],
        cols: [
          {prop: 'date', label: 'Date'},
          {prop: 'country', label: 'Country'},
          {prop: 'ip', label: 'IP'}
        ]
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
        this.setItemToLS('geo-results', this.results)
        this.setItemToLS('geo-result', this.result)
      },
      getResults () {
        this.results = this.getItemFromLS('geo-results') || []
        this.result = this.getItemFromLS('geo-result') || null
      },
      search (input) {
        this.$apollo.query({
          query: getGeoData,
          variables: {
            ip: input
          }
        }).then(({data: {getLocation: {country: {names}}}}) => {
          this.result = {country: names.en, ip: input, date: moment().format('hh:mm:ss  MM-DD-YYYY')}
          this.results = [this.result, ...this.results]
          this.setResults()
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/styles/variables.styl"
  .row
    margin-bottom 30px

  .title
    font-size 200%
    font-weight bold
    color $primary-color

  .result-block
    color $default-color

  .results-block
    label
      font-size 125%
      font-weight 600
      line-height 200%
      color $primary-color

</style>
