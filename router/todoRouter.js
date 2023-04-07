const express = require("express");
const router = express.Router();
const {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
} = require("../controllers/todoControllers");

router.use((req, res, next) => {
  const uid = req.cookies.userId;
  if (!uid) return res.status(401).send("Not Authorized");
  req.uid = uid;
  next();
});

router.get("/", getTodos);

router.post("/", createTodos);

router.post("/:id", updateTodos);

router.delete("/:id", deleteTodos);

module.exports = router;
