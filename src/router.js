import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from './pages/login.vue'
import RegisterPage from './pages/register.vue'
import HomePage from './pages/home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: LoginPage
}, {
  path: '/register',
  component: RegisterPage
}, {
  path: '/home',
  component: HomePage
}];

export default new VueRouter({
  mode: 'history',
  routes
});