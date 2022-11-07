const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const userDb = require("../db/user");
const countDb = require("../db/count");
const contentsDb = require("../db/contents");
const commentsDb = require("../db/comments");
const { loginCheck } = require("../routes/middleware");

router.post("/join", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const nickname = req.body.nickname;
  bcrypt.hash(pw, saltRounds, (err, hash) => {
    countDb.findOne({ name: "user" }, (err, result) => {
      const userNum = result.count + 1;
      if (err) {
        res.status(500).json({ message: "서버에러" });
      }
      userDb.create(
        {
          userNum: userNum,
          id: id,
          pw: hash,
          nickname: nickname,
          heart: [],
        },
        (err, result) => {
          if (err) {
            res.status(500).json({ message: "서버 에러" });
          }
          countDb.updateOne(
            { name: "user" },
            {
              $inc: {
                count: 1,
              },
            },
            (err, result) => {
              if (err) {
                res.status(500).json({ message: "서버 에러" });
              }
            }
          );
        }
      );
      res.json({ isjoin: true });
    });
  });
});

router.post("/idcheck", (req, res) => {
  const id = req.body.id;
  userDb.findOne({ id: id }, (err, result) => {
    if (err) {
      res.status(500).json({ message: "서버에러" });
    }
    if (!result) {
      res.json({ idCheck: true });
    } else {
      res.json({ idChech: false });
    }
  });
});
router.post("/nicknamecheck", (req, res) => {
  const nickname = req.body.nickname;
  userDb.findOne({ nickname: nickname }, (err, result) => {
    if (err) {
      res.status(500).json({ message: "서버에러" });
    }
    if (!result) {
      res.json({ isNickname: true });
    } else {
      res.json({ isNickname: false });
    }
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.json({ info: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.json({ message: "로그인 되었습니다.", isLogin: true, userInfo: req.user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.json({ isLogout: true });
  }
});

router.get("/auth", (req, res) => {
  if (req.user) {
    res.json({ userInfo: req.user, auth: true });
  } else {
    res.json({ auth: false });
  }
});

router.get("/mytour", async (req, res) => {
  try {
    if (req.user) {
      let page = parseInt(req.query.page);
      let size = 6;
      const pageGroupSize = 5;
      if (!page) {
        page = 1;
      }
      const skip = (page - 1) * size;
      const contents = await contentsDb.find({ userNum: req.user.userNum }).sort({ no: -1 }).limit(size).skip(skip);
      const comments = await commentsDb.find().sort({ _id: -1 });
      const totalContents = await contentsDb.countDocuments({ userNum: req.user.userNum });
      const totalPage = await Math.ceil(totalContents / size);
      const startPage = page - ((page - 1) % pageGroupSize);
      const lastPage = startPage + (pageGroupSize - 1);
      const minPage = totalPage <= lastPage ? totalPage : lastPage;
      if (totalContents) {
        if (page > totalPage) {
          return res.status(404).json({ message: "찾을 수 없는 페이지입니다." });
        }
      }
      await res.json({ startPage, minPage, totalPage, lastPage, page, contents, comments, userInfo: req.user });
    } else {
      res.json({ auth: false });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/mypage", (req, res) => {
  if (req.user) {
    res.render("mypage", { title: "My page", list: req.user });
  } else {
    res.send(`<script>alert("시간이 지나 로그인이 해제되었습니다. 다시 로그인 해주세요."); location.href = "/"</script>`);
  }
});

router.post("/mypageupdate", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const nickname = req.body.nickname;
  bcrypt.hash(pw, saltRounds, (err, hash) => {
    userDb.updateOne({ id: id }, { $set: { id: id, pw: hash, nickname: nickname } }, (err, result) => {
      res.json({ infoChange: true });
      if (err) {
        console.log(err);
      }
    });
  });
});

router.post("/signout", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  bcrypt.compare(pw, req.user.pw, (err, same) => {
    if (same) {
      contentsDb
        .deleteMany({ userNum: req.user.userNum })
        .then(() => {
          userDb.deleteOne({ id: id }).then(() => {
            res.json({ delete: true });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({ isPw: true });
    }
  });
});
module.exports = router;
