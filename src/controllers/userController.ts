import {Request, Response } from 'express';
import { User } from '../models/index.js';

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