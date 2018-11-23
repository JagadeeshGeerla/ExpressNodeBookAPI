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

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;       //Added book property to req object
                //console.log(req);
                next();
            }
            else {
                res.status(404).send('No book found!');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);     // Note its req.book, not res.book
        })
        .put(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                // These two lines are synchronous. Make it asynchronous
                //req.book.save();  
                //res.json(req.book);
                req.book.save(function () {
                    if(err) 
                        res.status(500).send(err);
                    else {
                        res.json(req.book);
                    }
                });
                
            });
        })
        .patch(function (req, res) {
            //  if(req.body.title) { } // This is cumbersome
            if (req.body._id)
                delete req.body._id;
            for (var key in req.body) {
                req.book[key] = req.body[key];
            }
            req.book.save(function (err) {
                if(err) 
                    res.status(500).send(err);
                else {
                    res.json(req.book);
                }
            });
        })
        .delete(function(req,res) {
            req.book.remove(function(err) {
                if(err) 
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');    //Status 204 - Removed
                }
            });
        });

    return bookRouter;
};

module.exports = routes;