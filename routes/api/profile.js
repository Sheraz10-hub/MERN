const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private

// so whatever routes we want ot protect add auth as a second parameter
router.get('/me', auth, async (req, res) => {
    try {
        // user: going to pretain to our profile user field which is going to be the object id of the user.
        // req.user.id: login user geting by the id
        // i also want to populate this with the name fo the user and the avatar. remember those things are in user model user in profile model
        // 1st parameter: populate from user, 2nd parameter: array of fields which we want to bring in.
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if(!profile) {
            return res
              .status(400).json({ msg: "there is no profile for this user"});

        }
    
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;