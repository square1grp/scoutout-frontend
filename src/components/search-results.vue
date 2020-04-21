<template>
  <a-layout class="search-results">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search Results</h3>
      </a-col>

      <a-col :span="24">
        <a-table
          :rowSelection="rowSelection"
          :columns="columns"
          :dataSource="items"
          :rowKey="record=>record.id"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};

export default {
  data() {
    return {
      pagination: {},
      loading: false,
      columns,
      rowSelection
    };
  },
  computed: {
    ...mapState({
      items: state => state.searchResults.items,
      totalCount: state => state.searchResults.totalCount,
      lastQueries: state => state.searchResults.lastQueries
    })
  },
  methods: {
    ...mapActions("searchResults", ["searchItems"]),
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
    }
  }
};
</script>

<style scoped>
.search-results {
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
</style>