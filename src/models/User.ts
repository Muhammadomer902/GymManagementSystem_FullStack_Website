import { Schema, models, model } from "mongoose";

export interface MemberProfile {
  weight?: number; // in kg
  height?: number; // in cm
  age?: number;
  gender?: "male" | "female" | "other";
  bmi?: number;
  // Add more measurements as needed
}

export interface TrainerPaymentRecord {
  amount: number;
  paidAt: Date;
  period: string;
  method?: string;
}

export interface TrainerProfile {
  certifications?: string[];
  experienceYears?: number;
  bio?: string;
  specialties?: string[];
  education?: string;
  availableHours?: string;
  socialMediaLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  payments?: TrainerPaymentRecord[];
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "trainer" | "admin";
  createdAt: Date;
  memberProfile?: MemberProfile;
  trainerProfile?: TrainerProfile;
}

const memberProfileSchema = new Schema<MemberProfile>(
  {
    weight: Number,
    height: Number,
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    bmi: Number,
  },
  { _id: false }
);

const trainerPaymentRecordSchema = new Schema<TrainerPaymentRecord>(
  {
    amount: { type: Number, required: true },
    paidAt: { type: Date, required: true },
    period: { type: String, required: true },
    method: { type: String },
  },
  { _id: false }
);

const trainerProfileSchema = new Schema<TrainerProfile>(
  {
    certifications: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    specialties: { type: [String], default: [] },
    education: { type: String, default: "" },
    availableHours: { type: String, default: "" },
    socialMediaLinks: {
      type: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
      },
      default: { instagram: "", twitter: "", linkedin: "" },
    },
    payments: { type: [trainerPaymentRecordSchema], default: [] },
  },
  { _id: false, minimize: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Name is required"] },
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
    createdAt: { type: Date, default: Date.now },
    memberProfile: { type: memberProfileSchema, default: {} },
    trainerProfile: { type: trainerProfileSchema, default: {} },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
