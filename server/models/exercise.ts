import { Schema, model } from "mongoose";

interface Exercise {
  name: string;
  amount: number;
  date: Date;
}

const ExerciseSchema = new Schema<Exercise>({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const ExerciseModel = model("exercise", ExerciseSchema);

module.exports = ExerciseModel;
