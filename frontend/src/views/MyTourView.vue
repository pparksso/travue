<template>
  <Skeleton v-if="ui" />
  <div class="main" v-else>
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
      <div class="empty" v-if="myContents[0] == 0">
        <p>작성한 글이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Skeleton from "@/components/page/Skeleton.vue";
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import {myTourStore} from "@/store/contents";
import {storeToRefs} from "pinia";
import {watch} from "@vue/runtime-core";
const myTour = myTourStore();

// 포스트 갖고오기
myTour.getMyContents();
const {myStartPage, myTotalPage, myMinPage, myPage, myPageNum, myContents, ui} =
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
  .empty {
    text-align: center;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
