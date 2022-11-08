import {defineStore} from "pinia";
import userApi from "@/api/user";
import contentsApi from "@/api/contents";

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
        .catch(() => (window.location.href = "/serverErr"));
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
        .catch(() => (window.location.href = "/serverErr"));
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
        .catch(() => (window.location.href = "/serverErr"));
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
    loginMessage: {},
  }),
  actions: {
    sendLoginForm(id, pw) {
      userApi
        .sendLogin(id, pw)
        .then((res) => {
          const login = res.data.isLogin;
          if (!login) {
            alert(res.data.info);
            this.loginStatus = false;
          } else {
            window.location.reload();
            this.loginStatus = true;
            this.loginMessage = res.data.message;
          }
        })
        .catch(() => {
          window.location.href = "/serverErr";
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
        } else {
          window.location.href = "/serverErr";
        }
      });
    },
  },
});

export const authStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    user: {},
    heartContents: {},
  }),
  actions: {
    AuthFetch() {
      userApi
        .authFetch()
        .then((res) => {
          const result = res.data.auth;
          const userInfo = res.data.userInfo;
          if (result) {
            this.isAuth = true;
            this.user = userInfo;
          } else {
            this.isAuth = false;
          }
        })
        .catch(() => {
          window.location.href = "/serverErr";
        });
    },
    plusHeartAct(no) {
      contentsApi
        .heartAddFetch(no)
        .then((res) => {
          this.user = res.data.user;
          this.heartContents = res.data.result;
        })
        .catch((err) => console.log(err));
    },
    minusHeartAct(no) {
      contentsApi
        .delHeartFetch(no)
        .then((res) => {
          this.user = res.data.user;
          this.heartContents = res.data.result;
        })
        .catch((err) => console.log(err));
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
            window.location.href = "/serverErr";
          }
        })
        .catch(() => {
          window.location.href = "/serverErr";
        });
    },
    signOutAct({id, pw}) {
      userApi
        .signOutFetch({id, pw})
        .then((res) => {
          if (res.data.delete) {
            alert("탈퇴되었습니다. 감사합니다.");
            window.location.href = "/";
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
        .catch(() => (window.location.href = "/serverErr"));
    },
  },
});
