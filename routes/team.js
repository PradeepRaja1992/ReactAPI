var express = require('express');
var router = express.Router();
var request = require('request');

console.log("in team route");
router.route('/hello').get(function(req, res) {
    console.log("in team route: hello");
    return res.json('hello!!!!...');
});

module.exports = {router};