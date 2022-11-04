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
        this.comments = [];
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

export const myTourStore = defineStore("mytour", {
  state: () => ({
    myContents: [],
    myComments: [],
    myMinPage: 0,
    myPage: 0,
    myStartPage: 0,
    myTotalPage: 0,
    myLastPage: 0,
    myPageNum: 1,
  }),
  actions: {
    async getMyContents(num) {
      try {
        this.myContents = [];
        this.myComments = [];
        await userApi.getMyPosts(num).then((res) => {
          const items = res.data;
          this.myContents.push(items.contents);
          this.myComments.push(items.comments);
          this.myMinPage = items.minPage;
          this.myPage = items.page;
          this.myStartPage = items.startPage;
          this.myTotalPage = items.totalPage;
          this.myLastPage = items.lastPage;
        });
      } catch (err) {
        console.log(err);
      }
    },
    getMyPageNum(num) {
      this.myPageNum = num;
    },
  },
});

export const editStore = defineStore("edit", {
  state: () => ({
    editContents: {},
    src: "",
    cloudinaryFileName: "",
  }),
  actions: {
    goEditPage(num) {
      contentsApi
        .editFetch(num)
        .then((res) => {
          this.editContents = res.data.result;
          this.src = res.data.result.imgUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendImgFetch(sendImgData) {
      contentsApi
        .sendImg(sendImgData)
        .then((res) => {
          this.src = res.data.cloudinaryImgSrc;
          this.cloudinaryFileName = res.data.cloudinaryFileName;
        })
        .catch((err) => console.log(err));
    },
    sendUpdateFetch({title, date, location, desc, imgUrl, fileName, no}) {
      contentsApi
        .updatePost({title, date, location, desc, imgUrl, fileName, no})
        .then((res) => {
          if (res.data.update) {
            this.src = "";
            window.location.href = "/";
          } else {
            alert("다시 입력해주세요");
          }
        })
        .catch((err) => console.log(err));
    },
    deletePost(no) {
      if (window.confirm("삭제 하시겠습니까?")) {
        contentsApi
          .deletePost(no)
          .then((res) => {
            if (res.data.delete) {
              window.location.href = "/";
            }
          })
          .catch((err) => console.log(err));
      } else {
        return false;
      }
    },
  },
});
