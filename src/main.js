import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import axios from './axios/axios'

Vue.prototype.$axios = axios
//全局引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(require('vue-moment'));


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
