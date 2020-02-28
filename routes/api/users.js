const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/', [
    // check function form express validation takes 1st: field name and 2nd: message
    check('name', 'Name is require').not().isEmpty(),
     // username must be an email
    check('email', "Unique Email is require").isEmail(),
    // password must be at least 6 chars long
    check('password', "Password length is must 6 character").isLength({ min: 6 })
],(req, res) => { 
  // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    // a boolean indicating whether this result object contains no errors at all.
    // do something if hasErrors is true
    if(!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    res.send('User route')});

module.exports = router;