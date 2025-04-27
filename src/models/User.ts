import { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "trainer" | "admin";
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "trainer", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model error during hot reloading
const User = models.User || model<IUser>("User", userSchema);

export default User;
