<template>
  <li
    class="post"
    v-for="item in contents[0]"
    :key="item.title"
    @click="post.clickPost(item.no)"
  >
    <div class="contentsBox" :num="(no = item.no)">
      <div class="img">
        <img :src="item.imgUrl" :alt="item.title" />
      </div>
      <div class="txtBox">
        <div class="top">
          <div class="titleBox">
            <span class="location">{{ item.location }}</span>
            <h1>{{ item.title }}</h1>
          </div>
        </div>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <div class="heart" v-for="i in user.heart" :key="i">
      <button id="fullHeart" v-if="i == item.no">
        <span class="material-icons"> favorite </span>
      </button>
      <button id="emptyHeart" v-else @click="emptyHeartClick()">
        <span class="material-icons-outlined"> favorite_border </span>
      </button>
    </div>
  </li>
</template>

<script setup>
import {defineProps, ref} from "vue";
import {postStore} from "@/store/popup";
import {authStore} from "@/store/user";
import {heartStore} from "@/store/contents";
import {storeToRefs} from "pinia";
const auth = authStore();
const post = postStore();
const heart = heartStore();
const {user} = storeToRefs(auth);
let num = ref();
defineProps({
  contents: Array,
});
console.log(num);
function emptyHeartClick() {
  heart.heartPlusAct();
}

// user.value.heart.map(item=> {
//   if(item == )
// })
</script>

<style lang="scss" scoped>
li {
  width: calc(33.33% - 20px);
  position: relative;
  margin: 0 10px;
  padding: 20px 0;
  cursor: pointer;
  .contentsBox {
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 10px;
    .img {
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 300px;
        transition: all 0.5s ease-in-out;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .txtBox {
      padding: 20px;
      .top {
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 10px;
        .titleBox {
          display: flex;
          width: 90%;
          span {
            font-size: 12px;
            line-height: 2;
          }
          h1 {
            display: inline-block;
            flex-grow: 1;
            overflow: hidden;
            margin-left: 10px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      p {
        display: -webkit-box;
        height: 2.4em;
        overflow: hidden;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .heart {
    position: absolute;
    right: 5%;
    bottom: 28%;
    z-index: 1;
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
  }
}
</style>
