import db from '../config/connection.js';
import { User, Thoughts } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomThoughts, getRandomArrItem, usernames, email, reactions } from './data.js';
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        const users = usernames.map((username, index) => ({
            username,
            email: email[index],
            thoughts: [],
            friends: [],
        }));
        const createdUsers = await User.insertMany(users);
        console.log('Seeded users');
        const thoughts = [];
        for (let i = 0; i < 12; i++) {
            const thoughtText = getRandomArrItem(getRandomThoughts(2)).thoughtText;
            const username = getRandomArrItem(createdUsers).username;
            thoughts.push({ thoughtText, username, reactions: [] });
        }
        const createdThoughts = await Thoughts.insertMany(thoughts);
        console.log('Seeded thoughts');
        // Link thoughts to users
        for (const thought of createdThoughts) {
            await User.updateOne({ username: thought.username }, { $push: { thoughts: thought._id } });
        }
        console.log('Linked thoughts to users');
        for (const user of createdUsers) {
            const randomFriends = createdUsers
                .filter((u) => u._id.toString() !== user._id.toString())
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((friend) => friend._id);
            await User.updateOne({ _id: user._id }, { $push: { friends: { $each: randomFriends } } });
        }
        console.log('Linked friends to users');
        for (const thought of createdThoughts) {
            const randomReactions = [];
            for (let i = 0; i < 3; i++) {
                randomReactions.push({
                    reactionBody: getRandomArrItem(reactions),
                    username: getRandomArrItem(createdUsers).username
                });
            }
            await Thoughts.updateOne({ _id: thought._id }, { $push: { reactions: { $each: randomReactions } } });
        }
        console.log('Added reactions to thoughts');
        console.log('Database seeding completed');
        process.exit(0);
    }
    catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};
seedDatabase();
