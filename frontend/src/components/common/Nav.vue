<template>
  <div class="nav">
    <ul>
      <li><button @click="openLogin">Login</button></li>
      <li><button @click="openSignUp">Sign up</button></li>
    </ul>
  </div>
</template>

<script>
import {loginStore, signUpStore} from "@/store/popup";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nav",
  setup() {
    const login = loginStore();
    const signUp = signUpStore();
    return {
      login,
      signUp,
    };
  },
  methods: {
    openLogin() {
      this.login.open();
    },
    openSignUp() {
      this.signUp.open();
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
