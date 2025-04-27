import { Schema, Document, model } from 'mongoose';
import Reaction from './Reaction.js';

interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}

const thoughtSchema =new Schema<IThoughts> (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            set: (date: Date) => {
                return date.toLocaleTimeString;
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

thoughtSchema
.virtual('getReactionCount')
.get(function () {
    return this.reactions.length
})

const Thoughts = model('thoughts', thoughtSchema);

export default Thoughts;