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
router.put("/login", logIn);

router.get("/userinfo", getUserInfo);

router.put("/signup", signUp);

router.put("/logout", logOut);

module.exports = router;
