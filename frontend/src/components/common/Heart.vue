<template>
  <slot></slot>
  <button id="fullHeart" v-if="isHeart" @click="delHeart()">
    <span class="material-icons"> favorite </span>
  </button>
  <button id="emptyHeart" v-else @click="addHeart()">
    <span class="material-icons-outlined"> favorite_border </span>
  </button>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";
import {authStore} from "@/store/user";
import {storeToRefs} from "pinia";

const props = defineProps({
  no: Number,
});
let isHeart = ref(false);
const auth = authStore();
const {isAuth, user} = storeToRefs(auth);

//처음 화면이 로딩됐을 때 하트 상태
if (!isAuth.value) {
  isHeart.value = false;
} else {
  const startState = user.value.heart.filter((i) => props.no == i);
  if (startState == props.no) {
    isHeart.value = true;
  } else {
    isHeart.value = false;
  }
}

// 하트 클릭
// empty -> full
function addHeart() {
  if (!isAuth.value) {
    alert("로그인 후 이용가능합니다.");
  } else {
    try {
      auth.plusHeartAct({no: props.no});
    } catch (err) {
      console.log(err);
    }
  }
}
// full -> empty
function delHeart() {
  if (!isAuth.value) {
    alert("로그인 후 이용가능합니다.");
  } else {
    try {
      auth.minusHeartAct({no: props.no});
    } catch (err) {
      console.log(err);
    }
  }
}

// 실시간 반영
watch(user, (newUser) => {
  const result = newUser.heart.filter((i) => props.no == i);
  if (result == props.no) {
    isHeart.value = true;
  } else {
    isHeart.value = false;
  }
});
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  background: none;
  .heartNum {
    display: inline-block;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .material-icons-outlined,
  .material-icons {
    font-size: 18px;
    color: rgb(228, 9, 9);
  }
}
</style>
