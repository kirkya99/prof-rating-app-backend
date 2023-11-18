const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

require('dotenv').config();

const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);

// Database settings
const db = client.db(`prof-rating-app`);
const collection = db.collection('profs');


//Middleware
app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);

connectToDatabase();

async function connectToDatabase() {
    await client.connect();
    console.log(`New database:\t${db.databaseName}\n`);
    const indexResult = await collection.createIndex({ name: 1 });

    console.log(`indexResult: ${JSON.stringify(indexResult)}\n`);
}

async function retrieveEntries()
{

}

async function retrieveEntry()
{

}

async function modifyEntry()
{

}

async function deleteEntry()
{


}

async function createEntry()
{

}


//Endpoints
// Retrieve all saved entities
app.get("/profs", function (req, res) {
    // TODO: Insert mongoDb query
    retrieveEntries();
});

// Retrieve one saved entity
app.get("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    retrieveEntry();
});

// Modify one entity
app.put("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    modifyEntry();
});

// Delete one entity
app.delete("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    deleteEntry();
});

// Crrate a new entity
app.post("/profs", function (req, res) {
    // TODO: Insert mongoDb query
    createEntry();
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));