import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minLength: 6,
    },
    preferred_difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    preferred_time: {
      type: String,
      default: "07:00",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const User = mongoose.model("User", UserSchema);
export default User;
