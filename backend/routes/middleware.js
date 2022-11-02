// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).json({ message: "로그인 필요" });
//   }
// };

exports.loginCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("login false");
    // res.json({ isLogin: false });
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    // res.json({ message: "로그인 상태임" });
    console.log("login true");
    next();
  }
};
