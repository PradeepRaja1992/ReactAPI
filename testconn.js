const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
mongoose.connect('mongodb://localhost/Dontreact');
console.log("connect");

var Myevent = mongoose.model('events', new Schema({ eventname: String }));
var Myteam = mongoose.model('team', new Schema({ },{
    collection : 'team'
}));
// events
Myevent.find({},function(error, result) { /* ... */
    //console.log(result);
});
//teams
Myteam.find({},function(error, result) { /* ... */
    console.log(result);
});
