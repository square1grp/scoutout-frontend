import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/style.css'

import router from './router'

import store from './store/'

Vue.config.productionTip = false
Vue.use(Antd)

console.log(process.env)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
