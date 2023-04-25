const express = require("express");
const router = express.Router();
const {
  getQuestions,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} = require("../controllers/questionControllers");
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

router.get("/", getQuestions);

router.post("/", createQuestion);

router.post("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);

module.exports = router;
