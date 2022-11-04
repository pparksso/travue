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
import {defineProps, ref} from "vue";
import contentsApi from "@/api/contents";

const auth = authStore();
const {user, isAuth} = storeToRefs(auth);
const props = defineProps({
  no: Number,
});

let isHeart = ref(false);
if (isAuth.value) {
  let heartArr = [...user.value.heart];
  heartArr.forEach((i) => {
    if (i == props.no) return (isHeart.value = true);
    else return false;
  });
} else {
  isHeart.value = false;
}

function addHeart() {
  if (isAuth.value) {
    contentsApi
      .heartAddFetch({no: props.no})
      .then((res) => {
        if (res.data.add) return (isHeart.value = true);
      })
      .catch((err) => console.log(err));
  } else {
    alert("로그인 후 이용가능합니다.");
  }
}
function delHeart() {
  if (isAuth.value) {
    contentsApi
      .delHeartFetch({no: props.no})
      .then((res) => {
        if (res.data.del) return (isHeart.value = false);
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
