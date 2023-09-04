// require fs modules and express()
//writeToFile index.html? with template literals n such

//todo refresh data persistence activities in UofU repo
const express = require("express");
const path = require("path");
const noteDB = require('./db/db.json');
const fs = require("fs");

const PORT = 3001;

const app = express();

//this is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'));
// app.use('/public');

//todo where to input the fs.readFile??

//connecting the index.html
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//connecting the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//connecting the localhost port
app.listen(PORT, console.log(`Port working properly at ${PORT} ???`));
// app.listen(PORT, (req, res) => {
//     res.send(`port is working properly at ${PORT} ???`);
// })


/********************************************************************************************/

// app.get('/', (req, res) => {
//     console.log('connection running')
// })

// app.post