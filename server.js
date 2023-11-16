const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/profs.json";

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url)
    next();
}
app.use(log);


// Endpoints
