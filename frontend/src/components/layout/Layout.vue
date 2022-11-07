<template>
  <Header />
  <Login v-if="loginState" />
  <SignUp v-if="signUpState" />
  <PostPopup v-if="openPost" />
  <Suspense>
    <router-view></router-view>
  </Suspense>
  <Footer />
</template>

<script setup>
import Header from "../common/Header.vue";
import Footer from "../common/Footer.vue";
import Login from "../user/Login.vue";
import SignUp from "../user/SignUp.vue";
import PostPopup from "../contents/PostPopup.vue";

import {loginStore, signUpStore} from "@/store/popup";
import {postStore} from "@/store/popup";
import {storeToRefs} from "pinia";

const loginPopupStore = loginStore();
const signUpPopupStore = signUpStore();
const postPopupStore = postStore();

const {loginState} = storeToRefs(loginPopupStore);
const {signUpState} = storeToRefs(signUpPopupStore);
const {openPost} = storeToRefs(postPopupStore);
</script>

<style lang="scss" scoped></style>
