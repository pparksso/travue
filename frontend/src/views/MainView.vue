<template>
  <div class="main">
    <div class="container">
      <ul>
        <Post />
      </ul>
      <Pagination
        :start="startPage"
        :total="totalPage"
        :end="lastPage"
        :currentPage="page"
      />
    </div>
  </div>
</template>

<script setup>
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import {mainStore} from "@/store/contents";
import {storeToRefs} from "pinia";
const main = mainStore();

// 포스트 갖고오기
main.getContents();
const {startPage, totalPage, lastPage, page} = storeToRefs(main);

// const start = startPage.value;
// const total = totalPage.value;
// const end = lastPage.value;
// const currentPage = page.value;
// console.log(start, total, end);
</script>
<!-- <script>
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import {mainStore} from "@/store/contents";
import {storeToRefs} from "pinia";
export default {
  name: "MainView",
  setup() {
    const main = mainStore();
    const {startPage, totalPage, lastPage, page} = storeToRefs(main);
    return {
      main,
      startPage,
      totalPage,
      lastPage,
      page,
    };
  },
  components: {
    Post,
    Pagination,
  },
  data() {
    return {
      start: 0,
      total: 0,
      end: 0,
      currentPage: 0,
    };
  },
  created() {
    this.main.getContents();
    this.start = this.startPage;
    this.total = this.totalPage;
    this.end = this.lastPage;
    this.currentPage = this.page;
  },
  watch: {
    pageLoad() {
      this.start = this.startPage;
      this.total = this.totalPage;
      this.end = this.lastPage;
      this.currentPage = this.page;
    },
  },
};
</script> -->

<style lang="scss" scoped>
.container {
  width: 80vw;
  margin: 0 auto;
  padding: 80px 0 100px 0;
  min-height: 800px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
