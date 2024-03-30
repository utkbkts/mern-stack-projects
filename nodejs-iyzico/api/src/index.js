import "express-async-errors";
import dotnev from "dotenv";
import config from "./config.js";
import express from "express";
import logger from "morgan";
import https from "https";
import path from "path";
import fs from "fs";
import GenericErrorHandler from "./middleware/GenericErrorHandler.js";
import ApiError from "./error/ApiError.js";
import helmet from "helmet";
import cors from "cors";
const envPath = config?.production ? "./env/.prod" : "./env/.dev";

dotnev.config({
  path: envPath,
});

const app = express();

app.use(logger(process.env.LOGGER));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  express.json({
    limit: "1mb",
  })
),
  app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  // throw new ApiError("bir şeyler ters gitti", 404, "something went wrong!!");
  res.json({
    test: 1,
  });
});
app.use(GenericErrorHandler);

if (process.env.HTTPS_ENABLED == "true") {
  const key = fs
    .readFileSync(path.join(__dirname, "./certs/key.pem"))
    .toString();
  const cert = fs
    .readFileSync(path.join(__dirname, "./certs/cert.pem"))
    .toString();

  const server = https.createServer({ key, cert }, app);

  server.listen(process.env.PORT, () => {
    console.log(
      "Express Uygulamasi",
      process.env.PORT + "üzerinden çalışmaktadır"
    );
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(
      "Express Uygulamasi",
      process.env.PORT + "üzerinden çalışmaktadır"
    );
  });
}
