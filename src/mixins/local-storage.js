export default {
  methods: {
    setItemToLS (key, value) {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    getItemFromLS (key) {
      return JSON.parse(window.localStorage.getItem(key))
    }
  }
}
