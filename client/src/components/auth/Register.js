import React, { Fragment, useState } from 'react' // we use react hooks to change the state, its easy

const Register = () => {

    const [ formData, setFormData ]  = useState({   // formData getd all the value in the form
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData; // we destructor all value from formData

    // ...formData: copy the form data we use spread operator (...) before it
    // then we want to change the name to whats the input value is.
    // first i use name: e.target.value. but i realize its the same for all data
    // then i change it to [e.target.name]: e.target.value
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            console.log('password do not match')
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
            Already have an account? <a href="login.html">Sign In</a>
        </p>
         </Fragment>
    
}

export default Register
