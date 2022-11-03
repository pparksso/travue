<template>
  <div class="nav">
    <ul v-if="loginStatus || isAuth">
      <router-link to="/new"
        ><li><button>New</button></li></router-link
      >
      <router-link to="/mytour"
        ><li><button>My tour</button></li></router-link
      >
      <router-link to="/mypage"
        ><li><button>My page</button></li></router-link
      >

      <li><button @click="clickedLogout">Logout</button></li>
    </ul>
    <ul v-else>
      <li><button @click="openLogin">Login</button></li>
      <li><button @click="openSignUp">Sign up</button></li>
    </ul>
  </div>
</template>

<script setup>
import {loginStore, signUpStore} from "@/store/popup";
import {loginFormStore, authStore, logoutStore} from "@/store/user";
import {storeToRefs} from "pinia";

const signUp = signUpStore();
const login = loginStore();
const loginForm = loginFormStore();
const auth = authStore();
const logout = logoutStore();

const {loginStatus} = storeToRefs(loginForm);
const {isAuth} = storeToRefs(auth);
function openLogin() {
  login.open();
}
function openSignUp() {
  signUp.open();
}
function clickedLogout() {
  logout.isLogout();
}
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
