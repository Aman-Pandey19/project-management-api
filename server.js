const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => {
    console.log("MongoDB Error:", err.message);
});

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const projectRoutes = require("./src/routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const boardRoutes = require("./src/routes/boardRoutes");
app.use("/api/projects/:projectId/boards", boardRoutes);

const taskRoutes = require("./src/routes/taskRoutes");
app.use("/api/boards/:boardId/tasks", taskRoutes);

const commentRoutes = require("./src/routes/commentRoutes");
app.use("/api/tasks/:taskId/comments", commentRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));