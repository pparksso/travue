<template>
  <section id="mypage" class="subSection">
    <div class="title">
      <h1>My Page</h1>
    </div>
    <form action="" method="POST">
      <div class="inputBox">
        <label class="myPageLabel"
          ><span>ID</span
          ><input
            type="text"
            name="updateId"
            id="updateId"
            v-model="user.id"
            readonly
        /></label>
      </div>
      <div class="inputBox">
        <label class="myPageLabel"
          ><span>Password</span
          ><input
            type="password"
            name="updatePw"
            id="updatePw"
            v-model="pw01"
            maxlength="20"
        /></label>
      </div>
      <div class="inputBox">
        <label class="myPageLabel"
          ><span>PW Check</span
          ><input
            type="password"
            name="updatePwCheck"
            id="updatePwCheck"
            v-model="pw02"
            maxlength="20"
        /></label>
      </div>
      <div class="inputBox">
        <label class="myPageLabel"
          ><span>Nickname</span
          ><input
            type="text"
            name="updateNickname"
            id="updateNickname"
            @input="nickname = $event.target.value"
            :value="nickname"
        /></label>
      </div>
      <div class="btns">
        <button @click.prevent="modifyBtn()">
          <span>수정</span>
        </button>
        <button id="signoutBtn" @click.prevent="signOutBtn()">
          <span>탈퇴</span>
        </button>

        <router-link to="/">
          <button type="reset" id="myPageResetBtn">
            <span>취소</span>
          </button>
        </router-link>
      </div>
    </form>
  </section>
</template>

<script setup>
import {authStore, myPageStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {ref} from "vue";
const auth = authStore();
const myPage = myPageStore();
const {user} = storeToRefs(auth);

let pw01 = ref("");
let pw02 = ref("");
let nickname = ref("");

nickname.value = user.value.nickname;
// 수정 버튼
function modifyBtn() {
  if (this.pw01 == this.pw02) {
    if (this.pw01.length < 8) {
      alert("8자 이상이어야됨");
    } else {
      myPage.modifyInfoAct({
        id: user.value.id,
        pw: this.pw01,
        nickname: this.nickname,
      });
    }
  } else {
    alert("비밀번호가 동일하지 않습니다.");
  }
}
// 탈퇴 버튼
function signOutBtn() {
  if (pw01.value.length == 0 || pw02.value.length == 0) {
    alert("비밀번호를 입력해주세요");
  } else if (pw01.value !== pw02.value) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    myPage.signOutAct({id: user.value.id, pw: pw01.value});
  }
}
</script>

<style lang="scss" scoped>
.subSection {
  width: 60vw;
  margin: 0 auto;
  padding: 50px 0 100px 0;
  height: calc(70vh - 120px);
  .title {
    margin-bottom: 30px;
    h1 {
      font-weight: 700;
    }
  }
  form {
    .imgBox {
      width: 100%;
      height: 60vh;
      margin-bottom: 20px;
      background-color: #fffbfb;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .file {
      cursor: pointer;
    }
    .inputBox {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px 30px;
      border: 1px solid #aaa;
      border-radius: 10px;
      &:nth-child(5) {
        margin-bottom: 30px;
      }
      label {
        display: flex;
        justify-content: space-between;
        position: relative;
        &.myPageLabel::before {
          left: 12%;
        }
        &::before {
          display: block;
          width: 1px;
          height: calc(100% + 20px);
          position: absolute;
          top: -10px;
          left: 90px;
          z-index: 1;
          content: "";
          background-color: #ddd;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
        }
        input {
          width: 86%;
          border: none;
          font-family: "GangwonEdu_OTFBoldA";
          font-size: 19px;
          line-height: 1.3;
          vertical-align: bottom;
          outline: none;
          &::placeholder {
            font-size: 20px;
          }
        }
        input[type="file"] {
          width: 0;
          height: 0;
          position: absolute;
          overflow: hidden;
          padding: 0;
          border: 0;
        }
      }
      textarea {
        width: 100%;
        height: 100%;
        border: none;
        font-family: "GangwonEdu_OTFBoldA";
        font-size: 19px;
        resize: none;
        outline: none;
      }
    }
    .dateBox {
      width: 25%;
      label {
        &::before {
          display: none;
        }
        span {
          position: absolute;
          top: 40%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
    .btns {
      margin-top: 50px;
      text-align: right;
      button {
        padding: 5px 10px;
        background-color: #333;
        &:not(:last-child) {
          margin-right: 10px;
        }
        span {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }
}
.errBody {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
</style>
