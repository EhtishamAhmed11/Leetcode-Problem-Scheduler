import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255, 
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Simple URL validation regex
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
