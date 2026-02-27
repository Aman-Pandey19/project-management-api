const express = require("express");
const router = express.Router({ mergeParams: true });

const authMiddleware = require("../middleware/authMiddleware");
const { createBoard, getBoards, updateBoard, deleteBoard } = require("../controllers/boardController");

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);
router.put("/:boardId", authMiddleware, updateBoard);
router.delete("/:boardId", authMiddleware, deleteBoard);

module.exports = router;