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
    console.log(`Connecting to database:\t${db.databaseName}\n`);
    const indexResult = await collection.createIndex({ name: 1 });
}

async function retrieveEntries() {
    console.log('Retrieve entries');

    // TODO: return all entries
    const allProfsQuery = {
        category: "profs"
    }

    const profs = await collection.find(allProfsQuery);
    console.log(profs)
    return profs;
}

async function retrieveEntry(input) {
    console.log('Retrieve entry');
    // TODO: return entry
}

async function modifyEntry(input) {
    console.log('Modify entry');

    // TODO: modify entry
    const entry = {
        category: "profs",
        name: input.name,
        rating: input.rating
    }

    const query = { name: entry.name };
    const update = { $set: entry };
    const options = { upsert: true, new: true };

    const result = await collection.insertOne(entry);

    console.log(`Modfication result: ${JSON.stringify(result)}\n`)
}

async function deleteEntry(input) {
    console.log('Delete entry');
    // TODO: delete entry
}

async function createEntry(input) {
    console.log('Create entry');

    // TODO: create entry


    const query = { name: input.name };
    console.log(input);
    const update = { $set: input };
    const options = { upsert: true, new: true };

    const result = await collection.updateOne(query, update, options);

    console.log(`Creation result: ${JSON.stringify(result)}\n`)
}


//Endpoints
// Retrieve all saved entities
app.get("/profs", function (req, res) {
    // TODO: Insert mongoDb query
    res.send(JSON.stringify(retrieveEntries()));
    res.status(200)
});

// Retrieve one saved entity
app.get("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    retrieveEntry();

    res.status(200)

});

// Modify one entity
app.put("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    modifyEntry();

    res.status(200)

});

// Delete one entity
app.delete("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
    deleteEntry();

    res.status(200)

});

// Crrate a new entity
app.post("/profs", function (req, res) {

    // TODO: Insert mongoDb query
    
    const entry = {        
        name: req.body.name,
        rating: req.body.rating
    }
    const result = createEntry(entry);
    // const allEntries = retrieveEntries();
    res.status(200)
    res.send(JSON.stringify(req.body));

});

app.listen(port, () => console.log(`Server listening on port ${port}!`));