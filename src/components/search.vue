<template>
  <a-layout class="search">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search</h3>
      </a-col>

      <a-col :span="24">
        <a-checkbox-group class="tag-list" @change="onChange">
          <a-row>
            <a-col :span="4" v-for="tag in allTags" :key="tag.id">
              <a-checkbox :value="tag.id">{{tag.title}}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      allTags: state => state.sites.allTags
    })
  },
  methods: {
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
    }
  }
};
</script>

<style scoped>
.search {
  height: 100%;
  border: 1px solid #007bff;
  border-radius: 4px;
}
.title {
  color: #fff;
  border-bottom: 1px solid #007bff;
  background-color: #007bff;
  padding: 10px 15px;
  margin: 0px;
}
.tag-list {
  width: 100%;
  padding: 15px;
}
</style>