const express = require("express");
const router = express.Router();
const passport = require("passport");
const userDb = require("../db/user");
const countDb = require("../db/count");
const contentsDb = require("../db/contents");
const commentsDb = require("../db/comments");
const { loginCheck } = require("../routes/middleware");

router.get("/index", loginCheck, async (req, res, next) => {
  try {
    // 페이지네이션
    let page = parseInt(req.query.page);
    const size = 6;
    const pageGroupSize = 5;
    if (!page) {
      page = 1;
    }
    const skip = (page - 1) * size;
    const contents = await contentsDb.find().sort({ no: -1 }).limit(size).skip(skip);
    const comments = await commentsDb.find().sort({ _id: -1 });
    const totalContents = await contentsDb.countDocuments({});
    const totalPage = await Math.ceil(totalContents / size);
    const startPage = page - ((page - 1) % pageGroupSize);
    const lastPage = startPage + (pageGroupSize - 1);
    const minPage = totalPage <= lastPage ? totalPage : lastPage;
    if (page > totalPage) {
      return res.status(404).json({ message: "찾을 수 없는 페이지입니다." });
    }
    res.json({ startPage, minPage, totalPage, lastPage, page, contents, comments, userInfo: req.user });
  } catch (err) {
    res.redirect("500");
  }
});
router.get("/index/popup", async (req, res) => {
  try {
    let no = Number(req.query.no);
    const contents = await contentsDb.findOne({ no });
    const comments = await commentsDb.find({ contentsNo: no });
    res.json({ contents, comments });
  } catch (err) {
    console.log(err);
  }
});
router.get("/500", (req, res) => {
  res.status(500).render("500");
});

module.exports = router;
