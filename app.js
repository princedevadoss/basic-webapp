const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 8081;

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', function(req, res, next) {
    res.send({hello:1});
});

app.listen(port, function() {console.log('Example app listening on port' + port +'!')});