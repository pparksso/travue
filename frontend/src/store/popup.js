import {defineStore} from "pinia";

export const loginStore = defineStore("login", {
  state: () => ({
    now: false,
  }),
  actions: {
    open() {
      this.now = true;
    },
    close() {
      this.now = false;
    },
  },
  getters: {
    loginState() {
      return this.now;
    },
  },
});

export const signUpStore = defineStore("signUp", {
  state: () => ({
    now: false,
  }),
  actions: {
    open() {
      this.now = true;
    },
    close() {
      this.now = false;
    },
  },
  getters: {
    signUpState() {
      return this.now;
    },
  },
});
