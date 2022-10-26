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

export const postStore = defineStore("post", {
  state: () => ({
    now: false,
    id: 0,
  }),
  actions: {
    clickPost(id) {
      this.id = id;
      this.now = true;
      // console.log(this.id);
    },
  },
  getters: {
    getPostId() {
      return this.id;
    },
    openPost() {
      return this.now;
    },
  },
});
