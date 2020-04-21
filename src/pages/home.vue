<template>
  <a-layout type="flex" class="homepage">
    <a-row :gutter="[25,50]">
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
  }
};
</script>

<style scoped>
.homepage {
  padding: 50px 25px;
  background-color: #fff;
}
.area {
  height: 470px;
}
</style>