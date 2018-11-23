{
    "read": false,
    "_id": "5bf7d7b791e27e43043d710a",
    "title": "Animal Farm",
    "genre": "Fictional",
    "author": "George Orwell",
    "__v": 0
}


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