const express = require("express");
const fs = require("fs");
const path = require("path");
// parses the json for some reason
const db = require('../db/db.json');

const { v4: uuidv4 } = require('uuid');

const route = require('express').Router();

// sends/displays homepage
route.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

// BROKEN BROKEN BROKEN
route.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//
route.get("/api/notes", (req, res) => {
   // fs.readfile("../db/db.json", (err, data) => {
      res.json(db);
   // })
});

route.post("/api/notes", (req, res) => {
   const { title, text } = req.body;
   const freshDrop = {
      title: title,
      text: text,
      id: uuidv4(),
   };
    
   let wholeShebang = db;
   wholeShebang.push(freshDrop);
   fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(wholeShebang));

   const robotTalk = {
      status: "weeee are the chaaaampions",
      body: freshDrop,
   };
 
   res.json(robotTalk);
});

route.delete("/api/notes/:id", (req, res) => {
   const id = req.params.id;
   for (let i = 0; i < db.length; i++) {
      if (db[i].id === id) {db.splice(i, 1)}
   };
   fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db))
   res.send(`note #${id} has died a horrible death`);
});

module.exports = route;