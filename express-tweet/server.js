/// <reference path="./typings/index.d.ts" />
var express = require('express'), search = require('./search');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/search', function (req, res, next) {
    search(req.query.q, function (err, tweets) {
        if (err) {
            return next(err);
        }
        res.render('seach', {results: tweets, search: req.query.q});
    });
});

app.listen(3000);
