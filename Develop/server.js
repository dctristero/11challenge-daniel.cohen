// importing and declaring basics
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');
const app = express();
const route = require("./routes/routes")

// ensures that express can parse the necessary data formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);

app.use(express.static('public'));

// tells express to listen for activity at the given port
app.listen(PORT, () =>
  console.log(`yeeeaaahhh booiiiii`)
);