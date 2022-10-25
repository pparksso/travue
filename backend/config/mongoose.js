const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "travue",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = dbConnect;
