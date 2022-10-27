<template>
  <div class="pagination">
    <ul class="list">
      <li v-if="preMove(start)">
        <button class="preBtn">
          <span class="material-icons"> chevron_left </span>
        </button>
      </li>
      <li
        v-for="page in pageArr(start, end)"
        :key="page"
        @click="$emit('pageNum', page)"
      >
        <button>{{ page }}</button>
      </li>
      <li v-if="nextMove(end, total)">
        <button class="nextBtn">
          <span class="material-icons"> chevron_right </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {preMove, nextMove, pageArr} from "@/unit/pagination";
import {defineProps, watch} from "vue";
const props = defineProps({
  start: Number,
  total: Number,
  end: Number,
  currentPage: Number,
});

console.log({...props});

watch(props, (newProps) => {
  console.log({...newProps});
});

// const startPage = props.start;
// const totalPage = props.total;
// const endPage = props.end;
// console.log(
//   startPage.value,
//   totalPage.value,
//   endPage.value,
//   nextMove(endPage.value, totalPage.value)
// );
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
