const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const corsOptions = {
  origin: "https://d28pa5c8zqo8q9.cloudfront.net",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};
const app = express();

const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
