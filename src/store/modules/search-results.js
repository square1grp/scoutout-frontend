import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
    totalCount: 0,
    lastQueries: {}
  },
  actions: {
    searchItems(context, queries) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/search-items",
          queries
        )
        .then((res) => {
          context.commit('setSearchResults', { items: res.data['items'], totalCount: res.data['totalCount'], queries });
        })
        .catch(() => {
          context.commit('setSearchResults', { items: [], totalCount: 0, queries });
        });
    }
  },
  mutations: {
    setSearchResults(state, data) {
      state.items = data['items'];
      state.totalCount = data['totalCount'];
      state.lastQueries = data['queries'];
    }
  }
}