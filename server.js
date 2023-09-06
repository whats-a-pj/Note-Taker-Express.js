//this helps connect express and create paths
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const noteDB = require('./db/db.json');
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;
// const PORT = "127.0.0.1";

//this is the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

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

// app.get('/api/notes', (req, res) => {
//     fs.readFileSync("./db/db.json", (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: "something ain't right here buddy"});
//         } else {
//             res.json(JSON.stringify(data));
//             // res.json(JSON.parse(data));
//         }
//     })
//    // res.sendFile(path.join(__dirname, './public/notes.html'));
// });

//todo fs.writeFile POST request here & parse it somehow
    //1. pull current note data 
    //- readFileSync- noteDB     //readFileSync async func/async await- loads up before anything else is done
    //2. add new note data let newNote is another key in db.json
    //- use noteDB to add newNotes and parse it with a .push and stringify - req.body.(title/text/id from db.json) how do? .push somewhere 
    //- need to create id
    //3. fs.writeFile db.json -- res.json w uuid()
    //- JSON.parse(fs.readFileSync(./db/db.json or noteDB)
    //- api/notes/:id
//     let newNotes = JSON.stringify(fs.writeFileSync("./db/db.json", (err, noteDB) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({err: "something's broken yo"});
//         } else {
//             res.json(JSON.parse(noteDB.push(newNotes)));
//         }
//         }));
/************************************************************************************************************************************/

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
//todo this is literally all just parsing notes and garbage that isn't working
// app.post("/api/notes", (req, res) => {

//     const newNote = req.body;
//     console.log("New Note : " + JSON.stringify(newNote));
//     newNote.id = uuidv4();
//     let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     data.push(newNote);
//     fs.writeFileSync('./db/db.json', JSON.stringify(data));
//     console.log("Added new note to 'db.json' file!");
//     res.json(data);
// });
// app.post('/api/notes', (req, res) => {
    //readFileSync here
//     const notes = JSON.stringify(fs.readFileSync("./db/db.json", (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({err: "something ain't right here buddy"});
//         } else {
//             res.json(JSON.parse(data.JSON.stringify(notes)));
//         }
//     }));

// });

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