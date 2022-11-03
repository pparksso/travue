import req from "./axiosInstance";

/**
 * 이미지 바로 띄우기(사진 보내고, url 받음)
 */
function sendImg(sendImgData) {
  return req.post("/create/sendimg", sendImgData, {
    headers: {
      enctype: "multipart/form-data",
    },
  });
}

/**
 * 글 정보 보내기
 */
function sendCreate({title, date, location, desc, imgUrl, fileName}) {
  return req.post("/create/new", {
    title,
    date,
    location,
    desc,
    imgUrl,
    fileName,
  });
}

/**
 * 수정페이지로 이동
 */
function editPetch(num) {
  return req.get(`/update/?edit=${num}`);
}

/**
 * 포스트 수정
 */
function updatePost({title, date, location, desc, imgUrl, fileName, no}) {
  return req.post("/update/done", {
    title,
    date,
    location,
    desc,
    imgUrl,
    fileName,
    no,
  });
}
/**
 * 포스트 삭제
 */
function deletePost(no) {
  return req.post("/update/delete", {no: no});
}
const contentsApi = {sendImg, sendCreate, editPetch, updatePost, deletePost};

export default contentsApi;
