'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// App
const app = express();
app.use(express.static('app'));
app.use('/bootstrap', express.static(path.join(__dirname,"node_modules/bootstrap/dist/")));
app.use('/babel-core', express.static(path.join(__dirname,"node_modules/babel-core/")));
app.use('/react', express.static(path.join(__dirname,"node_modules/react/dist/")));
app.use('/react-dom', express.static(path.join(__dirname,"node_modules/react-dom/dist/")));
app.use('/jquery', express.static(path.join(__dirname,"node_modules/jquery/dist/")));
app.use('/remarkable', express.static(path.join(__dirname,"node_modules/remarkable/dist/")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
