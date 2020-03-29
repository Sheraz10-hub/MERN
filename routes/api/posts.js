const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')


// @route    POST api/posts
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
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name, 
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        res.json(post)

    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});


// @route    GET api/posts
// @desc     Get all posts
// @access   Private    // its upto you make it private or public, but i made it private because for seen post you should be logged in

router.get('/',auth, async (req, res) => {
    try {
         // we'll do for most recent post so we add negative 1 in sort method
        const posts = await Post.find().sort({ date: -1 })  
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
})


// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private   

router.get('/:id', auth, async (req, res) => {
    try {
        // req.params.id: will allow us to get it from the URL
        const post = await Post.findById(req.params.id);

        if(!post) {
            // status 404 because no found
            return res.status(404).json({ msg: 'Post not Found' })
        }

        res.json(post)
    } catch (err) {
        console.error(err.message)

        // when Id is not a valid objectID
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Not a valid ID' })
        }

        return res.status(500).send('Server Error')
    }
})

// @route    DELETE api/posts/:id
// @desc     Delete a posts
// @access   Private    

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        // we want to make sure that the user thats deleting the post is user thats own the post
        // Check user
        // req.user.id is the string 
        // post.user is the object id so we add toString method to it
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Post removed' })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
           return res.status(404).json({ msg: 'Not a valid ID' })
        }
        return res.status(500).send('Server Error')
    }
})

module.exports = router;
