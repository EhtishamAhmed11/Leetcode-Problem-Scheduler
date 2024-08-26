import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected To database!!");
  } catch (error) {
    console.log("Error in database Connection:", error.message);
  }
};
export default connectDB;
