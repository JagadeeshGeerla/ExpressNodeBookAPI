const express = require('express');

const app = express();

const port = process.env.port || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res) {
        var responseJson = {hello: "this is my API"};

        res.json(responseJson);
    });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!!?');
});

app.listen(port, function(req, res) {
    console.log(`Listening on port ${port}`);
});