const express = require("express");
const fs = require("fs");
const path = require("path");
// parses the json for some reason
const db = require('./db/db.json');

// sends/displays homepage
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'));
});

// sends/displays notes page
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//
app.get("/api/notes", (req, res) => {
   fs.readfile("Develop/db/db.json", (err, data) => {
      res.json(data);
   })
});

// Reads the newly added notes from the request body and then adds them to the db.json file
const readThenAppendToJson = (content, file) => {
   fs.readFile(file, "utf8", (err, data) => {
     if (err) {
       console.error(err);
     } else {
       const parsedData = JSON.parse(data);
       parsedData.push(content);
       writeNewNoteToJson(file, parsedData);
     }
   });
 };
 
 // Writes data to db.json -> utilized within the readThenAppendToJson function
 const writeNewNoteToJson = (destination, content) =>
   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
     err ? console.error(err) : console.info(`\nData written to ${destination}`)
   );

app.post("/api/notes", (req, res) => {
   const { title, text } = req.body;
   const freshDrop = {
      title: title,
      text: text,
      id: ,
   };
    
   const wholeShebang = db;
   wholeShebang.push(freshDrop);
   fs.writeFileSync(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(wholeShebang))

   const robotTalk = {
      status: "weeee are the chaaaampions",
      body: freshDrop,
   };
 
   res.json(robotTalk);
   
 });

 app.delete("/api/notes/:id", (req, res) => {
   const id = req.params.id;
   const wholeShebang = db;
   fs.readFile("Develop/db/db.json", (err, data) => {
      for (let i = 0; i < wholeShebang.length; i++) {
         if (wholeShebang[i].id === id) {wholeShebang.splice(i, 1)}
       }
   });
   res.send(`note #${id} has died a horrible death`);
 });