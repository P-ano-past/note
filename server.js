// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var newEntry = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all notes
app.get("/api/newentry", function(req, res) {
  return res.json(newEntry);
});

// Displays a single character, or returns false
app.get("/api/newentry/:title", function(req, res) {
  var chosen = req.params.title;

  console.log(chosen);

  for (var i = 0; i < newEntry.length; i++) {
    if (chosen === newEntry[i].routeName) {
      return res.json(newEntry[i]);
    }
  }
  //newNotes is not defined. 
  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNotes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNotes.routeName = newNotes.title.replace(/\s+/g, "").toLowerCase();

  console.log(newNotes);

  newEntry.push(newNotes);

  res.json(newNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
