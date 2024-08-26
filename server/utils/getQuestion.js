import axios from "axios";

const getQuestion = async () => {
  try {
    const response = await axios.get(
      "https://alfa-leetcode-api.onrender.com/problems"
    );
    const question = response.data;
    return response.data;
  } catch (error) {
    console.log("Error Fetching Question:", error.message);
    throw new Error("Unable to fetch daily question");
  }
};

export { getQuestion };
