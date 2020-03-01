const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    // we want to create a reference to the user model
    // Because every Profile is associated with the user.
    user: {
        type: mongoose.Schema.Types.ObjectId, // type is objectid because we connect it to user id
        ref: 'user' // ref to user model
    },
    company: {
        type : String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: { // etc: developer, student, instructor etc
        type: String,
        require: true
    },
    stills: {
        type: [String],
        require: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [ // experience is the array of other fields, etc past jobs
        {
            title:{
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date
            },
            current: { // check the current checkbox still it'll disable to field.
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [ // array of object
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                require: true
            },
            fieldofstudy: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: { 
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);