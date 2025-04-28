import { Request, Response } from 'express';
import { User, Thoughts } from '../models/index.js';


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

export const createNewThought = async(req:Request, res:Response) => {
    const { thoughtText, username } = req.body
    try {
        const thought = await Thoughts.create(
            {thoughtText: thoughtText, username: username}
        )
        const user = User.findOneAndUpdate(
            {username},
            {$push: { thoughts: thought._id}},
            {new:true}
        );
        if(!user) {
            res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(thought)
        } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateThought = async(req:Request, res:Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            {_id: req.params},
            {thoughtText: req.body},
            {runValidators:true, new:true}
        );
        if(!thought) {
            res.status(404).json({message: 'Thought not found'})
        }

        res.status(200).json(thought)

    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete(
            { _id: req.params },
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' })
        }

        res.status(200).json({message: 'Thought deleted'})

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createReaction = async (req: Request, res: Response) => {
    const thoughtId = req.params
    try {
        const {reactionBody, username} = req.body

        if (!reactionBody || !username) {
            res.status(400).json({ message: 'Reaction body and username are required' });
        }

        const thought = await Thoughts.findOneAndUpdate(
            { _id: thoughtId },
            { $push: {reactions: {reactionBody, username}}},
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' })
        }

        res.status(200).json(thought)

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    const {thoughtId, reactionId} = req.params
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: reactionId } },
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' })
        }

        res.status(200).json({message: 'Reaction Deleted'})

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}