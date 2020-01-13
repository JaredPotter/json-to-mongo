const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const mongoDbUrl = process.env.MONGODB_CONNECITON_STRING;
const mongoDbDatabse = process.env.MONGODB_DATABASE;
const collectionName = process.env.MONGODB_COLLECTION;

console.log(`mongoDbUrl: ${mongoDbUrl}`);
console.log(`mongoDbDatabse: ${mongoDbDatabse}`);
console.log(`collectionName: ${collectionName}`);

const settings = {
    useUnifiedTopology: true
};

const data = require('./products.json');

debugger;

MongoClient.connect(mongoDbUrl, settings, async function(err, client) {
    if(err) {
        throw err;
    }
    else {
        console.log('SUCCESSFULLY CONNECTED TO DATABASE!');
        const database = client.db(mongoDbDatabse);
        const collection = database.collection(collectionName);

        await collection.insertMany(data);

        console.log(`SUCCSSFULLY ADDED ALL ${data.length} DOCS TO DATABASE!`);
    }

    client.close();
});