import { Schema, model } from "mongoose";

interface Exercise {
  name: string;
  amount: number;
  date: Date;
  picture: string;
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
  picture: {
    type: String
  },
});

const ExerciseModel = model("exercise", ExerciseSchema);

module.exports = ExerciseModel;
