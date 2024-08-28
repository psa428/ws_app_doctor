const mongoose = require('mongoose');
const { required } = require('yargs');

const UserSchema = mongoose.Schema({
    email: {
        type:   String,
        required:   true
    },
    password: {
        type:   String,
        required:   true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;