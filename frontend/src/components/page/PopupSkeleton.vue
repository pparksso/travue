<template>
  <div class="contentsPopup cover">
    <div class="popupItem userBox"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 5000;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.5);
  .popupItem {
    width: 40%;
    position: absolute;
    height: 650px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    overflow: hidden;
    background-color: #f2f2f2;
    border-radius: 20px;
  }
}
</style>
