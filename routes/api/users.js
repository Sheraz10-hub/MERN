const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken'); 
const config = require('config');  
const { check, validationResult} = require('express-validator');

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

    const { name, email, password } = req.body;
    try {
    // see if user exists
    let user = await User.findOne({ email }); 
    if(user) {
        res.status(400).json({ errors: [{ msg: "User already exist "}] });
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    }) 
    // creating an instance of user
    user = new User({
        name,
        email,
        avatar,
        password
    });
    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)
    await user.save();

    // Return Jsonwebtoken    
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
    );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;