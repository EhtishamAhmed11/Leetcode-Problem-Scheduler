import { getDailyQuestion } from "./question.controller.js";

export const dailyQuestionRoute = async (req, res) => {
  try {
    const userId = req.user.userId;
    const question = await getDailyQuestion(userId);

    if (!question) {
      return res.status(404).json({ message: "No question available" });
    }

    return res.status(200).json({ question });
  } catch (error) {
    console.error("Error in dailyQuestionRoute:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
