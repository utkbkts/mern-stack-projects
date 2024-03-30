const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./config/database");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/post.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use("/", authRouter);
app.use("/", postRouter);

const PORT = 5000;
database();
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
