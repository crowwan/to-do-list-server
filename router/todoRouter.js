const express = require("express");
const supabase = require("../model/supabaseClient");
const router = express.Router();

const TABLE = "todos";

router.use((req, res, next) => {
  const uid = req.cookies?.userId;
  if (!uid) return res.status(401).send("Not Authorized");
  req.uid = uid;
  next();
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("uid", req.uid);

  return res.status(200).send(data);
});

router.post("/:id", async (req, res) => {
  const body = req.body;
  const { data, error } = await supabase
    .from(TABLE)
    .update(body)
    .eq("uid", req.uid);
  return res.status(200).send("ok");
});

module.exports = router;
