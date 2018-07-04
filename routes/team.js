var express = require('express');
var router = express.Router();
var request = require('request');
var teamSchema = require('../models/teamModel');

console.log("in team route");
router.route('/hello').get(function(req, res) {
    console.log("in team route: hello");
    return res.json('hello!!!!...');
});

router.route('/teams').get(function(req, res) {
    console.log("get team route");

    // find each person with a last name matching 'Ghost'
    var query = teamSchema.find({});

    // selecting the `name` and `occupation` fields
    query.select('teamname');
    console.log('qry: '+ query);
    // execute the query at a later time
    query.exec(function (err, person) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host."
    console.log(person);
    return res.json(person);    
    });
});

router.route('/registerTeam').post(function(req, res) {
    console.log("register team " + JSON.stringify(req.body));
    var data = req.body;
    console.log("register team " + JSON.stringify(data));
    var query = {"eventid":data['eventid']};
    console.log("query: " + JSON.stringify(query));
    teamSchema.findOneAndUpdate({"eventid":"3"}, { "$set": {"eventid":"3","teamname":"Reactive","pocname":"Pradeep R","members":[{"name":"Ramesh","portfolio":"CAO"},{"name":"Mansoor","portfolio":"NTS"}],"teamsize":3}}, {new: true, upsert: true}, function(err, doc){
        if(err){
            console.log("Error, please try after sometime : " + err);
            return res.json("error");
        }
        return res.json("success");
    });        
});

module.exports = {router};