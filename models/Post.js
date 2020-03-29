const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,  // since we created the veriable so we can just do Schema
        ref: 'users'
    },
    text: {
        type: String,
        require: true
    },
    name: { // name of post ( mean who made post)
        type: String
    },
    avatar: {
        type: String
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
            },
            name: { 
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ], 
    date: {  // i also want to date on the actual post itself
        type: Date,
        default: Date.now
    }

})

module.exports = Post = mongoose.model('post', PostSchema);
