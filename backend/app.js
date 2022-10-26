const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const env = require("dotenv").config();
const dbConnect = require("./config/mongoose");
const { cloudinary } = require("./config/cloudinary");
const { storage } = require("./config/cloudinary");
const passport = require("./config/passport");
const cors = require("cors");

const indexRouter = require("./routes");
const createRouter = require("./routes/create.js");
const updateRouter = require("./routes/update.js");
const userRouter = require("./routes/user.js");
const heartRouter = require("./routes/heart.js");
const commentRouter = require("./routes/comment.js");
const options = { etag: false };

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("etag", false);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.disable("etag");
app.use(express.static("public", options));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/create", createRouter);
app.use("/update", updateRouter);
app.use("/user", userRouter);
app.use("/heart", heartRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
