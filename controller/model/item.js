const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema

const userSchema =  new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true      
    }
});

module.exports = User = mongoose.model('user', userSchema);