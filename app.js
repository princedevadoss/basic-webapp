const express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

var dbString = "mongodb+srv://prince:Sasikala2122@cluster0-8f79j.mongodb.net/apptest?retryWrites=true&w=majority";

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

app.get('/content1', function(req,res,next) {
    var name = req.query.name;
    console.log('name ', name);
    name= name.trim();
    var t = mongoose.connect(dbString);
    t.then(function(c) {
        let Schema = mongoose.Schema;
        let testSchema = new Schema({
        name: String,
        age: Number,
        mark: Number
        });
        let test = mongoose.model('tests', testSchema);
        console.log('name ', name);
        test.find({name: name}, function(err, testContent) {
            if(err) {
                console.log('Credentials Error');
                res.send('Error');
            }
            console.log(testContent);
            res.send('Success');
        })
    })
    .catch(function(err) {
        res.send(err);
    })
});

app.get('/content', function(req, res, next) {
    var t = mongoose.connect(dbString);
    t.then(function(c) {
        if(!c) throw error;
        let Schema = mongoose.Schema;
        let testSchema = new Schema({
        name: String,
        age: Number,
        mark: Number
        });
        let test = mongoose.model('tests', testSchema);
        console.log(typeof Schema, typeof testSchema);
        test.find({}, function(err, testContent) {
            if(err) {
                console.log('Credentials Error');
                res.send('Error');
            }
            console.log(testContent);
            res.send('Success');
        })
    }).catch(function(err) {
        console.log('MongoDB Connectivity failed');
        res.send('Error');
    });
});

app.post('/create', function(req, res, next) {
    var data = req.body;
    var name = data.name;
    var age = data.age;
    var t = mongoose.connect(dbString);
    t.then(function(c) {
        let Schema = mongoose.Schema;
        let testSchema = new Schema({
        name: String,
        age: Number,
        mark: Number
        });
        let test = mongoose.model('tests', testSchema);
        var p = new test();
        p.name = function() {};
        p.age = age;
        p.save(function(err, saveObj) {
            if(err) {
                console.log('Insertion error');
                res.send('Insertion Error');
            }
            res.send('Successfully Inserted');
        });
    })
    .catch(function(err) {
        console.log('Connection Error');
        res.send('Connection Failure');
    })
});

app.get('*', function(req, res) {
    res.sendfile('client/index.html');
});

app.listen(port, 
    function() {
        console.log('Example app listening on port' + port +'!');
});