import {defineStore} from "pinia";
import userApi from "@/api/user";

export const joinStore = defineStore("join", {
  state: () => ({
    idOk: false,
    idNo: false,
    nicknameOk: false,
    nicknameNo: false,
    loginStatus: "",
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
    blankStatus() {
      this.idOk = false;
      this.idNo = false;
      this.nicknameOk = false;
      this.nicknameNo = false;
    },
  },
});

export const loginFormStore = defineStore("loginForm", {
  state: () => ({
    loginStatus: false,
    loginInfo: {},
    loginMessage: {},
  }),
  actions: {
    sendLoginForm(id, pw) {
      userApi
        .sendLogin(id, pw)
        .then((res) => {
          const login = res.data.isLogin;
          if (!login) {
            this.loginInfo = res.data.info;
            this.loginStatus = false;
          } else {
            window.location.reload();
            this.loginStatus = true;
            this.loginMessage = res.data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export const logoutStore = defineStore("logout", {
  state: () => ({
    logoutState: false,
  }),
  actions: {
    isLogout() {
      userApi.logoutFetch().then((res) => {
        const result = res.data.isLogout;
        if (result) {
          this.logoutState = true;
          window.location.href = "/";
        }
      });
    },
  },
});

export const authStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    user: {},
  }),
  actions: {
    AuthFetch() {
      userApi.authFetch().then((res) => {
        console.log(res.data);
        const result = res.data.auth;
        const userInfo = res.data.userInfo;
        if (result) {
          this.isAuth = true;
          this.user = userInfo;
        } else {
          this.isAuth = false;
        }
      });
    },
  },
});

export const myPageStore = defineStore("myPage", {
  state: () => ({}),
  actions: {
    modifyInfoAct({id, pw, nickname}) {
      userApi
        .modifyInfoFetch({id, pw, nickname})
        .then((res) => {
          if (res.data.infoChange) {
            alert("정보가 수정되었습니다.");
            window.location.href = "/";
          } else {
            console.log("실패");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
