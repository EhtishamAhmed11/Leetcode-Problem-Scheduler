import express from "express";
import {
  getAllUsers,
  getSingleUsers,
  showCurrentUser,
  updateDifficultyAndTime,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").get(authenticateUser, getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router
  .route("/updateDifficulty")
  .patch(authenticateUser, updateDifficultyAndTime);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUsers);

export default router;
