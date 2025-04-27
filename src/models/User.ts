import { Schema, model, Document, ObjectId } from "mongoose";

interface IUser extends Document {
    username?: string;
    email?: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: String,
        email: String,
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friends',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
.virtual('getFriendCount')
.get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

export default User;