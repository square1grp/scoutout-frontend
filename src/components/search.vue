<template>
  <a-layout class="search">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search</h3>
      </a-col>

      <a-col :span="24">
        <div></div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style scoped>
.search {
  height: 100%;
  border: 1px solid #007bff;
  border-radius: 4px;
}
.title {
  color: #fff;
  background-color: #007bff;
  padding: 10px 15px;
  margin: 0px;
}
</style>