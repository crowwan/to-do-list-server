const express = require("express");
const supabase = require("../model/supabaseClient");
const crypto = require("crypto");
const router = express.Router();

const TABLE = "users";

const makeHashed = (a) => crypto.createHash("sha256").update(a).digest("hex");

const cookieOptions = {
  domain: "localhost:3000",
  path: "/",
  httpOnly: true,
};

router.get("/", (req, res) => {
  res.send("user");
});
router.post("/login", async (req, res) => {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) {
    return res.status(500).send("Cannot get data from db");
  }
  const { uid, password } = req.body;
  const hashedPassword = makeHashed(password);
  const user = {
    ...data.find((a) => a.uid === uid && a.password === hashedPassword),
  };
  if (!user) return res.status(401).send("user not found");

  res.cookie("userId", uid, cookieOptions);
  res.redirect("/user/userinfo");
});

router.get("/userinfo", async (req, res) => {
  const userId = req.cookies?.userId;
  const { data, error } = await supabase.from("users").select("*");
  const user = { ...data.find((a) => a.uid === userId) };

  if (!userId || !user.uid) {
    return res.status(401).send("Not Authorized");
  } else {
    delete user.password;
    res.status(200).json({
      success: true,
      data: user.uid,
    });
  }
});

router.post("/signup", async (req, res) => {
  const { uid, password } = req.body;
  const hashedPassword = makeHashed(password);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ uid, password: hashedPassword })
    .select();

  if (error) {
    return res.status(500).send("Cannot create user to db");
  }

  res.cookie("userId", data[0].uid, cookieOptions);
  res.redirect("/userinfo");
});

router.post("/logout", (req, res) => {
  console.log("test");
  res.clearCookie("userId", cookieOptions);
  res.status(205).send("cookie deleted - log out");
});

module.exports = router;
