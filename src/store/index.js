import Vue from 'vue'
import Vuex from 'vuex'

import sites from './modules/sites'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sites: sites
  }
})