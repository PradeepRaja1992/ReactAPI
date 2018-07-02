var express = require('express');
var router = express.Router();
var request = require('request');

router.route('/hello').get(function(request,res){
    res.send('Hello world');
});

module.exports = router;