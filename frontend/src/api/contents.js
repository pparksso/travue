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
const contentsApi = {sendImg, sendCreate};

export default contentsApi;
