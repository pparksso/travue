const express = require("express");
const router = express.Router();
const userDb = require("../db/user");
const countDb = require("../db/count");
const contentsDb = require("../db/contents");

router.get("/arr", (req, res) => {
  userDb.findOne({ userNum: req.user.userNum }, (err, result) => {
    if (err) {
      res.redirect("500");
    }
    res.json({ heartArr: result.heart });
  });
});

router.post("/plus", async (req, res) => {
  try {
    const no = parseInt(req.body.no);
    await userDb.updateOne(
      { userNum: req.user.userNum },
      {
        $addToSet: {
          heart: no,
        },
      }
    );
    const plus = await contentsDb.updateOne({ no: no }, { $inc: { heartNum: 1 } });
    const result = await contentsDb.findOne({ no: no });
    res.json({ heartNum: result.heartNum });
  } catch (err) {
    res.redirect("500");
  }
});

router.post("/minus", async (req, res) => {
  try {
    const no = parseInt(req.body.no);
    await userDb.updateOne(
      { userNum: req.user.userNum },
      {
        $pull: {
          heart: no,
        },
      }
    );
    const minus = await contentsDb.updateOne({ no: no }, { $inc: { heartNum: -1 } });
    const result = await contentsDb.findOne({ no: no });
    res.json({ heartNum: result.heartNum });
  } catch (err) {
    res.redirect("500");
  }
});

module.exports = router;
