import { isTokenValid } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    console.log("Token received:", token);
    const { username, userId, email } = isTokenValid({ token });
    console.log("Decoded token data:", { username, userId, email });
    req.user = { username, userId, email };
    next();
  } catch (error) {
    console.error("Error in authenticateUser middleware:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authenticateUser };
