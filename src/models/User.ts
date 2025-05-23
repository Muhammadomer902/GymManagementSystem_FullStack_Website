import { Schema, models, model } from "mongoose";

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  purchaseDate: Date;
}

export interface OrderHistory {
  orders: OrderItem[];
}

export interface MemberProfile {
  weight?: number; // in kg
  height?: number; // in cm
  age?: number;
  gender?: "male" | "female" | "other";
  bmi?: number;
  orderHistory?: OrderHistory;
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

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderHistorySchema = new Schema<OrderHistory>(
  {
    orders: { type: [orderItemSchema], default: [] },
  },
  { _id: false }
);

const memberProfileSchema = new Schema<MemberProfile>(
  {
    weight: Number,
    height: Number,
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    bmi: Number,
    orderHistory: { type: orderHistorySchema, default: { orders: [] } },
  },
  { _id: false }
);

const trainerPaymentRecordSchema = new Schema<TrainerPaymentRecord>(
  {
    amount: {
      type: Number,
      required: true,
      min: [1, "Payment amount must be at least $1"],
      max: [10000, "Payment amount cannot exceed $10000"],
    },
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
    name: { 
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [15, "Username cannot exceed 15 characters"],
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
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [20, "Password cannot exceed 20 characters"],
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
