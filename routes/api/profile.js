const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check , validationResult } = require('express-validator')  // this is a post request so its takes data
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if(!profile) {
            return res.status(400).json({ msg: "there is no profile for this user"});
        }
    
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    POST api/profile
// @desc     Create or Update users profile
// @access   Private

// we are using two middleware auth middleware and validation middleware. in that case use brackets in 2nd parameter.
router.post('/',
    [
        auth,
        [
            check('status', 'status is required').not().isEmpty(),
            check('skills', 'skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build Profile object
        const profileFields = {};

        // getting req.user.id mean object id
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        // when skills actually we need to turn that into an array
        if(skills) {
            // split: return string to array which takes a comma,
            // trim: remove space both ends
            profileFields.skills = skills.split(',').map(skill => skill.trim());
            // output: [ 'HTML', 'CSS', 'PHP', 'Ruby' ]
        }

        // Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;   
        if (instagram) profileFields.social.instagram = instagram;

        // update and insert data
        try {
            // findOne in user model. with req.user.id (object id)
            let profile = await Profile.findOne({ user: req.user.id })
        
            // if profile found update it
            if(profile){
                // update
                profile = await Profile.findOneAndUpdate( // 1st parameter: find, 2nd: update
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            // if not found create it
            // create
            profile = new Profile(profileFields) 
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
);


// @route    GET api/profile
// @desc     Get All profile
// @access   Private

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        res.send(profiles);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


// @route    GET api/profile/user/:user_id 
// @desc     Get profile by user ID
// @access   public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: "Profile not found "})
        };
        res.json(profile);

    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found (kind)" })
        }

        res.status(500).send("Server Error")
    }
})



// @route    Delete api/profile
// @desc     Delete profile, user and post
// @access   Private

router.delete('/', auth, async (req, res) => {
    try {
        // @todo -remove users posts
        
        // Remove profile
        // we dont need to get anything so we dont the need a veriable here
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id }) // user is not the field is 'user model'. so we user _id
        res.json({ msg: 'User removed' });

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;