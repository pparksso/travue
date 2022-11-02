import {defineStore} from "pinia";

import userApi from "@/api/user";
import contentsApi from "@/api/contents";

export const mainStore = defineStore("main", {
  state: () => ({
    contents: [],
    comments: [],
    minPage: 0,
    page: 0,
    startPage: 0,
    totalPage: 0,
    lastPage: 0,
    pageNum: 1,
  }),
  actions: {
    async getContents(num) {
      try {
        this.contents = [];
        await userApi.getPosts(num).then((res) => {
          const items = res.data;
          this.contents.push(items.contents);
          this.comments.push(items.comments);
          this.minPage = items.minPage;
          this.page = items.page;
          this.startPage = items.startPage;
          this.totalPage = items.totalPage;
          this.lastPage = items.lastPage;
        });
      } catch (err) {
        console.log(err);
      }
    },
    getPageNum(num) {
      this.pageNum = num;
    },
  },
  getters: {
    getPosts() {
      return this.contents;
    },
    getComments() {
      return this.comments;
    },
  },
});

export const newStore = defineStore("new", {
  state: () => ({
    src: "",
    cloudinaryFileName: "",
  }),
  actions: {
    sendImgFetch(sendImgData) {
      contentsApi
        .sendImg(sendImgData)
        .then((res) => {
          this.src = res.data.cloudinaryImgSrc;
          this.cloudinaryFileName = res.data.cloudinaryFileName;
        })
        .catch((err) => console.log(err));
    },
    sendNewFetch({title, date, location, desc, imgUrl, fileName}) {
      contentsApi
        .sendCreate({title, date, location, desc, imgUrl, fileName})
        .then((res) => {
          if (res.data.isCreate) {
            this.src = "";
            window.location.href = "/";
          } else {
            alert("다시 입력해주세요");
          }
        })
        .catch((err) => console.log(err));
    },
  },
});
