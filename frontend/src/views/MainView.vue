<template>
  <div class="main">
    <div class="container">
      <ul></ul>
    </div>
  </div>
</template>

<script>
import request from "../api/axiosInstance";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MainView",
  async created() {
    try {
      await request({
        method: "GET",
        url: "/index",
      }).then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped></style>
