<template>
  <a-layout type="flex" class="homepage">
    <a-row :gutter="[16,16]">
      <a-col class="area" :span="12">
        <WelcomeComponent />
      </a-col>
      <a-col class="area" :span="12">
        <SearchComponent />
      </a-col>
      <a-col class="area" :span="12">Col 1</a-col>
      <a-col class="area" :span="12">Col 2</a-col>
    </a-row>
  </a-layout>
</template>

<script>
import WelcomeComponent from "../components/welcome";
import SearchComponent from "../components/search";

export default {
  components: { WelcomeComponent, SearchComponent }
};
</script>

<style scoped>
.homepage {
  padding: 15px;
}
.area {
  height: 450px;
}
</style>