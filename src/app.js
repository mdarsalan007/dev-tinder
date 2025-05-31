const express = require("express");
const app = express();
require("./config/database");
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser")

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
// below should work for all the routes automatically.
app.use(express.json());
app.use(cookieparser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

connectDB()
  .then(() => {
    console.log("connected to the database successfully");

    app.listen(3000, () => {
      console.log("server is successfully listening on port:3000");
    });
  })
  .catch((err) => {
    console.error("database is not connected");
  });
