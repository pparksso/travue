<template>
  <Skeleton v-if="ui" />
  <div class="main" v-else>
    <div class="container">
      <ul>
        <Post :contents="contents" />
      </ul>
      <Pagination
        :start="startPage"
        :total="totalPage"
        :end="minPage"
        :currentPage="page"
      />
    </div>
  </div>
</template>

<script setup>
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import Skeleton from "@/components/page/Skeleton.vue";
import {mainStore} from "@/store/contents";
import {storeToRefs} from "pinia";
import {watch} from "@vue/runtime-core";

const main = mainStore();

// 포스트 갖고오기
main.getContents();

const {startPage, totalPage, minPage, page, pageNum, contents, ui} =
  storeToRefs(main);

// 페이지가 바뀌면 다시 포스트 호출
watch(pageNum, () => {
  main.getContents(pageNum.value);
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

@include tablet {
  .container {
    width: 90vw;
  }
}
@include mobile {
  .container {
    width: 90vw;
    padding: 50px 0;
  }
}
</style>
