<template>
  <slot></slot>
  <button id="fullHeart" v-if="isHeart" @click="delHeart()">
    <span class="material-icons"> favorite </span>
  </button>
  <button id="emptyHeart" v-else @click="addHeart()">
    <span class="material-icons-outlined"> favorite_border </span>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
button {
  padding: 0;
  background: none;
  .heartNum {
    display: inline-block;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .material-icons-outlined,
  .material-icons {
    font-size: 18px;
    color: rgb(228, 9, 9);
  }
}
</style>
