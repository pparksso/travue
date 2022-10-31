import {defineStore} from "pinia";
import userApi from "@/api/user";

export const joinStore = defineStore("join", {
  state: () => ({
    idOk: false,
    idNo: false,
    nicknameOk: false,
    nicknameNo: false,
  }),
  actions: {
    isId(id) {
      userApi
        .idCheck(id)
        .then((res) => {
          const data = res.data.idCheck;
          if (data) {
            (this.idOk = true), (this.idNo = false);
          } else {
            (this.idOk = false), (this.idNo = true);
          }
        })
        .catch((err) => console.log(err, "500보내야됨"));
    },
    blankId() {
      this.idOk = false;
      this.idNo = false;
    },
    idStatusChange() {
      this.idNo = true;
    },
    nicknameStatusChange() {
      this.nicknameNo = true;
    },
    isNickname(nickname) {
      userApi
        .nicknameCheck(nickname)
        .then((res) => {
          const data = res.data.isNickname;
          if (data) {
            this.nicknameOk = true;
            this.nicknameNo = false;
          } else {
            this.nicknameOk = false;
            this.nicknameNo = true;
          }
        })
        .catch((err) => console.log(err, "500보내야함"));
    },
    blankNickname() {
      this.nicknameOk = false;
      this.nicknameNo = false;
    },
    sendSignUpForm(id, nickname, pw) {
      userApi
        .sendSignUp(id, nickname, pw)
        .then((res) => {
          const data = res.data.isjoin;
          if (data) {
            alert("회원가입을 축하드립니다. 로그인 후 이용 부탁드립니다.");
          }
        })
        .catch((err) => console.log(err, "500 보내야함"));
    },
  },
});

export const loginFormStore = defineStore("loginForm", {
  state: () => ({}),
  actions: {
    sendLoginForm(id, pw) {
      userApi.sendLogin(id, pw).then((res) => console.log(res));
    },
  },
});
