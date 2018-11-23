const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPIdb'); //Creates db if doesn't exist
const Book = require('./models/bookModel'); // No need of .js extension

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());     //json(), not json

const bookRouter = require('./Routes/bookRoutes')(Book); // Invoke - to get bookRouter // Also, inject Book 

app.use('/api/Books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!!?');
});

app.listen(port, function (req, res) {
    console.log(`Listening on port ${port}`);
});