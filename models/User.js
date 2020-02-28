const mongoose = require('mongoose');

// mongoose.schema takes an object with all the fields we want
// so we want name and want to set an object type String, Require condition is true
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// module.exports set it to veriable User and set it to mongoose.model()
// mongoose model takes two things 1st model name and 2nd is the schema
module.exports = User = mongoose.model('user', UserSchema);