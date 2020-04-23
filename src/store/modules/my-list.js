import axios from 'axios';

export default {
  namespaced: true,

  state: {
    lists: [],
    selectedItemIds: [],
    selectedItems: [],
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
    },
    selectItems(context, items) {
      context.commit('selectItems', items);
    },
    addItemsToList(context, payLoad) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/user-list/add-items",
          payLoad
        ).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err);
        });
    }
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
      state.selectItems = lists[0].items;
      state.selectedItemIds = []
      lists[0].items.forEach(item => {
        state.selectedItemIds.push(item.id);
      });
    },
    createList(state, list) {
      state.lists.push(list);
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(list => list.id != listId);
    },
    selectItems(state, items) {
      items.forEach(item => {
        if (!state.selectedItemIds.includes(item.id)) {
          state.selectedItems.push(item);
        }
      });
    },
  }
}