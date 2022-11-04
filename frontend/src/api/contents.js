import req from "./axiosInstance";

/**
 * 포스트 팝업창 데이터 받기
 */
function popupFetch(no) {
  return req.get(`/index/popup/?no=${no}`);
}
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
function editFetch(num) {
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
/**
 * 댓글 추가
 */
function AddCommentFetch({comment, contentsNo}) {
  return req.post("/comment/add", {comment, contentsNo});
}
/**
 * 댓글 삭제
 */
function delCommentFetch(no) {
  return req.post("/comment/delete", {no: no});
}
/**
 * 하트 더하기
 */
function heartAddFetch(no) {
  return req.post("/heart/plus", no);
}

const contentsApi = {
  sendImg,
  sendCreate,
  editFetch,
  updatePost,
  deletePost,
  heartAddFetch,
  popupFetch,
  AddCommentFetch,
  delCommentFetch,
};

export default contentsApi;
