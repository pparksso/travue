import {defineStore} from "pinia";
import request from "@/api/axiosInstance";

export const mainStore = defineStore("main", {
  state: () => ({
    contents: [],
    comments: [],
    minPage: 1,
    page: 1,
    startPage: 1,
    totalpage: 1,
  }),
  actions: {
    async getContents() {
      try {
        await request({
          method: "GET",
          url: "/index",
        }).then((res) => {
          const items = res.data;
          this.contents.push(items.contents);
          this.comments.push(items.comments);
          this.minPage = items.minPage;
          this.page = items.page;
          this.startPage = items.startPage;
          this.totalpage = items.totalpage;
        });
      } catch (err) {
        console.log(err, "500보내야됨");
      }
    },
  },
  getters: {
    getPosts() {
      return this.contents;
    },
    getComments() {
      return this.comments;
    },
    getMinPage() {
      return this.minPage;
    },
    getPage() {
      return this.page;
    },
    getStartPage() {
      return this.startPage;
    },
    getTotalPage() {
      return this.totalpage;
    },
  },
});
