import User from "../models/User.model.js";
import { getQuestion } from "../utils/getQuestion.js";

// Modify the function to accept userId as an argument
export const getDailyQuestion = async (userId) => {
  try {
    const FetchUser = await User.findById(userId);
    if (!FetchUser) {
      throw new Error("User not found");
    }

    const preferredDifficulty = FetchUser.preferred_difficulty.toLowerCase();
    const questions = await getQuestion();
    const problems = questions.problemsetQuestionList;

    const filterQuestions = problems.filter(
      (problem) => problem.difficulty.toLowerCase() === preferredDifficulty
    );
    const questionToReturn = filterQuestions.length
      ? filterQuestions[0]
      : problems[0];

    const leetcodeUrl = `https://leetcode.com/problems/${questionToReturn.titleSlug}`;

    return {
      ...questionToReturn,
      link: leetcodeUrl,
    };
  } catch (error) {
    console.error("Error in getDailyQuestion:", error.message);
    return null;
  }
};
