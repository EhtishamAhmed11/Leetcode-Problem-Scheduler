import User from "../models/User.model.js";
import {
  attachCookiesToResponse,
  createJwt,
  createTokenUser,
} from "../utils/index.js";
export const register = async (req, res) => {
  const { email, username, password } = req.body;
  const isEmailAlreadyExist = await User.findOne({ email });
  if (isEmailAlreadyExist) {
    return res.status(400).json({ message: "Email Already Exist" });
  }

  const user = new User({ username, email, password });
  await user.save();

  const tokenUser = createTokenUser(user); //creates a user Token
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ message: "User Created Successfully", user });
};
export const login = async (req, res) => {
  // Step 1
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }
  //   Step 2 check for email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  //   Step 3 Check for Password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  //   step for Create Token
  const tokenUser = createTokenUser(user);
  const token = createJwt({ payload: tokenUser });
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(200)
    .json({ message: "Logged In Successfully", user: tokenUser, token });
};
export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
};
