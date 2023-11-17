const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('MacroCounter');
const calorieCollection = db.collection('calories');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function addCalories(calories) {
    const result = await calorieCollection.insertOne(calories);
    return result;
}

function getCalories() {
    const query = { calories: { $gt: 0 } };
    const cursor = calorieCollection.find(query);
    return cursor.toArray();
}

module.exports = { addCalories, getCalories };