mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    level: Number,
    reached_at: Number
});

userSchema.statics.getToplist = function (cb) {
    this.model('User').find({}).sort({ level: -1, reached_at: 1 }).limit(15).execFind(cb);
};

userSchema.statics.removeAll = function (cb) {
    this.model('User').find({}, function (err, users) { users.forEach(function (u) { u.remove(); }); });
};

userSchema.statics.removeByName = function (name, cb) {
    this.model('User').findOne({ name: name }, function (err, user) { if (!user) { return; } user.remove(); });
};

exports.User = mongoose.model('User', userSchema);