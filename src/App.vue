<template>
  <router-view />
</template>

<script scoped>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["checkLoginStatus"])
  },
  mounted() {
    this.checkLoginStatus();
  }
};
</script>