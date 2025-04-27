import { Schema, model, models, Types } from "mongoose";

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true }, // can be "12" or "30 sec"
    rest: { type: String, required: true },
    notes: { type: String },
  },
  { _id: false }
);

const workoutPlanSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: String },
    duration: { type: Number }, // in minutes
    schedule: { type: String },
    progress: { type: Number, default: 0 },
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

// Using a new model name to avoid schema caching issues
const TrainerWorkoutPlan =
  models.TrainerWorkoutPlan || model("TrainerWorkoutPlan", workoutPlanSchema);

export default TrainerWorkoutPlan;
