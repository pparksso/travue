const express = require("express");
const router = express.Router();
const path = require("path");
const { cloudinary } = require("../config/cloudinary");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const userDb = require("../db/user");
const countDb = require("../db/count");
const contentsDb = require("../db/contents");

const fileUpload = multer({ storage: storage });

router.post("/sendimg", fileUpload.single("image"), (req, res) => {
  res.json({
    cloudinaryImgSrc: req.file.path,
    cloudinaryFileName: req.file.filename,
  });
});

router.post("/new", fileUpload.single("image"), async (req, res) => {
  if (req.user) {
    const title = req.body.title;
    const date = req.body.date;
    const location = req.body.location;
    const desc = req.body.desc;
    const imgUrl = req.body.imgUrl;
    const userNum = req.user.userNum;
    const nickname = req.user.nickname;
    const fileName = req.body.fileName;
    countDb.findOne({ name: "total" }, (err, result) => {
      const no = result.count + 1;
      if (err) {
        console.log(err);
      }
      contentsDb.create(
        {
          no: no,
          userNum: userNum,
          title: title,
          date: date,
          location: location,
          desc: desc,
          imgUrl: imgUrl,
          heartNum: 0,
          nickname: nickname,
          fileName: fileName,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          }
          countDb.updateOne(
            { name: "total" },
            {
              $inc: {
                count: 1,
              },
            },
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      );
      res.json({ isCreate: true });
    });
  } else {
    res.json({ auth: false });
  }
});
module.exports = router;
