import {defineStore} from "pinia";
import request from "@/api/axiosInstance";
import {ref} from "vue";

export const mainStore = defineStore("main", {
  state: () => ({
    contents: [],
    comments: [],
    minPage: ref(0),
    page: ref(0),
    startPage: ref(0),
    totalPage: ref(0),
    lastPage: ref(0),
    pageNum: ref(1),
  }),
  actions: {
    async getContents(num) {
      try {
        await request({
          method: "GET",
          url: `/index?page=${num}`,
        }).then((res) => {
          const items = res.data;
          this.contents.push(items.contents);
          this.comments.push(items.comments);
          this.minPage = items.minPage;
          this.page = items.page;
          this.startPage = items.startPage;
          this.totalPage = items.totalPage;
          console.log(this.totalPage);
          this.lastPage = items.lastPage;
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
  },
});
