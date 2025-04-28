import {Request, Response } from 'express';
import { User, Thoughts } from '../models/index.js';
import mongoose from 'mongoose';

export const getAllUsers = async(_req: Request, res:Response) => {
    try {
        const users = await User.find()
            .populate('thoughts')
        res.json(users)
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUserById = async(req:Request, res:Response) => {
    const {userId} = req.params
    try {
        const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends');
        if(user){
            res.json(user)
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

export const createUser = async(req:Request, res:Response) => {
    const { user } = req.body
    try {
        const newUser = await User.create({user});
        res.status(201).json(newUser)
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateUser = async(req:Request, res:Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {reunValidators: true, new: true}
        );

        if(!user) {
            res.status(404).json({message: 'No user with this id!'})
        }

        res.json(user)

    } catch(error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteUser = async(req:Request, res:Response) => {
    try {
        const user = await User.findOneAndDelete(
            {_id: req.params.userId},
        )
        if(!user) {
            res.status(404).json('No user with this id!')
        } else {
            await Thoughts.deleteMany({_id: {$in:user.thoughts}})
            res.json({message: 'User and thoughts have been deleted!'});
        }
        
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getFriends = async(req:Request, res:Response) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId)
            .populate('thoughts')
            .populate('friends');
        if (user) {
            res.json(user.friends)
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }

    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addFriend = async(req:Request, res:Response) => {
    const  { userId, friendId }  = req.params
    try {

        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            res.status(400).json({ message: 'Invalid friend ID' });
        }

        const user = await User.findById({userId});

        if(!user) {
            res.status(404).json({message: 'User not found'})
        }
        if(user?.friends.includes(new mongoose.Schema.Types.ObjectId(friendId))) {
            res.status(400).json({message: 'Friend already added'})
        }

        user?.friends.push(new mongoose.Schema.Types.ObjectId(friendId));

        res.status(201).json(friendId)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params
    try {

        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            res.status(400).json({ message: 'Invalid friend ID' });
        }

        const user = await User.findById({ userId });

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }
        if (user?.friends.includes(new mongoose.Schema.Types.ObjectId(friendId))) {
            res.status(400).json({ message: 'Friend already added' })
        }

        await User.updateOne(
            {_id: userId},
            {$pull: {friends: friendId}}
        );

        res.status(201).json(friendId)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}