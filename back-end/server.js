var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var database;

//uppercase M , something we want to instatiate and a model
var Message = mongoose.model('Message', {
    msg: String //define model
})

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.get('/api/message', GetMessages)

app.post('/api/message', function (req, res) {
    console.log(req.body);
    //database.collection('messages').insertOne(req.body);
    var message = new Message(req.body);
    message.save();

    res.status(200);
})

mongoose.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo!!");
     //   GetMessage(); //when connected - display all messages
        //database = db;
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})

function GetMessages(req, res) {
    Message.find({}).exec(function (err, result) {
        // console.log(result);
        res.send(result);
    })
}