import req from "./axiosInstance";

/**
 * 포스트,페이지 정보 가져오기
 */
function getPosts(num) {
  return req.get(`/index?page=${num}`);
}

const userApi = {getPosts};
export default userApi;
