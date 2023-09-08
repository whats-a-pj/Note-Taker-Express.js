//this helps connect express and create paths
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
//const noteDB = require('./db/db.json');
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;
// const PORT = "127.0.0.1";

//this is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

//connecting the database
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

//adds stuff to database
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log("New Note : " + JSON.stringify(newNote));
    newNote.id = uuidv4();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    console.log("Added new note to 'db.json' file!");
    res.json(data);
});

//connecting the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//connecting the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//connecting the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//connecting the localhost port
app.listen(PORT, console.log(`Port working properly at ${PORT}`));