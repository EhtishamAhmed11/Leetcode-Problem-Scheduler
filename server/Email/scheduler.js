import cron from "node-cron";
import { getDailyQuestion } from "../controllers/question.controller.js";
import { sendEmail } from "./Email.js";
import User from "../models/User.model.js";

const scheduleTasks = async () => {
  try {
    const users = await User.find();

    const usersByTime = users.reduce((acc, user) => {
      if (!acc[user.preferred_time]) {
        acc[user.preferred_time] = [];
      }
      acc[user.preferred_time].push(user);
      return acc;
    }, {});

    Object.keys(usersByTime).forEach((time) => {
      const [hour, minute] = time.split(":");
      const cronTime = `${minute} ${hour} * * *`;

      cron.schedule(cronTime, async () => {
        const users = usersByTime[time];
        for (const user of users) {
          try {
            const question = await getDailyQuestion(user._id);
            if (question) {
              const emailContent = `
                  <h1>Daily DSA Question</h1>
                  <h3>Today's Question: ${question.title}</h3>
                  <p><strong>Difficulty:</strong> ${question.difficulty}</p>
                  <p><a href="${question.link}">Solve on LeetCode</a></p>
                `;
              await sendEmail(
                user.email,
                "Your Daily DSA Question",
                "",
                emailContent
              );
            }
          } catch (error) {
            console.error(
              `Error sending email to ${user.email}:`,
              error.message
            );
          }
        }
      });
    });
  } catch (error) {
    console.error("Error setting up tasks:", error.message);
  }
};


export { scheduleTasks };


// Testing Function
/* 
const scheduleTasks = async () => {
  try {
    const users = await User.find(); // Fetch all users

    users.forEach((user) => {
      // Calculate the time 5 minutes from now
      const now = new Date();
      now.setMinutes(now.getMinutes() + 1);
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Schedule the cron job using the calculated time
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        try {
          const question = await getDailyQuestion(user._id); // Pass user ID to get a personalized question
          if (question) {
            const emailContent = `
              <h3>Daily DSA Question: ${question.title}</h3>
              <p><strong>Difficulty:</strong> ${question.difficulty}</p>
              <p>${question.content}</p>
              <p><a href="${question.link}">Solve on LeetCode</a></p>
            `;
            await sendEmail(
              user.email,
              "Your Daily DSA Question",
              "",
              emailContent
            );
          }
        } catch (error) {
          console.error(`Error sending email to ${user.email}:`, error.message);
        }
      });
    });
  } catch (error) {
    console.error("Error setting up tasks:", error.message);
  }
};




*/