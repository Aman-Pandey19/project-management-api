const Board = require("../models/Board");
const Project = require("../models/Project");

// Create Board
exports.createBoard = async (req, res) => {
    console.log("Create Board Hit");

    try {
        const { name } = req.body;

        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (!project.members.some(member => member.toString() === req.user.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const board = await Board.create({
            name,
            project: project._id
        });

        res.status(201).json(board);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get Boards by Project
exports.getBoards = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (!project.members.includes(req.user.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const boards = await Board.find({ project: project._id });

        res.json(boards);

    } catch (error) {
        // res.status(500).json({ message: "Server error" });
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
// Update Board
exports.updateBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);

        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        board.name = req.body.name || board.name;
        await board.save();

        res.json(board);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Board
exports.deleteBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);

        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        await board.deleteOne();
        res.json({ message: "Board deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};