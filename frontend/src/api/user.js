import req from "./axiosInstance";

/**
 * 포스트,페이지 정보 가져오기
 */
function getPosts(num) {
  return req.get(`/index?page=${num}`);
}
/**
 * mytour 포스트, 페이지 정보 가져오기
 */
function getMyPosts(num) {
  return req.get(`/user/mytour?page=${num}`);
}
/**
 * 가입 시 중복 아이디 체크
 */
function idCheck(id) {
  return req.post("/user/idcheck", {
    id,
  });
}
/**
 * 가입 시 닉네임 체크
 */
function nicknameCheck(nickname) {
  return req.post("/user/nicknamecheck", {nickname});
}
/**
 * 회원 가입
 */
function sendSignUp(id, nickname, pw) {
  return req.post("/user/join", {
    id,
    nickname,
    pw,
  });
}
/**
 * 로그인
 */
function sendLogin(id, pw) {
  return req.post(
    "/user/login",
    {
      id,
      pw,
    },
    {withCredentials: true}
  );
}

/**
 * 로그아웃
 */
function logoutFetch() {
  return req.get("/user/logout");
}

/**
 * 로그인 체크
 */
function authFetch() {
  return req.get("/user/auth");
}

/**
 * 내정보 수정
 */
function modifyInfoFetch({id, pw, nickname}) {
  return req.post("/user/mypageupdate", {id, pw, nickname});
}
const userApi = {
  getPosts,
  idCheck,
  nicknameCheck,
  sendSignUp,
  sendLogin,
  logoutFetch,
  authFetch,
  getMyPosts,
  modifyInfoFetch,
};
export default userApi;
