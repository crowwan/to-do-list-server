const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("/");
  res.send("GET  / on 4000");
});
app.listen(4000, () => {
  console.log("listening on 4000");
});
