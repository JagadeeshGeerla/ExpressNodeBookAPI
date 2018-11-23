const express = require('express');

var routes = function (Book) {
    const bookRouter = express.Router();

    bookRouter.route('/')
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
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    console.log(err);
                }
                else
                    res.json(book);
            });
        });

        return bookRouter;
};

module.exports = routes;