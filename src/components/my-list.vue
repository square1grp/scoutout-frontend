<template>
  <a-layout class="my-list">
    <a-row>
      <a-col :span="24">
        <h3 class="title">My List</h3>
      </a-col>

      <a-col :span="24">
        <div></div>
      </a-col>
    </a-row>
  </a-layout>
</template>

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
</style>