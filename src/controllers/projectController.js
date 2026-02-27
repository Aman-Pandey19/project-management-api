const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            owner: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get My Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            members: req.user.id
        });

        res.json(projects);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Update Project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Only owner can update
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;

        await project.save();

        res.json(project);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Only owner can delete" });
        }

        await project.deleteOne();

        res.json({ message: "Project deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Invite Member
exports.inviteMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Only owner can invite
        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Only owner can invite members" });
        }

        if (project.members.includes(userId)) {
            return res.status(400).json({ message: "User already a member" });
        }

        project.members.push(userId);
        await project.save();

        res.json({ message: "Member added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};