import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
  },
  actions: {
    searchItems: function (context, search_queries) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/search-items",
          search_queries
        )
        .then(function (res) {
          context.commit('setItems', res.data);
        })
        .catch(function (err) {
          console.log(err)
          context.commit('setItems', []);
        });
    }
  },
  mutations: {
    setItems: function (state, items) {
      state.items = items
    }
  }
}