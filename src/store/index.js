import Vue from 'vue'
import Vuex from 'vuex'

import sites from './modules/sites'
import searchResults from './modules/search-results'
import myList from './modules/my-list'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    sites: sites,
    searchResults: searchResults,
    myList: myList
  }
})