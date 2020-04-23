<template>
  <a-layout class="search-results">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search Results</h3>
      </a-col>

      <a-col class="table-container" :span="24">
        <a-table
          :rowSelection="rowSelection"
          :columns="columns"
          :dataSource="items"
          :rowKey="record=>record.id"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ y: 500 }"
        >
          <img
            slot="site"
            slot-scope="site"
            :src="require('../assets/images/'+site+'.png')"
            width="16"
          />
        </a-table>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

const columns = [
  {
    title: "",
    dataIndex: "site",
    width: "5%",
    scopedSlots: { customRender: "site" }
  },
  {
    title: "Item",
    dataIndex: "item"
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "10%"
  }
];

export default {
  data() {
    const rowSelection = {
      selectedRowKeys: [],
      onChange: (selectedRowKeys, selectedItems) => {
        this.rowSelection.selectedRowKeys = selectedRowKeys;
        this.selectItems(selectedItems);
      }
    };

    return {
      pagination: { pageSize: 25 },
      loading: false,
      columns,
      rowSelection
    };
  },
  computed: {
    ...mapState({
      items: state => state.searchResults.items,
      totalCount: state => state.searchResults.totalCount,
      lastQueries: state => state.searchResults.lastQueries,
      selectedItemIds: state => state.myList.selectedItemIds
    })
  },
  methods: {
    ...mapActions("searchResults", ["searchItems"]),
    ...mapActions("myList", ["selectItems"]),
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;

      this.lastQueries["pageIdx"] = pager.current;
      this.loading = true;
      this.searchItems(this.lastQueries);
    }
  },
  watch: {
    totalCount(newValue) {
      const pagination = { ...this.pagination };
      pagination.total = newValue;
      this.pagination = pagination;
    },
    items() {
      this.loading = false;
    },
    selectedItemIds(newSelectedItems) {
      this.rowSelection.selectedRowKeys = newSelectedItems;
    }
  }
};
</script>

<style scoped>
.search-results {
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
.table-container {
  padding: 15px;
}
</style>