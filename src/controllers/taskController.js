const Task = require("../models/Task");
const Board = require("../models/Board");
const Project = require("../models/Project");

// Create Task
exports.createTask = async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId).populate("project");

        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        const project = await Project.findById(board.project);

        if (!project.members.some(member => member.toString() === req.user.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const task = await Task.create({
            ...req.body,
            board: board._id,
            createdBy: req.user.id,
            activityLog: [{ action: "Task created" }]
        });

        res.status(201).json(task);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get Tasks by Board
exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const filter = { board: req.params.boardId };

        if (req.query.status) filter.status = req.query.status;
        if (req.query.priority) filter.priority = req.query.priority;

        const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit);

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update Task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Track status change
        if (req.body.status && req.body.status !== task.status) {
            task.activityLog.push({
                action: `Status changed to ${req.body.status}`
            });
            task.status = req.body.status;
        }

        // Update other fields
        if (req.body.title) task.title = req.body.title;
        if (req.body.description) task.description = req.body.description;
        if (req.body.priority) task.priority = req.body.priority;
        if (req.body.assignedTo) task.assignedTo = req.body.assignedTo;
        if (req.body.dueDate) task.dueDate = req.body.dueDate;

        await task.save();

        res.json(task);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.deleteOne();

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};