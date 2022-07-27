const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./index");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({ limit: "100mb", extended: false, parameterLimit: 50000 })
);

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Backend Server listening at ${port}`);
});

module.exports = app;
