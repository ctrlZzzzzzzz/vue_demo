import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import ZkTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', ZkTable)

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://192.168.1.18:8080'
// axios.defaults.withCredentials = true
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
