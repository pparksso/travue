var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {});
router.get("/", function (req, res, next) {});
router.post("/idcheck", function (req, res, next) {
  console.log(req);
});

module.exports = router;
