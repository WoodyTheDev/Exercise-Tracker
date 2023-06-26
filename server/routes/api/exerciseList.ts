const { Router } = require("express");
const Exercise = require("../../models/exercise.ts");
import { Request, Response } from "express";

const router = Router();

router.get("/allItemsLength/", async (req: Request, res: Response) => {
  try {
    const count = await Exercise.countDocuments();
    res.status(200).json(count);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:page/:itemsPerPage/", async (req: Request, res: Response) => {
  try {
    const { page, itemsPerPage } = req.params;
    const exerciseList = await Exercise.find()
      .limit(itemsPerPage)
      .skip(parseInt(itemsPerPage) * (parseInt(page) - 1));
    if (!exerciseList) throw new Error("No exercise List found");
    res.status(200).json(exerciseList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/unique/", async (req: Request, res: Response) => {
  try {
    const uniqueExerciseList = await Exercise.distinct("name");
    if (!uniqueExerciseList) throw new Error("No exercise List found");
    res.status(200).json(uniqueExerciseList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newExercise = new Exercise(req.body);
    checkIfExerciseIsValid(newExercise);
    const exercise = await newExercise.save();
    if (!exercise) throw new Error("Something went wrong saving the exercise");
    res.status(200).json(exercise);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id.trim(),
      req.body,
      { new: true }
    );
    checkIfExerciseIsValid(exercise);
    if (!exercise)
      throw new Error("Something went wrong updating the exercise");
    res.status(200).json(exercise);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const removed = await Exercise.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

function checkIfExerciseIsValid(exercise: typeof Exercise) {
  if (exercise.amount < 1) {
    throw new Error("Amount is below 1");
  }
  if (exercise.picture != "" && !exercise.picture.startsWith("data:image")) {
    throw new Error("Picture is not a picture");
  }
}

module.exports = router;
