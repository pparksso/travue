<template>
  <div class="main">
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
// import {getCurrentInstance} from "vue";
import Post from "@/components/contents/Post.vue";
import Pagination from "@/components/common/Pagination.vue";
import {mainStore} from "@/store/contents";
import {storeToRefs} from "pinia";
import {watch} from "@vue/runtime-core";
// const insternalInstance = getCurrentInstance();
// const emitter = insternalInstance.appContext.config.globalProperties.emitter;
const main = mainStore();

// 포스트 갖고오기
main.getContents();
const {startPage, totalPage, minPage, page, pageNum, contents} =
  storeToRefs(main);

// 페이지가 바뀌면 다시 포스트 호출
watch(pageNum, () => {
  main.getContents(pageNum.value);
});

// function openPopup() {
//   emitter.emit("mainPopup");
// }
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
