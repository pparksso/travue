<template>
  <Header />
  <Login v-if="$store.state.loginPopup" />
  <SignUp v-if="$store.state.signUpPopup" />
</template>
<script>
import Header from "./components/common/Header.vue";
import Login from "./components/user/Login.vue";
import SignUp from "./components/user/SignUp.vue";
export default {
  name: "App",
  components: {
    Header,
    Login,
    SignUp,
  },
};
</script>
<style lang="scss">
@import url("~reset-css/reset.css");
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");
#app {
  font-family: "EB Garamond", "Noto Sans KR";
}
body {
  margin: 0;
}
button {
  outline: none;
  border: none;
  background: none;
  font-family: "EB Garamond", "Noto Sans KR";
  cursor: pointer;
}
</style>
