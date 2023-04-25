const express = require("express");
const router = express.Router();
const {
  deleteAnswer,
  updateAnswer,
  createAnswer,
} = require("../controllers/answerControllers");
const { verifyToken } = require("../controllers/helper/tokenFunctions");

router.use((req, res, next) => {
  const token = req.header("Authorization");
  const accessTokenPayload = verifyToken("access", token);
  console.log(token);
  if (!accessTokenPayload) return res.status(401).send("Not Authorized");
  req.email = accessTokenPayload.email;
  console.log("test");
  next();
});

router.post("/", createAnswer);

router.patch("/:id", updateAnswer);

router.delete("/:id", deleteAnswer);

module.exports = router;
