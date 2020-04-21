<template>
  <a-layout class="welcome">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Welcome</h3>
      </a-col>

      <a-col :span="24">
        <div></div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style scoped>
.welcome {
  height: 100%;
  border: 1px solid #7f7f7f;
  border-radius: 4px;
}
.title {
  color: #fff;
  border-bottom: 1px solid #7f7f7f;
  background-color: #6c757d;
  padding: 10px 15px;
  margin: 0px;
}
</style>