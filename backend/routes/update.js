const express = require("express");
const router = express.Router();
const { cloudinary } = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { storage } = require("../config/cloudinary");
const userDb = require("../db/user");
const countDb = require("../db/count");
const contentsDb = require("../db/contents");
const commentsDb = require("../db/comments");

const fileUpload = multer({ storage: storage });

router.get("/", (req, res) => {
  const editNum = parseInt(req.query.edit);
  if (req.user) {
    contentsDb.findOne({ no: editNum }, (err, result) => {
      if (err) {
        res.status(500).json({ message: "서버에러" });
      }
      res.json({ result });
    });
  } else {
    res.json({ auth: false });
  }
});

router.post("/done", async (req, res) => {
  try {
    const imgUrl = req.body.imgUrl;
    const date = req.body.date;
    const title = req.body.title;
    const location = req.body.location;
    const desc = req.body.desc;
    const fileName = req.body.fileName;
    const no = parseInt(req.body.no);
    await contentsDb.updateOne(
      { no: no },
      {
        $set: {
          imgUrl: imgUrl,
          date: date,
          title: title,
          location: location,
          desc: desc,
          fileName: fileName,
        },
      }
    );
    res.json({ update: true });
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendimg", fileUpload.single("image"), (req, res) => {
  res.json({
    cloudinaryImgSrc: req.file.path,
    cloudinaryFileName: req.file.filename,
  });
});

router.post("/delete", async (req, res) => {
  try {
    const no = Number(req.body.no);
    const result = await contentsDb.findOne({ no: no });
    await cloudinary.uploader.destroy(result.fileName);
    await contentsDb.deleteOne({ no: no });
    await commentsDb.deleteMany({ contentsNo: no });
    res.json({ delete: true });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
