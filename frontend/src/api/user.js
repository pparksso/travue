import req from "./axiosInstance";

/**
 * 포스트,페이지 정보 가져오기
 */
function getPosts(num) {
  return req.get(`/index?page=${num}`);
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
  return req.post("/user/login", {
    id,
    pw,
  });
}
const userApi = {getPosts, idCheck, nicknameCheck, sendSignUp, sendLogin};
export default userApi;
