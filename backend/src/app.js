import express from "express";
import quizRoutes from "./routes/quizRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send(`Server is running on port`));

app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);

export default app;