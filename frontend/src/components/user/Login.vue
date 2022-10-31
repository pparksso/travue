<template>
  <div class="login">
    <div class="blackBg">
      <div class="whiteBg">
        <div class="top">
          <h2>Login</h2>
          <button @click="close">
            <span class="material-icons"> close </span>
          </button>
        </div>
        <div class="mid">
          <input type="text" placeholder="ID" v-model="id" />
          <input type="password" placeholder="PASSWORD" v-model="pw" />
        </div>
        <div class="bottom">
          <button @click="sendLoginForm()"><span>LOGIN</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {loginStore} from "@/store/popup";
import {loginFormStore} from "@/store/user";
import {ref} from "@vue/reactivity";

let id = ref("");
let pw = ref("");

const login = loginStore();
const loginForm = loginFormStore();
function close() {
  login.close();
}
function sendLoginForm() {
  loginForm.sendLoginForm(id.value, pw.value);
}
</script>

<style lang="scss" scoped>
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
        &:first-child {
          margin-bottom: 10px;
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
