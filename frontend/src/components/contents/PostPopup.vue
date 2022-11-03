<template>
  <div class="contentsPopup cover">
    <div class="popupItem userBox">
      <div class="top">
        <div class="title">
          <h1></h1>
        </div>
        <button class="popupCloseBtn">
          <span class="material-icons" @click="post.closePost()"> close </span>
        </button>
      </div>
      <div class="popupBody">
        <div class="center">
          <div class="imgBox">
            <img :src="data.imgUrl" :alt="data.title" />
          </div>
          <div class="infoBox">
            <div class="info">
              <span class="location">{{ data.location }}</span>
              <span class="date">{{ data.date }}</span>
              <span class="nickname">{{ data.nickname }}</span>
            </div>
            <!-- <div class="heart">
              <span id="userHeartNum" class="heartNum" data-no="{{item.no}}">{{
                item.heartNum
              }}</span>
              <button id="popupEmptyHeart" class="on" data-no="{{item.no}}">
                <span class="material-icons-outlined"> favorite_border </span>
              </button>
              <button id="popupFullHeart" class="" data-no="{{item.no}}">
                <span class="material-icons"> favorite </span>
              </button>
            </div> -->
            <!-- <div class="heart">
              <span
                id="noUserHeartNum"
                class="heartNum"
                data-no="{{item.no}}"
                >{{ item.heartNum }}</span
              ><button id="noUserHeart" data-no="{{item.no}}">
                <span class="material-icons-outlined"> favorite_border </span>
              </button>
            </div> -->
          </div>
          <div class="txtBox">
            <p>{{ data.desc }}</p>
          </div>
        </div>
        <div class="commentWrap">
          <!-- <div class="inputBox">
            <label
              ><input
                type="text"
                name=""
                maxlength="50"
                class="commentInput"
                data-no="{{item.no}}"
            /></label>
            <button class="commentAddBtn" data-no="{{item.no}}">
              <span>등록</span>
            </button>
          </div> -->
          <div class="commentBox">
            <div class="comment" v-for="com in comment" :key="com">
              <div class="commentLeft">
                <span class="userNickname"> {{ com.nickname }} </span>
                <p>{{ com.comment }}</p>
              </div>
              <!-- <button class="commentDelBtn">
                <span class="material-icons"> close </span>
              </button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="btns">
        <div class="btns">
          <router-link :to="{name: 'edit', params: {num: no}}">
            <button @click="post.closePost()">
              <span>수정</span>
            </button>
          </router-link>
          <button @click="edit.deletePost(no)"><span>삭제</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {mainStore} from "@/store/contents";
import {postStore} from "@/store/popup";
import {authStore} from "@/store/user";
import {editStore} from "@/store/contents";

import {storeToRefs} from "pinia";

const items = mainStore();
const post = postStore();
const auth = authStore();
const edit = editStore();

const {contents, comments} = storeToRefs(items);
const {id} = storeToRefs(post);
const {user} = storeToRefs(auth);

let data = {};
let comment = [];
let btns = false;
let no = 0;

// 컨텐츠
contents.value[0].map((item) => {
  if (item.no == id.value) {
    data = item;
    no = item.no;
    if (user.value.userNum == item.userNum) {
      btns = true;
    }
  }
});
comments.value[0].map((item) => {
  if (item.no == id.value) {
    comment.push(item);
  }
});
</script>

<style lang="scss" scoped>
.cover {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 5000;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.5);
  .popupItem {
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    overflow: hidden;
    background-color: #fff;
    border-radius: 20px;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #aaa;
      .title {
        line-height: 1.5;
        h1 {
          font-size: 20px;
          font-weight: 700;
        }
        button {
          background: none;
          .material-icons {
            color: #333;
          }
        }
      }
    }
    .popupBody {
      max-height: 80vh;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background: #4ab8c5;
        border-radius: 10px;
      }
    }
    .center {
      border-bottom: 1px solid #aaa;
      padding: 20px;
      .imgBox {
        margin-bottom: 20px;
        img {
          width: 100%;
        }
      }
      .infoBox {
        display: flex;
        justify-content: space-between;
        .info {
          .location {
            display: inline-block;
            margin-right: 10px;
          }
          .date,
          .nickname {
            margin-right: 10px;
            font-size: 13px;
          }
        }
        .heart {
          display: flex;
          align-items: center;
          .heartNum {
            display: inline-block;
            margin-bottom: 3px;
            font-size: 12px;
          }
          button {
            display: none;
            background: none;
            &#noUserHeart {
              display: block;
            }
            .material-icons-outlined,
            .material-icons {
              font-size: 18px;
              color: rgb(228, 9, 9);
            }
            &.on {
              display: block;
            }
          }
        }
      }
      .txtBox {
        p {
          font-family: "GangwonEdu_OTFBoldA";
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
        }
      }
    }
    .commentWrap {
      padding: 10px 20px;
      .inputBox {
        display: flex;
        label {
          flex-grow: 1;
          input {
            width: 100%;
            padding: 5px;
            outline: none;
            border-bottom: 1px solid #aaa;
          }
        }
      }
      .commentBox {
        padding: 20px;
        .comment {
          font-size: 14px;
          padding: 5px;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s ease-in-out;
          display: flex;
          .commentLeft {
            display: flex;
            .userNickname {
              word-break: keep-all;
              display: inline-block;
              width: 120px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            p {
              word-break: keep-all;
            }
          }
          .commentDelBtn {
            background: none;
            padding: 0;
            .material-icons {
              font-size: 15px;
            }
          }
          &:hover {
            background-color: #eee;
          }
        }
      }
    }
    .bottom {
      text-align: end;
      .btns {
        margin: 0 10px 10px 0;
        button {
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          padding: 5px 7px;
          &:last-child {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
