const express = require("express");
const router = express.Router({ mergeParams: true });

const authMiddleware = require("../middleware/authMiddleware");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");

router.post("/", authMiddleware, addComment);
router.get("/", authMiddleware, getComments);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;