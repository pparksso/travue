<template>
  <div class="pagination">
    <ul class="list">
      <li
        v-if="calcPage.preMove(start)"
        @click="sendNum(start - 1)"
        :class="(isClicked = on)"
      >
        <button class="preBtn">
          <span class="material-icons"> chevron_left </span>
        </button>
      </li>
      <li
        v-for="page in calcPage.pageArr(start, end)"
        :key="page"
        @click="sendNum(page)"
      >
        <button>{{ page }}</button>
      </li>
      <li v-if="calcPage.nextMove(end, total)" @click="sendNum(end + 1)">
        <button class="nextBtn">
          <span class="material-icons"> chevron_right </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import calcPage from "@/utils/pagination";
import {defineProps} from "vue";
import {mainStore} from "@/store/contents";
const main = mainStore();

defineProps({
  start: Number,
  total: Number,
  end: Number,
  currentPage: Number,
});
function sendNum(num) {
  main.getPageNum(num);
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 50px 0;
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 27px;
        height: 27px;
        font-size: 16px;
        &.on {
          color: #fff;
          background-color: #333;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
