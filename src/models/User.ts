import { Schema, model, Document, ObjectId } from "mongoose";

interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must match a valid email address"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thoughts",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
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

const User = model<IUser>('users', userSchema);

export default User;