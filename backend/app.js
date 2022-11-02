const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const env = require("dotenv").config();
const dbConnect = require("./config/mongoose");
const cloudinary = require("./config/cloudinary");
const passport = require("./config/passport")(app);
const session = require("express-session");
const cors = require("cors");
const options = { etag: false };

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("etag", false);

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      // domain: ".localhost:8080/",
      secure: false,
      // sameSite: "none",
    },
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.disable("etag");
app.use(express.static("public", options));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
const indexRouter = require("./routes");
const createRouter = require("./routes/create.js");
const updateRouter = require("./routes/update.js");
const userRouter = require("./routes/user.js");
const heartRouter = require("./routes/heart.js");
const commentRouter = require("./routes/comment.js");
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
