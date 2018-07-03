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

module.exports = {router};