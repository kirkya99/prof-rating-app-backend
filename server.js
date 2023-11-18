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

main();

async function main() {
    await client.connect();
    console.log(`Connecting to database:\t${db.databaseName}\n`);
    const indexResult = await collection.createIndex({ name: 1 });
}

//Endpoints
// Retrieve all saved entities
app.get("/profs", async function (req, res) {
    // TODO: Insert mongoDb query
    const query = {}
    const result = await collection.find(query).toArray();
    console.log(result);
    res.status(200).send(result);
});

// Retrieve one saved entity
app.get("/profs/:id", async function (req, res) {
    // TODO: Insert mongoDb query
    const profId = req.params.id;

    const query = {}
    let queryResult = await collection.find(query).toArray();

    const entry = queryResult[profId];
    res.status(200).send(entry)
});

// Modify one entity
app.put("/profs/:id", async function (req, res) {
    const profId = req.params.id;

    const query = {}
    let queryResult = await collection.find(query).toArray();

    const toBeDeleted = queryResult[profId];

    await collection.deleteOne({ id: toBeDeleted.id });

    queryResult = await collection.find(query).toArray();
    res.status(200).send(queryResult);
});

// Delete one entity
app.delete("/profs/:id", async function (req, res) {
    const profId = req.params.id;

    const query = {}
    let queryResult = await collection.find(query).toArray();

    const toBeDeleted = queryResult[profId];
    console.log(toBeDeleted);

    await collection.deleteOne({ id: toBeDeleted.id });

    queryResult = await collection.find(query).toArray();
    res.status(200).send(queryResult);
});

// Crrate a new entity
app.post("/profs", async function (req, res) {
    const entry = {
        name: req.body.name,
        rating: req.body.rating
    }
    await collection.insertOne(entry);

    const query = {}
    const queryResult = await collection.find(query).toArray();
    res.status(200).send(queryResult);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));