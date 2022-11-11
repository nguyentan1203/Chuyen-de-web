require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const logger = require("morgan");
const { sendResponseError } = require("./core/commonFuncs");
const routers = require("./main/routers");
const cookieParser = require("cookie-parser");

const app = express();
const { PORT = 4000, NODE_ENV, APP_MONGODB_URI } = process.env;

/* Middleware */
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === "production",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

/* MongoDB */
mongoose
  .connect(APP_MONGODB_URI || `mongodb://localhost`, { dbName: "mongo" })
  .then(() => console.log("✔️ Connected To Database Successfully!"))
  .catch((err) => console.log(`❌ Failed To Connect To Database!\n ${err}`));

/* Routers */
app.use("/api", routers);

app.use((req, res, next) => {
  const status = 404;
  const errors = new Error("Not Found");
  next({ status, errors });
});

app.use((err, req, res, next) => {
  const { status = 500, errors = err } = err;
  const message = errors?.message || "Internal Server Error";
  return sendResponseError(res, { status, message, errors });
});

/* Listen Port */
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);
