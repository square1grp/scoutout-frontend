<template>
  <a-layout class="my-list">
    <a-row>
      <a-col :span="24">
        <h3 class="title">My List</h3>
      </a-col>

      <a-col class="list-tabs-container" :span="24">
        <a-row :style="{ marginBottom: '16px' }">
          <a-col :span="8">
            <a-button type="primary" @click="newList">Create a new list</a-button>
          </a-col>

          <a-col :span="12">
            <a-input-search
              :placeholder="activeListName"
              @search="onChangeCurrentTabName"
              enterButton="Change"
            />
          </a-col>
        </a-row>

        <a-tabs
          hideAdd
          v-model="activeListId"
          type="editable-card"
          @change="changeListTab"
          @edit="onUpdateListTab"
        >
          <a-tab-pane
            v-for="listTab in listTabs"
            :tab="listTab.name"
            :key="listTab.id"
            :closable="listTab.closable"
          >
            <a-table
              :columns="columns"
              :dataSource="selectedItems"
              :rowKey="record=>record.id"
              :pagination="pagination"
              :scroll="{ y: 390 }"
            >
              <template slot="delete" slot-scope="record">
                <a-popconfirm title="Sure to delete?" @confirm="() => onDeleteItem(record.id)">
                  <a href="javascript:;">
                    <a-icon type="delete" />
                  </a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

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
    width: "15%"
  },
  {
    title: "",
    width: "10%",
    scopedSlots: { customRender: "delete" }
  }
];

export default {
  data() {
    return {
      activeListId: null,
      activeListName: null,
      pagination: { pageSize: 25 },
      columns
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
    }),
    listTabs() {
      const listTabs = this.lists.map(list => {
        return {
          id: list.id,
          name: list.name,
          items: list.items
        };
      });

      if (!this.activeListId) {
        this.activeListId = listTabs.length ? listTabs[0].id : null;
        this.activeListName = listTabs.length ? listTabs[0].name : null;
      }

      return listTabs;
    }
  },
  methods: {
    ...mapActions("myList", [
      "getLists",
      "createList",
      "deleteList",
      "selectItems",
      "setActiveListId",
      "deleteItemFromList",
      "setItemListName"
    ]),
    newList() {
      this.createList(this.userId);
      this.activeListName = `My List ${moment().format("L")}`;
    },
    onUpdateListTab(listId, action) {
      if (action == "remove") {
        this.deleteList({ id: listId, userId: this.userId });
      }
    },
    changeListTab(listId) {
      const list = this.lists.filter(list => list.id == listId)[0];
      this.activeListName = list.name;
      this.setActiveListId(listId);
      this.selectItems(list.items);
    },
    onDeleteItem(itemId) {
      this.deleteItemFromList({
        listId: this.activeListId,
        itemId: itemId
      });
    },
    onChangeCurrentTabName(newListName) {
      if (this.activeListId && newListName) {
        this.setItemListName({
          listId: this.activeListId,
          listName: newListName
        });

        this.activeListName = newListName;
      }
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