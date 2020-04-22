<template>
  <a-layout class="my-list">
    <a-row>
      <a-col :span="24">
        <h3 class="title">My List</h3>
      </a-col>

      <a-col class="list-tabs-container" :span="24">
        <div :style="{ marginBottom: '16px' }">
          <a-button type="primary" @click="newList">Create a new list</a-button>
        </div>

        <a-tabs hideAdd v-model="activeListId" type="editable-card" @edit="onUpdateListTab">
          <a-tab-pane
            v-for="listTab in listTabs"
            :tab="listTab.title"
            :key="listTab.id"
            :closable="listTab.closable"
          >{{ listTab.id }}</a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      listTabs: [],
      activeListId: null
    };
  },
  beforeMount() {
    this.getLists(this.userId);
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      lists: state => state.myList.lists
    })
  },
  methods: {
    ...mapActions("myList", ["getLists", "createList", "deleteList"]),
    newList() {
      this.createList(this.userId);
    },
    onUpdateListTab(listId, action) {
      if (action == "remove") {
        this.deleteList({ id: listId, userId: this.userId });
      }
    }
  },
  watch: {
    lists(newLists) {
      this.listTabs = [];

      newLists.forEach(list => {
        this.listTabs.push({
          id: list.id,
          title: `My List ${list.id}`,
          items: [],
          totalCount: []
        });
      });

      if (!this.activeListId)
        this.activeListId = this.listTabs.length ? this.listTabs[0].id : null;
    }
  }
};
</script>

<style scoped>
.my-list {
  height: 100%;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
}
.title {
  color: #0f0f0f;
  background-color: #f7f7f7;
  border-bottom: 1px solid #c1c1c1;
  padding: 10px 15px;
  margin: 0px;
}
.list-tabs-container {
  padding: 15px;
}
</style>