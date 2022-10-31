<template>
  <Header />
  <Login v-if="login.loginState" />
  <SignUp v-if="signUp.signUpState" />
  <PostPopup v-if="post.openPost" />
  <router-view></router-view>
  <Footer />
</template>
<script>
import Header from "./components/common/Header.vue";
import Login from "./components/user/Login.vue";
import SignUp from "./components/user/SignUp.vue";
import Footer from "./components/common/Footer.vue";
import {loginStore, signUpStore} from "./store/popup";
import PostPopup from "./components/contents/PostPopup.vue";
import {postStore} from "@/store/popup";
export default {
  name: "App",
  components: {
    Header,
    Login,
    SignUp,
    PostPopup,
    Footer,
  },
  setup() {
    const login = loginStore();
    const signUp = signUpStore();
    const post = postStore();
    return {
      login,
      signUp,
      post,
    };
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
  overflow-x: hidden;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: #4ab8c5;
    border-radius: 10px;
  }
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  outline: none;
  border: none;
  background: none;
  font-family: "EB Garamond", "Noto Sans KR";
  cursor: pointer;
}
</style>
