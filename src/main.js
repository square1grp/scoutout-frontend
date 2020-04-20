import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/style.css'

import LoginPage from './pages/login.vue'
import HomePage from './pages/home.vue'

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: LoginPage
}, {
  path: '/home',
  component: HomePage
}];

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
