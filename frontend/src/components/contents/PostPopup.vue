<template>
  <PopupSkeleton v-if="ui" />
  <div class="contentsPopup, cover" v-else>
    <div class="popupItem userBox">
      <div class="top">
        <div class="title">
          <h1></h1>
        </div>
        <button class="popupCloseBtn">
          <span class="material-icons" @click="popupStore.closePost()">
            close
          </span>
        </button>
      </div>
      <div class="popupBody">
        <div class="center">
          <div class="imgBox">
            <img :src="contents.imgUrl" :alt="contents.title" />
          </div>
          <div class="infoBox">
            <div class="info">
              <span class="location">{{ contents.location }}</span>
              <span class="date">{{ contents.date }}</span>
              <span class="nickname">{{ contents.nickname }}</span>
            </div>
            <div class="heart">
              <Heart :no="clickNum">
                <span id="userHeartNum" class="heartNum">{{ heartNum }}</span>
              </Heart>
            </div>
          </div>
          <div class="txtBox">
            <p>{{ contents.desc }}</p>
          </div>
        </div>
        <div class="commentWrap">
          <div class="inputBox" v-if="isAuth || loginStatus">
            <label
              ><input
                type="text"
                name=""
                maxlength="50"
                class="commentInput"
                @input="newComment = $event.target.value"
                :value="newComment"
                @keydown.enter="
                  popupStore.addCommentAct({
                    comment: newComment,
                    contentsNo: contents.no,
                  });
                  newComment = '';
                "
            /></label>
            <button
              class="commentAddBtn"
              @click="
                popupStore.addCommentAct({
                  comment: newComment,
                  contentsNo: contents.no,
                });
                newComment = '';
              "
            >
              <span>??????</span>
            </button>
          </div>
          <div class="commentBox">
            <div class="comment" v-for="com in comments" :key="com">
              <div class="commentLeft">
                <span class="userNickname"> {{ com.nickname }} </span>
                <p>{{ com.comment }}</p>
              </div>
              <button
                class="commentDelBtn"
                v-if="com.id == user.id"
                @click="popupStore.delCommentAct(com.no)"
              >
                <span class="material-icons"> close </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="btns">
        <div class="btns">
          <router-link :to="`/edit/${contents.no}`">
            <button @click="popupStore.closePost()">
              <span>??????</span>
            </button>
          </router-link>
          <button @click="edit.deletePost(no)"><span>??????</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import PopupSkeleton from "../page/PopupSkeleton.vue";
import Heart from "../common/Heart.vue";
import {postStore} from "@/store/popup";
import {loginFormStore, authStore} from "@/store/user";
import {storeToRefs} from "pinia";
const popupStore = postStore();
const auth = authStore();
const login = loginFormStore();
const {loginStatus} = storeToRefs(login);
const {user, isAuth, heartContents} = storeToRefs(auth);
const {contents, comments, clickNum, ui} = storeToRefs(popupStore);

let newComment = ref("");
let heartNum = ref();
let btns = ref(false);

watch(contents, (newContents) => {
  heartNum.value = newContents.heartNum;
  if (newContents.userNum == user.value.userNum) {
    btns.value = true;
  }
});

watch(heartContents, (newHeartContents) => {
  heartNum.value = newHeartContents.heartNum;
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
            margin: 0 3px 3px 0;
            font-size: 12px;
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
            border: none;
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

@include tablet {
  .cover .popupItem {
    width: 80vw;
  }
}
@include mobile {
  .cover .popupItem {
    width: 90vw;
    .popupBody {
      .center {
        .infoBox .info {
          .location {
            font-size: 16px;
          }
        }
        .txtBox p {
          font-size: 12px;
        }
      }
      .commentWrap {
        padding: 10px;
        .commentBox {
          padding: 10px 0;
          .comment .commentLeft {
            .userNickname {
              width: 80px;
              display: flex;
              align-items: center;
              font-size: 10px;
            }
            p {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
