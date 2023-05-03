// importing and declaring basics
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const db = require('./db/notes.json');
const app = express();

// ensures that express can parse the necessary data formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tells express to listen for activity at the given port
app.listen(PORT, () =>
  console.log(`yeeeaaahhh booiiiii`)
);