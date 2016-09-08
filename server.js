'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const monk = require('monk');

var http = require('http');

var db = monk('localhost:27017/test');
var collection = db.get('comments');

// Constants
const PORT = 8080;
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// App
var app = express();
app.use(express.static('app'));
app.use('/bootstrap', express.static(path.join(__dirname,"node_modules/bootstrap/dist/")));
app.use('/babel-core', express.static(path.join(__dirname,"node_modules/babel-core/")));
app.use('/react', express.static(path.join(__dirname,"node_modules/react/dist/")));
app.use('/react-dom', express.static(path.join(__dirname,"node_modules/react-dom/dist/")));
app.use('/jquery', express.static(path.join(__dirname,"node_modules/jquery/dist/")));
app.use('/remarkable', express.static(path.join(__dirname,"node_modules/remarkable/dist/")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/health', function(req, res) {
    res.status(200).send('ok');
});

app.get('/api/comments', function(req, res) {
    var comments = collection.find({},{limit:20},function(e,docs){
      res.json(docs);
    })
});

app.post('/api/comments', function(req, res) {
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };

	  collection.insert(newComment);
	  res.redirect('/api/comments')
});

var server = http.createServer(app);
server.listen(PORT, function() {
  console.log("Node server running on http://localhost:" + PORT);
});

module.exports = app;
