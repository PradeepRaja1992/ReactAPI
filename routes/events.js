var express = require('express');
var router = express.Router();
var request = require('request');

var eventModel = require('../models/eventModel.js');

console.log("in event route");
router.route('/hi').get(function(req, res) {
    console.log("in event route: hello");
    return res.json('hello!!!!...');
});

router.route('/findEvents').get(function(req, res) {
    var data =req.query; 
    var arr = [];
    
    if(data['portfolio']){
        var n = data['portfolio'].includes(",");

        if (n == true){
            arr = data['portfolio'].split(",");
            console.log("arr is - "+arr);
        } else {
            arr.push(data['portfolio']);
        }
    }
    var match = {"$match":{}};
    
    if(data['stDt']) {
        console.log("stDt" + data['stDt']);
        match['$match']['startdate'] = {$gte: new Date(data['stDt'])};
    }
    if(data['edDt']) {
        console.log("edDt" + data['edDt']);
        match['$match']['enddate'] = {$gte: new Date(data['edDt'])};
    }
    if(data['portfolio']) {
        console.log("portfolio" + data['portfolio']);
        match['$match']['portfolio'] =  {$in: arr };
    }    

    var query = eventModel.aggregate([match]);

    console.log("qry: " + JSON.stringify(query));
    query.allowDiskUse(true).exec(function (error, result) { /* ... */
        if (error) {
            console.log(error);
        }        
        console.log('result: ' + result);
        return res.json(result);
    });
    
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