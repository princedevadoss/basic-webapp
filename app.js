const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 8081;

app.use('/', express.static(path.join(__dirname, '/client')));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', function(req, res, next) {
    res.send({hello:1});
});

app.get('/hi', function(req, res, next) {
    res.send({hi:1});
});

app.post('/hi', function(req, res, next) {
    var ar = req.body;
    var c = Number(ar['a']) + Number(ar['b']);
    console.log(c);
    res.send({c : c});
});

app.get('*', function(req, res) {
    res.sendfile('client/index.html');
});

app.listen(port, 
    function() {
        console.log('Example app listening on port' + port +'!');
});