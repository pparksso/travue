<template>
  <div class="signUp">
    <div class="blackBg">
      <div class="whiteBg">
        <div class="top">
          <h2>Sign Up</h2>
          <button @click="closeBtn">
            <span class="material-icons"> close </span>
          </button>
        </div>
        <div class="mid">
          <input
            type="text"
            placeholder="ID (영어, 숫자, 6자 이상)"
            v-model.trim="userId"
            minlength="6"
            maxlength="16"
            @blur="idCheck()"
            ref="idRef"
          />
          <div class="check">
            <p class="ok" v-if="idOk">사용할 수 있는 아이디입니다.</p>
            <p class="no" v-if="idNo">사용할 수 없는 아이디입니다.</p>
          </div>
          <input
            type="text"
            placeholder="NICKNAME (2자 이상)"
            minlength="2"
            maxlength="12"
            :value="nickname"
            @input="nickname = $event.target.value"
            @blur="nicknameCheck()"
            ref="nicknameRef"
          />
          <div class="check">
            <p class="ok" v-if="nicknameOk">사용할 수 있는 닉네임입니다.</p>
            <p p class="no" v-if="nicknameNo">사용할 수 없는 닉네임입니다.</p>
          </div>
          <input
            type="password"
            placeholder="PASSWORD (8자 이상)"
            v-model="userPw"
            minlength="8"
            maxlength="20"
            @blur="samePw()"
          />
          <input
            type="password"
            placeholder="PASSWORD CHECK"
            v-model="userPw02"
            minlength="8"
            maxlength="20"
            @keyup="samePw()"
            @keydown.enter="sendForm()"
          />
          <div class="check">
            <p class="ok" v-if="pwOk">비밀번호가 일치합니다.</p>
            <p class="no" v-if="pwNo">비밀번호를 다시 한번 확인해 주세요.</p>
          </div>
        </div>
        <div class="bottom">
          <button @click="sendForm()"><span>SIGN UP</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {signUpStore} from "@/store/popup";
import {joinStore} from "@/store/user";
import {storeToRefs} from "pinia";

let userId = ref("");
let nickname = ref("");
let userPw = ref("");
let userPw02 = ref("");
let pwOk = ref(false);
let pwNo = ref(false);
let idRef = ref();
let nicknameRef = ref();
const signUp = signUpStore();
const join = joinStore();
const {idOk, idNo, nicknameOk, nicknameNo} = storeToRefs(join);

onMounted(() => {
  idRef.value.focus();
});
// 팝업창 닫기
function closeBtn() {
  signUp.close();
  join.blankStatus();
  this.pwOk = false;
  this.pwNo = false;
  this.userId = "";
  this.nickname = "";
  this.userPw = "";
  this.userPw02 = "";
}
// 아이디 체크
function idCheck() {
  const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
  if (this.userId.length < 6 || regExp.test(this.userId)) {
    this.userId = "";
    join.idStatusChange();
    idRef.value.focus();
    return false;
  }
  join.isId(this.userId);
}
// 닉네임 체크
function nicknameCheck() {
  if (this.nickname.length < 2) {
    this.nickname = "";
    join.nicknameStatusChange();
    nicknameRef.value.focus();
    return false;
  }
  join.isNickname(this.nickname);
}
// 비밀번호 일치 체크
function samePw() {
  if (this.userPw.length < 8) {
    alert("비밀번호는 8자 이상입니다.");
    return false;
  }
  if (this.userPw == "" && this.userPw02 == "") {
    this.pwOk = false;
    this.pwNo = false;
    return false;
  }
  if (this.userPw == this.userPw02) {
    this.pwOk = true;
    this.pwNo = false;
    // return false;
  }
  if (this.userPw !== this.userPw02) {
    this.pwOk = false;
    this.pwNo = true;
    return false;
  }
}
// 폼 전송
function sendForm() {
  if (this.idOk == false) {
    alert("아이디를 확인해주세요.");
    return false;
  }
  if (this.nicknameOk == false) {
    alert("닉네임을 확인해주세요.");
    return false;
  }
  if (this.pwNo || this.pwOk == false) {
    alert("비밀번호를 확인해주세요.");
    return false;
  }
  join.sendSignUpForm(this.userId, this.nickname, this.userPw);
  closeBtn();
}
</script>

<style lang="scss" scope>
.blackBg {
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  .whiteBg {
    background-color: #fff;
    width: 300px;
    border-radius: 10px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #aaa;
      h2 {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .mid {
      padding: 20px;
      input {
        padding: 5px;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .check {
        p {
          font-size: 11px;
          margin-bottom: 5px;
          &.ok {
            color: rgb(4, 0, 255);
          }
          &.no {
            color: #f00;
          }
        }
      }
    }
    .bottom {
      padding: 10px;
      border-top: 1px solid #aaa;
      text-align: right;
      button {
        padding: 7px;
        background-color: #333;
        border-radius: 5px;
        span {
          font-size: 16px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
