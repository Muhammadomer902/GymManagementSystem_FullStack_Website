import { Schema, model, models, Types } from "mongoose";

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  notes?: string;
}

export interface IWorkoutSession {
  user: Types.ObjectId;
  date: Date;
  duration: number; // in minutes
  workoutPlanId?: string;
  title: string;
  exercises: Exercise[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<Exercise>(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number },
    duration: { type: String },
    notes: { type: String },
  },
  { _id: false }
);

const workoutSessionSchema = new Schema<IWorkoutSession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    duration: { type: Number, required: true }, // in minutes
    workoutPlanId: { type: String },
    title: { type: String, required: true },
    exercises: { type: [exerciseSchema], required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const WorkoutSession =
  models.WorkoutSession ||
  model<IWorkoutSession>("WorkoutSession", workoutSessionSchema);

export default WorkoutSession;
