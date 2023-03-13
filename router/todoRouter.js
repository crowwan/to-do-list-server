const express = require("express");
const supabase = require("../model/supabaseClient");
const router = express.Router();

const TABLE = "todos";

router.get("/", async (req, res) => {
  const uid = req.cookies?.userId;
  console.log(uid);
  if (!uid) return res.status(401).send("Not Authorized");

  const { data, error } = await supabase.from(TABLE).select("*").eq("uid", uid);

  return res.status(200).send(data);
});

module.exports = router;
