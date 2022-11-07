import {createRouter, createWebHistory} from "vue-router";
import Layout from "../components/layout/Layout.vue";
import MainView from "../views/MainView.vue";
import New from "../components/page/New";
import MyTourView from "../views/MyTourView.vue";
import Edit from "../components/page/Edit.vue";
import MyPage from "../components/page/MyPage.vue";
import notFound from "../views/notFound.vue";
import serverErr from "../views/serverErr.vue";

import {storeToRefs} from "pinia";
import {authStore} from "@/store/user";

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {path: "/", component: MainView},
      {path: "mytour", component: MyTourView},
      {path: "new", component: New},
      {path: "edit/:num", component: Edit},
      {path: "mypage", component: MyPage},
    ],
  },
  {path: "/serverErr", name: "serverErr", component: serverErr},
  {
    path: "/notFound",
    name: "notFound",
    component: notFound,
  },
  {path: "/:pathMatch(.*)*", redirect: "/notFound"},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async function (to, from, next) {
  const auth = await authStore();
  const {isAuth} = await storeToRefs(auth);
  await auth.AuthFetch();
  if (isAuth) {
    console.log("ok");
  } else {
    console.log("no");
  }
  next();
});
export default router;
