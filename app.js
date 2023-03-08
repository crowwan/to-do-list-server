const express = require("express");
const cors = require("cors");
const supabase = require("./model/supabaseClient.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
};
const app = express();

const userRouter = require("./router/userRouter");

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("test").select("*");
  res.send(data);
});

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
