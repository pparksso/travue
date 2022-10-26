<template>
  <div class="main">
    <div class="container">
      <ul>
        <Post />
      </ul>
    </div>
  </div>
</template>

<script>
import Post from "@/components/contents/Post.vue";
import {mainStore} from "@/store/contents";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MainView",
  setup() {
    const contents = mainStore();
    return {
      contents,
    };
  },
  created() {
    this.contents.getContents();
  },
  components: {
    Post,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80vw;
  margin: 0 auto;
  padding: 80px 0 100px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
