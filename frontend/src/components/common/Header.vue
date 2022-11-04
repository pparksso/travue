<template>
  <header>
    <Nav />
    <div class="logo">
      <a href="/">
        <h1>Travel Diary</h1>
      </a>
    </div>
  </header>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: {
    Nav,
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 30vh;
  background-image: url("@/assets/images/mainVisual01.jpg");
  background-position: 50% 50%;
  background-size: cover;
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 48px;
      font-weight: 700;
      color: #222;
    }
  }
}
</style>
