<template>
  <div class="nav">
    <ul>
      <li><button @click="showLogin">Login</button></li>
      <li><button @click="showSignUp">Sign up</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nav",
  methods: {
    showLogin() {
      this.$store.commit("showLogin");
    },
    showSignUp() {
      this.$store.commit("showSignUp");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  ul {
    display: flex;
    margin-right: 20px;
    li {
      padding: 20px 10px;
      button {
        font-size: 18px;
      }
    }
  }
}
</style>
