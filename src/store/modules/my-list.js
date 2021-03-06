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
        .then((res) => {
          context.commit('setLists', res.data);
        })
        .catch(() => {
          context.commit('setLists', []);
        });
    },
    createList(context, userId) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/user-list",
          { 'userId': userId }
        ).then((res) => {
          context.commit('createList', res.data)
        }).catch(() => { });
    },
    deleteList(context, payLoad) {
      axios
        .delete(
          process.env.VUE_APP_API_ENDPOINT + "/user-list",
          { data: payLoad }
        ).then(() => {
          context.commit('deleteList', payLoad['id']);
        }).catch(() => { });
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
        }).catch(() => { });
    },
    deleteItemFromList(context, payLoad) {
      axios
        .delete(
          process.env.VUE_APP_API_ENDPOINT + "/user-list/delete-item",
          { data: payLoad }
        ).then(() => {
          context.commit('deleteItemFromList', payLoad)
        }).catch(() => { });
    },
    setActiveListId(context, listId) {
      context.commit('setActiveListId', listId)
    },
    setItemListName(context, payLoad) {
      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/user-list/change-name",
          payLoad
        ).then(() => {
          context.commit('setItemListName', payLoad);
        }).catch(() => { });
    }
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
      state.selectedItems = lists.length ? lists[0].items : [];
      state.selectedItemIds = lists.length ? lists[0].items.map(item => item.id) : [];
    },
    createList(state, list) {
      state.lists.push({ id: list.id, user_id: list.user_id, items: [], name: list.name });
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(list => list.id != listId);
      if (state.lists.length)
        state.activeListId = state.lists[state.lists.length - 1].id;
    },
    selectItems(state, items) {
      state.lists = state.lists.map(list => {
        if (list.id == state.activeListId) {
          list.items = items;
        }
        return list;
      });
      state.selectedItems = items;
      state.selectedItemIds = items.map(item => item.id);
    },
    setActiveListId(state, listId) {
      state.activeListId = listId;
    },
    deleteItemFromList(state, payLoad) {
      const listId = payLoad['listId'];
      const itemId = payLoad['itemId'];

      state.lists = state.lists.map(list => {
        if (list.id == listId) {
          list.items = list.items.filter(item => item.id != itemId);
        }

        return list;
      })
      state.selectedItems = state.selectedItems.filter(item => item.id != itemId);
      state.selectedItemIds = state.selectedItemIds.filter(_itemId => _itemId != itemId);
    },
    setItemListName(state, payLoad) {
      state.lists = state.lists.map(list => {
        if (list.id == payLoad['listId'])
          list.name = payLoad['listName'];

        return list;
      })
    }
  }
}