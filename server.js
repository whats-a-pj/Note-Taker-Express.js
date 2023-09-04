//this helps connect express and create paths
const express = require("express");
const path = require("path");
const uuid = require("uuid");
//const noteDB = require('./db/db.json'); ?? askbcs says i dont need this but not sure why not
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;
// const PORT = "127.0.0.1";

//this is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", uuid, (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).json({ error: "something ain't right here buddy"});
        } else {
            res.json(data);
            // res.json(JSON.parse(data));
        }
    })
   // res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", uuid, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err: "something ain't right here buddy"});
        } else {
            res.json(JSON.parse(data));
        }
    });

    //todo fs.writeFile here & parse it
    //1. pull current note data
    //2. add new note data
    //3. req.body.(title/text/id from db.json) how do? .push somewhere 
    //4. fs.writeFile db.json -- res.json w uuid()
/****************************************************************
    fs.writeFile("./db/db.json", uuid, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({err: "something's broken yo"});
        } else {
            res.json(JSON.parse(data));
        }
        })
********************************************************************/

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


/********************************************************************************************/

        // if (err) {
        //     console.log(err);
        //     res.status(500).json({error: "somethin's funky here yo"});
        // } else {
        //   (from index.js file)
        //     const handleNoteSave = () => {
        //         const newNote = {
        //           title: noteTitle.value,
        //           text: noteText.value,
        //         };
        //         saveNote(newNote).then(() => {
        //           getAndRenderNotes();
        //           renderActiveNote();
        //         });
        //       };
        //       handleNoteSave()

            // res.json(data + newNote);