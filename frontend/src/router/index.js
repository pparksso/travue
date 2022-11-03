import {createRouter, createWebHistory} from "vue-router";
import MainView from "../views/MainView.vue";
import New from "../components/page/New";
import MyTourView from "../views/MyTourView.vue";
import Edit from "../components/page/Edit.vue";
import MyPage from "../components/page/MyPage.vue";

import {storeToRefs} from "pinia";
import {authStore} from "@/store/user";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {path: "/mytour", name: "mytour", component: MyTourView},
  {
    path: "/new",
    name: "new",
    component: New,
    beforeEnter: (to, from, next) => {
      const auth = authStore();
      const {isAuth} = storeToRefs(auth);
      if (isAuth) {
        next();
      } else {
        alert(
          "로그인이 해제되었습니다. 다시 로그인해주세요. 로그인 후 이용가능합니다."
        );
        next("/");
      }
    },
  },
  {
    path: "/edit/:num",
    name: "edit",
    props: true,
    component: Edit,
    beforeEnter: (to, from, next) => {
      const auth = authStore();
      const {isAuth} = storeToRefs(auth);
      if (isAuth) {
        next();
      } else {
        alert(
          "로그인이 해제되었습니다. 다시 로그인해주세요. 로그인 후 이용가능합니다."
        );
        next("/");
      }
    },
  },
  {path: "/mypage", name: "mypage", component: MyPage},
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
