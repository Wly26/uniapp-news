import App from './App'
// 引入封装的请求
import api from './common/api'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 引入封装的请求
Vue.prototype.$api = api
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	store,
    app
  }
}
// #endif
