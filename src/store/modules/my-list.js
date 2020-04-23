import axios from 'axios';

export default {
  namespaced: true,

  state: {
    lists: [],
    activeListId: null,
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
          context.commit('selectItems', res.data);
        }).catch(err => {
          console.log(err);
        });
    },
    deleteITemFromList(context, itemId) {

    },
    setActiveListId(context, listId) {
      context.commit('setActiveListId', listId)
    }
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
      state.selectedItems = lists[0].items;
      state.selectedItemIds = lists[0].items.map(item => item.id);
    },
    createList(state, list) {
      state.lists.push({ id: list.id, user_id: list.user_id, items: [] });
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(list => list.id != listId);
    },
    selectItems(state, items) {
      state.lists = state.lists.map(list => {
        if (list.id == state.activeListId) {
          list.items = items;
        }
        return list;
      });
      state.selectedItems = items;
      console.log(items)
      state.selectedItemIds = items.map(item => item.id);
    },
    setActiveListId(state, listId) {
      state.activeListId = listId;
    }
  }
}