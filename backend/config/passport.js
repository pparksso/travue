module.exports = function (router) {
  const bcrypt = require("bcrypt");
  const flash = require("connect-flash");
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  const userDb = require("../db/user");
  router.use(flash());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "pw",
        session: true,
        passReqToCallback: false,
      },
      (id, pw, done) => {
        userDb.findOne({ id: id }, (err, result) => {
          if (err) return done(err);
          if (!result) return done(null, false, { message: "존재하지 않는 아이디입니다." });
          if (result) {
            bcrypt.compare(pw, result.pw, (err, same) => {
              if (same) {
                return done(null, result, { message: "로그인되었습니다." });
              } else {
                return done(null, false, { message: "비밀번호를 확인해주세요" });
              }
            });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log("de :" + id);
    userDb
      .findOne({ id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
    // userDb.findOne({ id: id }, (err, result) => {
    //   done(null, result);
    // });
  });
  return passport;
};
