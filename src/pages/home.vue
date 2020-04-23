<template>
  <a-layout type="flex" class="homepage">
    <a-row :gutter="[15,20]" v-if="userId">
      <a-col class="area" :span="12">
        <WelcomeComponent />
      </a-col>
      <a-col class="area" :span="12">
        <SearchComponent />
      </a-col>
      <a-col class="area" :span="12">
        <SearchResultsComponent />
      </a-col>
      <a-col class="area" :span="12">
        <MyListComponent />
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";

import WelcomeComponent from "../components/welcome";
import SearchComponent from "../components/search";
import SearchResultsComponent from "../components/search-results";
import MyListComponent from "../components/my-list";

export default {
  components: {
    WelcomeComponent,
    SearchComponent,
    SearchResultsComponent,
    MyListComponent
  },

  computed: {
    ...mapState({
      userId: state => state.user.id
    })
  },
  mounted() {
    if (!this.userId) this.$router.replace("/login");
  }
};
</script>

<style scoped>
.homepage {
  padding: 15px;
  background-color: #fff;
}
</style>