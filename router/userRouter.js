const express = require("express");
const {
  logIn,
  getUserInfo,
  signUp,
  logOut,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user");
});
router.post("/login", logIn);

router.get("/userinfo", getUserInfo);

router.post("/signup", signUp);

router.get("/logout", logOut);

module.exports = router;
