import express from "express";
import { dailyQuestionRoute } from "../controllers/getDailyQuestionRoute.js";
import { authenticateUser } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/daily-Question").get(authenticateUser, dailyQuestionRoute);

export default router;
