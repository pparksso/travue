<template>
  <div class="main">
    <div class="container">
      <ul>
        <li class="post"></li>
        <li class="post"></li>
        <li class="post"></li>
        <li class="post"></li>
        <li class="post"></li>
        <li class="post"></li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 80vw;
  margin: 0 auto;
  padding: 80px 0 100px 0;
  min-height: 800px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: calc(33.33% - 20px);
      position: relative;
      margin: 20px 10px;
      border-radius: 10px;
      background-color: #f2f2f2;
      height: 366px;
    }
  }
}
</style>
