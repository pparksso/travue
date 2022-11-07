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
        .catch(() => (window.location.href = "serverErr"));
      this.contents = [];
      this.comments = [];
      this.now = true;
    },
    closePost() {
      this.now = false;
    },
    addCommentAct({comment, contentsNo}) {
      contentsApi
        .AddCommentFetch({comment, contentsNo})
        .then((res) => {
          this.comments.push(res.data);
        })
        .catch(() => (window.location.href = "serverErr"));
    },
    delCommentAct(no) {
      contentsApi
        .delCommentFetch(no)
        .then((res) => {
          if (res.data.del) {
            const newArr = this.comments.filter((i) => {
              return i.no !== no;
            });
            this.comments = [...newArr];
          }
        })
        .catch(() => (window.location.href = "serverErr"));
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
