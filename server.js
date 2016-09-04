'use strict';

const express = require('express');
const path = require('path')

// Constants
const PORT = 8080;

// App
const app = express();
app.use(express.static('app'));
app.use('/bootstrap', express.static(path.join(__dirname,"node_modules/bootstrap/dist/")));
app.use('/babel-core', express.static(path.join(__dirname,"node_modules/babel-core/")));
app.use('/react', express.static(path.join(__dirname,"node_modules/react/dist/")));
app.use('/react-dom', express.static(path.join(__dirname,"node_modules/react-dom/dist/")));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
