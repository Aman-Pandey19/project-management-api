const Comment = require("../models/Comment");

// Add Comment
exports.addComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            text: req.body.text,
            user: req.user.id,
            task: req.params.taskId
        });

        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Comments
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ task: req.params.taskId })
            .populate("user", "name");

        res.json(comments);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await comment.deleteOne();

        res.json({ message: "Comment deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};