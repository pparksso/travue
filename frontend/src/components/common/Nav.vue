<template>
  <div class="nav">
    <ul v-if="isCookie">
      <li><button>My tour</button></li>
      <li><button>Logout</button></li>
    </ul>
    <ul v-else>
      <li><button @click="openLogin">Login</button></li>
      <li><button @click="openSignUp">Sign up</button></li>
    </ul>
  </div>
</template>

<script setup>
import {loginStore, signUpStore} from "@/store/popup";
import {computed, onMounted} from "@vue/runtime-core";
import {useCookies} from "vue3-cookies";
const signUp = signUpStore();
const login = loginStore();
const {cookies} = useCookies();
onMounted(() => {
  console.log(cookies.get("connect.sid"));
});
function openLogin() {
  login.open();
}
function openSignUp() {
  signUp.open();
}
const isCookie = computed({
  get() {
    return document.cookie;
  },
});
// computed(() => {
//   isCookie: () => {
//     return document.cookie;
//   };
// });
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
