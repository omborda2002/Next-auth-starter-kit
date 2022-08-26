import mongoose from "mongoose";

/* UsersSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username."],
      maxlength: [60, "Username cannot be more than 60 characters"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please provide a password."]
    },
    mobileNumber: {
      type: Number,
      required: [true, "Please provide a mobile number."],
      trim: true,
      min: [10, "Please provide at least 10 character."]
    }
  },
  { timestamp: true }
);

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
