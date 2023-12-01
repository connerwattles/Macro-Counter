const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('MacroCounter');
const userCollection = db.collection('user');
const calorieCollection = db.collection('calories');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
  }

async function addCalories(calories) {
    const result = await calorieCollection.insertOne(calories);
    return result;
}

function getCalories() {
    const query = { calories: { $gt: 0 } };
    const cursor = calorieCollection.find(query);
    return cursor.toArray();
}

module.exports = { 
    addCalories, 
    getCalories, 
    getUser, 
    getUserByToken, 
    createUser 
};