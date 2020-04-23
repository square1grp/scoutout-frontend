import axios from 'axios';

export default {
  namespaced: true,

  state: {
    allCategories: [{
      id: 'department-store',
      title: 'Department store'
    }, {
      id: 'tech',
      title: 'Tech'
    }, {
      id: 'household',
      title: 'Household'
    }, {
      id: 'hardware',
      title: 'Hardware'
    }, {
      id: 'chemist',
      title: 'Chemist'
    }, {
      id: 'supermarket',
      title: 'SuperMarket'
    }, {
      id: 'liquor',
      title: 'Liquor'
    }, {
      id: 'sporting',
      title: 'Sporting'
    }],
    allSites: []
  },
  actions: {
    getAllSites(context) {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/sites').then((res) => {
        context.commit('setAllSites', res.data);
      }).catch(() => {
        context.commit('setAllSites', [])
      })
    }
  },
  mutations: {
    setAllSites(state, sites) {
      state.allSites = sites
    }
  }
}