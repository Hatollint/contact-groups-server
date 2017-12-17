var mongoose    = require('mongoose');
var log         = require('./log')(module);

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var Contact = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    group: { type: Number, required: true },
    modified: { type: Date, default: Date.now }
});

var Group = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});

// validation
Contact.path('name').validate(function (v) {
    return v.length > 3 && v.length < 70;
});

var ContactModel = mongoose.model('Contact', Contact);
var GroupModel = mongoose.model('Group', Group);

module.exports.ContactModel = ContactModel;
module.exports.GroupModel = GroupModel;
