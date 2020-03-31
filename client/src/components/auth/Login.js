import React, { Fragment, useState } from 'react' // we use react hooks to change the state, its easy
import { Link } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData] = useState({   // formData getd all the value in the form
        email: '',
        password: '',
    });

    const { email, password } = formData; // we destructor all value from formData

    // ...formData: copy the form data we use spread operator (...) before it
    // then we want to change the name to whats the input value is.
    // first i use name: e.target.value. but i realize its the same for all data
    // then i change it to [e.target.name]: e.target.value
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        console.log("SUCCESS")
    }

    return <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>

            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email" value={email}
                    onChange={e => onChange(e)}
                    required />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required/>
            </div>

            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have any account? <Link to="/register">Sign Up</Link>
        </p>
    </Fragment>

}

export default Login;
