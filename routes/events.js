var express = require('express');
var router = express.Router();
var request = require('request');

var eventModel = require('../models/eventModel.js');

console.log("in event route");
router.route('/hi').get(function(req, res) {
    console.log("in event route: hello");
    return res.json('hello!!!!...');
});

router.route('/findeve1').get(function(req, res) {
    var data =req.query; var arr = [];
    console.log("stDt"+data['stDt'] + " --- "+ "edDt"+data['edDt']+ " --- "+ "portfolio - "+ data['portfolio']);
    
    if(data['stDt']) {
        var n = data['portfolio'].includes(",");
        if (n == true){
            arr = data['portfolio'].split(",");
            console.log("arr is - "+arr);
        } else {
            arr.push(data['portfolio']);
        }

        eventModel.find({portfolio : {$in: arr } , startdate : {$gte: new Date(data['stDt'])}, enddate : {$lte: new Date(data['edDt'])}},function(error, result) { /* ... */
            //console.log(result);
            console.log({portfolio : {$in: arr }  ,startdate : {$gte: new Date(data['stDt'])}, enddate : {$lte: new Date(data['edDt'])} });
            res.send(result);
        });
    } else {
        eventModel.find({},function(error, result) { /* ... */
            //console.log(result);
            res.send(result);
        });
    } 
});

router.route('/find1').get(function(req, res) {
   
    eventModel.find({},function(error, result) { /* ... */
            //console.log(result);
            if (error) {
                console.log(error);
            }
            res.send(result);
        });
   
});

module.exports = {router};