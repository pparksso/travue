<template>
  <li
    class="post"
    v-for="item in contents[0]"
    :key="item.title"
    @click="post.clickPost(item.no)"
  >
    <div class="contentsBox">
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
    <!-- <div class="heart">
      <button id="emptyHeart" class="on" data-no="{{item.no}}">
        <span class="material-icons-outlined"> favorite_border </span>
      </button>
      <button id="fullHeart" class="" data-no="{{item.no}}">
        <span class="material-icons"> favorite </span>
      </button>
    </div> -->
  </li>
</template>

<script setup>
import {defineProps} from "vue";
import {postStore} from "@/store/popup";
const post = postStore();

defineProps({
  contents: Array,
});
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
}
</style>
