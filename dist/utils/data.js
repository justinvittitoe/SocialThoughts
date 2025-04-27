export const usernames = [
    'Bot',
    'Cherry',
    'JJ',
    'illogical',
    'piedPiper',
    'guy',
    'Christian',
    'BOSS',
    'FOOBAR',
    'jake',
    'Hailey',
    'celiaCares',
];
export const email = [
    'jerry@email.com',
    'guy@email.com',
    'justin@email.com',
    'dudePerfect@email.com',
    'awesomeness@email.com',
    'lebron@email.com',
    'jordiesmith@email.com',
    'randomness@email.com',
    'cooldude@email.com',
    'icecream@email.com',
    'ilovesharks@email.com',
    'soccerplayer123@email.com'
];
export const thoughts = [
    "Life is better with coffee.",
    "Why do cats always knock things over?",
    "The universe is so vast, it's mind-blowing.",
    "I wonder what the future holds.",
    "Pizza is the ultimate comfort food.",
    "Do fish ever get thirsty?",
    "Time flies when you're having fun.",
    "What if we could time travel?",
    "Music makes everything better.",
    "Is water wet, or does it make things wet?",
    "The stars look so peaceful tonight.",
    "I could really use a vacation.",
    "Why do we dream?",
    "Happiness is a warm blanket.",
    "What if robots had feelings?",
    "The smell of rain is so calming.",
    "Why is chocolate so addictive?",
    "I should start a new hobby.",
    "The ocean is both beautiful and terrifying.",
    "What if we lived on another planet?"
];
export const reactions = [
    "I totally agree!",
    "That's so interesting.",
    "Haha, that's funny!",
    "I never thought about it that way.",
    "So true!",
    "Wow, mind blown!",
    "I feel the same way.",
    "That's a great point.",
    "Absolutely!",
    "Couldn't have said it better myself.",
    "That's deep.",
    "I love this thought!",
    "This made my day.",
    "Such a unique perspective.",
    "I need to think about this more.",
    "This is so relatable.",
    "I can't stop thinking about this.",
    "This is inspiring!",
    "I wish I had thought of that.",
    "This is so creative!"
];
export const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Function to generate random assignments that we can add to student object.
export const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughts),
            username: getRandomArrItem(usernames),
            reactions: []
        });
    }
    return results;
};
