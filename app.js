const express = require("express");
const cors = require("cors");
const supabase = require("./model/supabaseClient.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  const { data, error } = await supabase.from("test").select("*");
  response.send(data);
});
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
