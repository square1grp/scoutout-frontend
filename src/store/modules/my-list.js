import axios from 'axios';

export default {
  namespaced: true,

  state: {
    lists: [],
  },
  actions: {
    getLists(context, userId) {
      axios
        .get(
          process.env.VUE_APP_API_ENDPOINT + "/user-list",
          { params: { 'userId': userId } }
        )
        .then(function (res) {
          context.commit('setLists', res.data);
        })
        .catch(function (err) {
          console.log(err);
          context.commit('setLists', []);
        });
    },
    createList(context, userId) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/user-list",
          { 'userId': userId }
        ).then(function (res) {
          context.commit('createList', res.data)
        }).catch(function (err) {
          console.log(err);
        });
    },
    deleteList(context, payLoad) {
      axios
        .delete(
          process.env.VUE_APP_API_ENDPOINT + "/user-list",
          { data: payLoad }
        ).then((res) => {
          console.log(res);
          context.commit('deleteList', payLoad['id']);
        }).catch(err => console.log(err));
    }
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
    },
    createList(state, list) {
      state.lists.push(list);
    },
    deleteList(state, listId) {
      console.log(listId)
      state.lists = state.lists.filter(list => list.id != listId);
    }
  }
}