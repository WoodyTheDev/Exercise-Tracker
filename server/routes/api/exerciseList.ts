const { Router, } = require('express')
const Exercise = require('../../models/exercise.ts')
import { Request, Response } from 'express';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    console.log(Exercise);
    try {
        const exerciseList = await Exercise.find()
        if (!exerciseList) throw new Error('No exercise List found')
        res.status(200).json(exerciseList)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/unique/', async (req: Request, res: Response) => {
    try {
        const uniqueExerciseList = await Exercise.distinct('name');
        if (!uniqueExerciseList) throw new Error('No exercise List found')
        res.status(200).json(uniqueExerciseList)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req: Request, res: Response) => {
    const newExercise = new Exercise(req.body)
    try {
        const exercise = await newExercise.save()
        if (!exercise) throw new Error('Something went wrong saving the exercise')
        res.status(200).json(exercise)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id.trim(), req.body, { new: true })
        if (!exercise) throw new Error('Something went wrong updating the exercise')
        res.status(200).json(exercise)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const removed = await Exercise.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router