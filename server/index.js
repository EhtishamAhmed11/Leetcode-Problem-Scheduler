import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./database/Connect.js";
import cookieParser from "cookie-parser";
// ------MIDDLEWARES-----------------------
dotenv.config();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SEC));
// -----ROUTES IMPORT---------------
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import { scheduleTasks } from "./Email/scheduler.js";
// -----------ROUTES--------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
// -----SERVER SETUP----------------
const PORT = process.env.PORT;

connectDB().then(()=>{
  scheduleTasks()
  console.log("Scheduling started!")
});
app.listen(PORT || 5000, () => {
  console.log(`Server started on PORT:${PORT}`);
});
