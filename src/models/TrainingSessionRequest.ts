import { Schema, model, models, Types } from "mongoose";

export interface ITrainingSessionRequest {
  member: Types.ObjectId; // user who is requesting
  trainer: Types.ObjectId; // trainer being requested
  requestedDate: Date;
  status: "pending" | "accepted" | "rejected" | "completed";
  message?: string;
  responseMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const trainingSessionRequestSchema = new Schema<ITrainingSessionRequest>(
  {
    member: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requestedDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    message: { type: String },
    responseMessage: { type: String },
  },
  { timestamps: true }
);

const TrainingSessionRequest =
  models.TrainingSessionRequest ||
  model<ITrainingSessionRequest>(
    "TrainingSessionRequest",
    trainingSessionRequestSchema
  );

export default TrainingSessionRequest;
