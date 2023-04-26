const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const corsOptions = {
  origin: [
    "http://crowwan-pre-project.s3-website.ap-northeast-2.amazonaws.com",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  allowedHeaders: "Content-Type,Authorization,Cookie",
};
const app = express();

const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");
const questionRouter = require("./router/questionRouter");
const answerRouter = require("./router/answerRouter");
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "to-do-list/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/to-do-list/build/index.html"));
});

app.use("/user", userRouter);
app.use("/todos", todoRouter);
app.use("/questions", questionRouter);
app.use("/answer", answerRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/to-do-list/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
