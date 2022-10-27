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
    </div>
  </div>
</template>

<script>
import {mainStore} from "@/store/contents";
import {postStore} from "@/store/popup";
export default {
  name: "PostPopup",
  setup() {
    const items = mainStore();
    const post = postStore();
    return {
      items,
      post,
    };
  },
  data() {
    return {
      data: {},
      comment: [],
    };
  },
  created() {
    this.items.getPosts[0].map((item) => {
      if (item.no == this.post.getPostId) {
        this.data = item;
      }
    });
    this.items.getComments[0].map((item) => {
      if (item.no == this.post.getPostId) {
        this.comment.push(item);
      }
    });
  },
};
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
  }
}
</style>
