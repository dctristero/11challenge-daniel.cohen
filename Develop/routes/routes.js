const express = require("express");
const fs = require("fs");
const path = require("path");
// parses the json for some reason
const db = require('./db/db.json');

const uuid = require('../uuid');

const route = require('express').Router();

// sends/displays homepage
route.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'));
});

// BROKEN BROKEN BROKEN
route.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//
route.get("/api/notes", (req, res) => {
   fs.readfile("Develop/db/db.json", (err, data) => {
      res.json(data);
   })
});

route.post("/api/notes", (req, res) => {
   const { title, text } = req.body;
   const freshDrop = {
      title: title,
      text: text,
      id: uuid(),
   };
    
   let wholeShebang = db;
   wholeShebang.push(freshDrop);
   fs.writeFileSync(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(wholeShebang));

   const robotTalk = {
      status: "weeee are the chaaaampions",
      body: freshDrop,
   };
 
   res.json(robotTalk);
});

route.delete("/api/notes/:id", (req, res) => {
   const id = req.params.id;
   let wholeShebang = db;
   fs.readFile("Develop/db/db.json", (err, data) => {
      for (let i = 0; i < data.length; i++) {
         if (data[i].id === id) {data.splice(i, 1)}
      };
      let wholeShebang = data;
      fs.writeFileSync(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(wholeShebang));
   });
   res.send(`note #${id} has died a horrible death`);
});

module.exports = route;