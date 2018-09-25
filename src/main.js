import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/common.styl'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {locale})

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'https://api.graphloc.com/graphql'
  })
})

Vue.use(VueApollo)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: {App},
  template: '<App/>'
})
