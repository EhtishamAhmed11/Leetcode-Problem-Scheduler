import User from "../models/User.model.js";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createToken.js";
import { attachCookiesToResponse } from "../utils/jwt.js";

const getAllUsers = async (req, res) => {
  const user = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  console.log(req.user);
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getSingleUsers = async (req, res) => {
  const user = await User.findOne({ _id: req.params }).select("-password");
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found" });
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateDifficultyAndTime = async (req, res) => {
  const { preferred_difficulty, preferred_time } = req.body;
  if (!preferred_difficulty || !preferred_time) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide a difficulty level and time" });
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { preferred_difficulty, preferred_time },
    { new: true, runValidators: true }
  ).select("-password");
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomAPIError.BadRequestError("Please provide all values");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  ).select("-password");
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide both old and new" });
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid password" });
  }
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ message: "Password Changed Successfully!" });
};

export {
  getAllUsers,
  getSingleUsers,
  showCurrentUser,
  updateUser,
  updateDifficultyAndTime,
  updateUserPassword,
};
