import { Request, Response } from 'express';
import { Thoughts } from '../models/index.js';

export const getAllThoughts = async(_req: Request, res:Response) => {
    try {
        const thoughts = await Thoughts.find()
        .populate('reactions');
        res.json(thoughts)
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getThoughtById = async(req:Request, res:Response) => {
    const {thoughtId} = req.params
    try {
        const thought = await Thoughts.findById(thoughtId)
        .populate('reactions');
        if(thought){
            res.json(thought)
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }
    } catch(error:any){
        res.status(500).json({
            message: error.message
        })
    }
}