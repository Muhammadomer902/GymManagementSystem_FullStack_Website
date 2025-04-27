import { Schema, model, models, Types } from "mongoose";

export interface IComplaint {
  user: Types.ObjectId;
  subject: string;
  category: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  response?: string;
  responseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    response: { type: String },
    responseDate: { type: Date },
  },
  { timestamps: true }
);

const Complaint =
  models.Complaint || model<IComplaint>("Complaint", complaintSchema);

export default Complaint;
