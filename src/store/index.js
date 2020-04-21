import Vue from 'vue'
import Vuex from 'vuex'

import sites from './modules/sites'
import searchResults from './modules/search-results'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sites: sites,
    searchResults: searchResults
  }
})