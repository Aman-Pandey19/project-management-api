const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    inviteMember
} = require("../controllers/projectController");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);
router.post("/:id/invite", authMiddleware, inviteMember);

module.exports = router;