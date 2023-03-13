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
  if (error) {
    return res.status(500).send("Cannot get data from db");
  }
  return res.status(200).send(data);
});

router.post("/:id", async (req, res) => {
  const body = req.body;
  const { error } = await supabase.from(TABLE).update(body).eq("id", id);
  if (error) {
    return res.status(500).send("Cannot update data from db");
  }
  return res.status(200).send("ok");
});

router.delete("/:id", async (req, res) => {});

module.exports = router;
