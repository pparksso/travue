<template>
  <footer id="footer">
    <p>Copyright 2022. sohee All rights reserved</p>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
};
</script>

<style lang="scss" scoped>
#footer {
  height: 120px;
  padding-top: 60px;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  color: #fff;
  letter-spacing: 1px;
  background-color: #333;
  word-break: keep-all;
}

@media all and (max-width: 450px) {
  #footer {
    font-size: clamp(10px, 3.6vw, 16px);
  }
}
</style>
