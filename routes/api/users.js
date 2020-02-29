const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const { check, validationResult} = require('express-validator');

// bring our user model
const User = require('../../models/User')

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', [
    check('name', 'Name is require').not().isEmpty(),
    check('email', "Unique Email is require").isEmail(),
    check('password', "Password length is must 6 character").isLength({ min: 6 })
],
    async (req, res) => { 
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    // we pull out these stuff from req.body
    const { name, email, password } = req.body;

    try {

    // see if user exists
    let user = await User.findOne({ email }); // findOne is the query in Mongodb
    if(user) {
        res.status(400).json({ errors: [{ msg: "User already exist "}] });
    }

    // Get users gravatar
    // just pass the user email into a method and that will get us the URL
    const avatar = gravatar.url(email, { // also passing some option. (three option we are passing)
        // s is for default size, r is ratting, d is defaul ( programmer also doesnt know what it mean) kindly read documention 
        s: '200',
        r: 'pg',
        d: 'mm'
    }) 

    // creating an instance of user
    user = new User({ // and passing with object of field that we want 
        name,
        email,
        avatar,
        password
    });
    
    // Encrypt Password

    // creating hashing
    const salt = await bcrypt.genSalt(10); // read document about genSalt and bcrypt
    // user is the instance that we created. 
    // bcrypt.hash takes two things 1st: plane text which is password and 2nd: salt
    user.password = await bcrypt.hash(password, salt)

    //  user still hasnot been saved to the database
    // saving to database
    await user.save(); // we also use this one for promiss user.save().then();


    // Return Jsonwebtoken
        
    res.send('User Registered')

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    });




module.exports = router;