<template>
  <button id="fullHeart" v-if="isHeart" @click="delHeart()">
    <span class="material-icons"> favorite </span>
  </button>
  <button id="emptyHeart" v-else @click="addHeart()">
    <span class="material-icons-outlined"> favorite_border </span>
  </button>
</template>

<script setup>
import {authStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {defineProps, ref, watch} from "vue";
import contentsApi from "@/api/contents";

const auth = authStore();
const {user, isAuth} = storeToRefs(auth);
const props = defineProps({
  no: Number,
});

let isHeart = ref(false);

// 로그인한 회원이면 클릭한 하트 표시하기
if (isAuth.value) {
  watch(user, (newUser) => {
    let heartArr = [...newUser.heart];
    heartArr.forEach((i) => {
      if (i == props.no) return (isHeart.value = true);
      else return false;
    });
  });
} else {
  isHeart.value = false;
}

// 팝업 안에서 클릭했을 때, 유저 정보를 다시 받아(팝업안에서) 유저정보가 바뀌면 다시 유저정보를 읽으면서 하트상태를 변화시키는 함수
// watch(user, (newUser) => {
//   let heartArr = [newUser.heart];
//   heartArr.forEach((i) => {
//     if (i == props.no) return (isHeart.value = true);
//     else return false;
//   });
// });

// 하트 클릭하기
function addHeart() {
  if (isAuth.value) {
    contentsApi
      .heartAddFetch({no: props.no})
      .then((res) => {
        if (res.data.add) {
          isHeart.value = true;
          auth.AuthFetch();
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("로그인 후 이용가능합니다.");
  }
}

// 하트 지우기
function delHeart() {
  if (isAuth.value) {
    contentsApi
      .delHeartFetch({no: props.no})
      .then((res) => {
        if (res.data.del) {
          isHeart.value = false;
          auth.AuthFetch();
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("로그인 후 이용가능합니다.");
  }
}
</script>

<style lang="scss" scoped>
button {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 1;
  padding: 0;
  background: none;
  .material-icons-outlined,
  .material-icons {
    font-size: 18px;
    color: rgb(228, 9, 9);
  }
}
</style>
