//this helps connect express and create paths
const express = require("express");
const path = require("path");
const noteDB = require('./db/db.json');
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;
// const PORT = "127.0.0.1";

//this is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
// app.use('/public');

//todo where to input the fs.readFile??
//todo where to put app.post and how do i parse my db.json data?

//connecting the notes db
// app.get('/api/notes', (req, res) => {
//     res.json(noteDB);
// });

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


/********************************************************************************************/

// app.get('/', (req, res) => {
//     console.log('connection running')
// })

// app.post