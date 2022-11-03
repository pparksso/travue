<template>
  <div class="main">
    <div class="container">
      <ul>
        <Post :contents="myContents" />
      </ul>
      <Pagination
        :start="myStartPage"
        :total="myTotalPage"
        :end="myMinPage"
        :currentPage="myPage"
      />
    </div>
  </div>
</template>

<script setup>
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import {myTourStore} from "@/store/contents";
import {storeToRefs} from "pinia";
import {watch} from "@vue/runtime-core";
const myTour = myTourStore();

// 포스트 갖고오기
myTour.getMyContents();
const {myStartPage, myTotalPage, myMinPage, myPage, myPageNum, myContents} =
  storeToRefs(myTour);

// 페이지가 바뀌면 다시 포스트 호출
watch(myPageNum, () => {
  myTour.getMyContents(myPageNum.value);
});
</script>

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
