const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPIdb'); //Creates db if doesn't exist
const Book = require('./models/bookModel');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());     //json(), not json

const bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function (req, res) {
        var book = new Book(req.body); //Create a new mongoose instance of Book
        book.save();                    // small s in save
        res.status(201).send(book); //Status 201 : Created
    })
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                console.log(err);
            }
            else
                res.json(books);
        });
    });
bookRouter.route('/Books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                console.log(err);
            }
            else
                res.json(book);
        });
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!!?');
});

app.listen(port, function (req, res) {
    console.log(`Listening on port ${port}`);
});