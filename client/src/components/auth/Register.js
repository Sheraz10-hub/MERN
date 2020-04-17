import React, { Fragment, useState } from 'react'; // we use react hooks to change the state, its easy
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'


const Register = ({ setAlert }) => {

    const [ formData, setFormData ]  = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    
    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            // calling function setAlert which is in action/alert.js
            setAlert('password do not match', 'danger');

        } else {
            console.log(formData)
        }
    }

    return <Fragment> 
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>  
            <div className="form-group"> 
                <input 
                type="text" 
                placeholder="Name" 
                name="name" 
                value={name} 
                onChange = { e => onChange(e) }  // onChangeHandler: passing e as event and calling onChangehandler
                required />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" value={email}
                    onChange={e => onChange(e)}
                    required/>
                <small className="form-text"
                >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                >
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={password2}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
         </Fragment>
    
}

Register.propTypes = {
    alert: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setAlert }
    )(Register);

// Now connect takes in two things, one is there any state you want to map.
// So if you want to get state from alert or profile or anything else would put that as a first parameter. 
// im going to put it null because i dont need anything right now.

// second is an object with any actions, you want to use
// in our case it is setAlert, now what this is going to do is it's going to allow us to access props dot set alert.