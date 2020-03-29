const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')


// @route    Post api/posts
// @desc     Create a post
// @access   Public

router.post('/', [auth,[
    check('text', 'text must be required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // remember we're logged in, So we have the token which gives us the user I.D 
        // and put it inside of requests, so just we used that
        const user = await User.findById(req.user.id).select('-password')

        // create veriable for new post
        const newPost = new Post({
            text: req.body.text, // text is comes from body
            name: user.name,  // rest of stuff comes from inner, from you know the user
            avatar: user.avatar,
            user: req.user.id
        })

        // save the post and put inside the veriable 'post'
        const post = await newPost.save();
        res.json(post)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

module.exports = router;
