import {defineStore} from "pinia";
import contentsApi from "@/api/contents";

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
    contents: [],
    comments: [],
  }),
  actions: {
    clickPost(no) {
      contentsApi
        .popupFetch(no)
        .then((res) => {
          this.contents = res.data.contents;
          this.comments = res.data.comments;
        })
        .catch((err) => console.log(err));
      this.contents = [];
      this.comments = [];
      this.now = true;
    },
    closePost() {
      this.now = false;
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
