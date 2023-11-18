const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

require('dotenv').config();

const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);

// const string 

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
    // Use connect method to connect to the server
    await client.connect();
    // Database reference with creation if it does not already exist
    const db = client.db(`prof-rating-app`);
    console.log(`New database:\t${db.databaseName}\n`);
}

//Endpoints
// Retrieve all saved entities
app.get("/profs", function (req, res) {
    // TODO: Insert mongoDb query
});

// Retrieve one saved entity
app.get("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
});

// Modify one entity
app.put("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
});

// Delete one entity
app.delete("/profs/:id", function (req, res) {
    // TODO: Insert mongoDb query
});

// Crrate a new entity
app.post("/profs", function (req, res) {
    // TODO: Insert mongoDb query
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));