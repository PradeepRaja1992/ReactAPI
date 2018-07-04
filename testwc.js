const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var app =  express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var eventModel = require('./models/eventModel');
//var teamModel = require('./models/teamModel');

//var teamRoute = require('./routes/team');
//var eventRoute = require('./routes/events');
var Myevent = mongoose.model('events', new Schema({ eventname: String }));
//var Myteam = mongoose.model('teams', new Schema({teamname: String, pocname: String},{ collection : 'teams' }));
var Myteam = mongoose.model('teams', new Schema({teamname: String, mobile: String, email: String, teamsize: String, pocname: String,members:[{name: String,portfolio: String}]},{ collection : 'teams' }));
//var Myteam = new Schema({},{ collection : 'teams' });

mongoose.connect('mongodb://localhost/Dontreact');
console.log("connect");

app.post('/save',function(req,res){  
    console.log(req.body);  
    var payload = req.body;
    console.log(json.stringify(payload));
    payload['timestamp']= new Date();
    var agent = new Myteam(payload);
    //console.log(payload);

    Myteam.findOneAndUpdate({teamname: payload['teamname']}, {$set: payload}, {upsert: true}, function(error, result) { /* ... */
         if(error) return res.status(500).send(error);
         res.status(200).send(result);
    });
});

app.get('/set',function(req,res){    
    Myevent.find({},function(error, result) { /* ... */
        //console.log(result);
        res.send(result);
    });
});

app.get('/distEvents',function(req,res){
    var data =req.query; 
    console.log("stDt"+data['stDt'] + " --- "+ "edDt"+data['edDt']);
    if(data['stDt']) {
        Myevent.distinct('eventname', {startdate : {$gte: new Date(data['stDt'])}, enddate : {$lte: new Date(data['edDt'])}},function(error, result) { /* ... */
            console.log(result);
            res.send("with date search - "+result);
        });
    } else {
        Myevent.distinct('eventname', {},function(error, result) { /* ... */
            console.log(result);
            res.send("all data "+result);
        });
    } 
});

app.get('/findEvents',function(req,res){
    var data =req.query; var arr = [];
    if(data['stDt'] != undefined) {
    console.log("stDt"+data['stDt'] + " --- "+ "edDt"+data['edDt']+ " --- "+ "portfolio - "+ data['portfolio']);
    var n = data['portfolio'].includes(",");
    if (n == true){
        arr = data['portfolio'].split(",");
        console.log("arr is - "+arr);
    } else {
        arr.push(data['portfolio']);
    }
        Myevent.find({portfolio : {$in: arr } , startdate : {$gte: new Date(data['stDt'])}, enddate : {$lte: new Date(data['edDt'])}},function(error, result) { /* ... */
            //console.log(result);
            console.log({portfolio : {$in: arr }  ,startdate : {$gte: new Date(data['stDt'])}, enddate : {$lte: new Date(data['edDt'])} });
            res.send(result);
        });
    } else {
        Myevent.find({},function(error, result) { /* ... */
            //console.log(result);
            res.send(result);
        });
    } 
});

//app.use('/api/v1', teamRoute.router);

var server = app.listen(60,function(){
    console.log("We have started our server on port 60");
});


//http://localhost:60/findEvents?stDt=%222018-03-01%22&edDt=%222018-07-01%22&portfolio=CMB,ENG
