var express = require('express');
var router = express.Router();

console.log("in team route");
router.route('/').get(function(req, res, next) {
    console.log("in team route: hello");
    res.send('Hello');
});

module.exports = router;