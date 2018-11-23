const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPIdb'); //Creates db if doesn't exist
const Book = require('./models/bookModel');

const app = express();
const port = process.env.port || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res) {
        //var query = req.query;
        //console.log(query);
        var query = {};
        if(req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books) {
            if(err) {
                console.log(err);
            }
            else
                res.json(books);
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!!?');
});

app.listen(port, function(req, res) {
    console.log(`Listening on port ${port}`);
});