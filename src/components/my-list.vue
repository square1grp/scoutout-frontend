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

        <a-tabs
          hideAdd
          v-model="activeListId"
          type="editable-card"
          @change="changeListTab"
          @edit="onUpdateListTab"
        >
          <a-tab-pane
            v-for="listTab in listTabs"
            :tab="listTab.title"
            :key="listTab.id"
            :closable="listTab.closable"
          >
            <a-table
              :rowSelection="rowSelection"
              :columns="columns"
              :dataSource="listTab.items"
              :rowKey="record=>record.id"
              :pagination="pagination"
              :scroll="{ y: 390 }"
            />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

const columns = [
  {
    title: "Item",
    dataIndex: "item"
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "10%"
  },
  {
    title: "Store",
    dataIndex: "site",
    width: "15%",
    scopedSlots: { customRender: "site" }
  }
];

export default {
  data() {
    const rowSelection = {
      selectedRowKeys: [],
      onChange: (selectedRowKeys, selectedRows) => {
        this.rowSelection.selectedRowKeys = selectedRowKeys;
      }
    };

    return {
      listTabs: [],
      activeListId: null,
      pagination: { pageSize: 25 },
      columns,
      rowSelection
    };
  },
  beforeMount() {
    this.getLists(this.userId);
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      lists: state => state.myList.lists,
      selectedItems: state => state.myList.selectedItems
    })
  },
  methods: {
    ...mapActions("myList", [
      "getLists",
      "createList",
      "deleteList",
      "selectItems",
      "addItemsToList"
    ]),
    newList() {
      this.createList(this.userId);
    },
    onUpdateListTab(listId, action) {
      if (action == "remove") {
        this.deleteList({ id: listId, userId: this.userId });
      }
    },
    changeListTab(listId) {
      this.selectItems([]);
    }
  },
  watch: {
    lists(newLists) {
      this.listTabs = [];

      newLists.forEach(list => {
        this.listTabs.push({
          id: list.id,
          title: `My List ${list.id}`,
          items: list.items,
          totalCount: []
        });
      });

      if (!this.activeListId) {
        this.activeListId = this.listTabs.length ? this.listTabs[0].id : null;
      }
    },
    selectedItems(newItems) {
      this.addItemsToList({
        listId: this.activeListId,
        itemIds: newItems.map(item => item.id)
      });
    }
  }
};
</script>

<style scoped>
.my-list {
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