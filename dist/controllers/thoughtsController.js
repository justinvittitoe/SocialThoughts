import { User, Thoughts } from '../models/index.js';
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find()
            .populate('reactions');
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thoughts.findById(thoughtId)
            .populate('reactions');
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createNewThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        const thought = await Thoughts.create({ thoughtText: thoughtText, username: username });
        const user = await User.findOneAndUpdate({ username }, { $push: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const updateThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        const thought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: thoughtText, username: username }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json({ message: 'Thought deleted' });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getReaction = async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
        const thought = await Thoughts.findById(thoughtId).populate('reactions');
        if (!thought) {
            res.status(401).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought?.reactions);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createReaction = async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
        const { reactionBody, username } = req.body;
        if (!reactionBody || !username) {
            res.status(400).json({ message: 'Reaction body and username are required' });
        }
        const thought = await Thoughts.findOneAndUpdate({ _id: thoughtId }, { $push: { reactions: { reactionBody, username } } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteReaction = async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;
    try {
        console.log(reactionId);
        console.log(thoughtId);
        const thought = await Thoughts.findByIdAndUpdate(thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json({ message: 'Reaction Deleted', thought });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
