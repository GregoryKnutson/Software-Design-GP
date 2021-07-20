import { render } from '@testing-library/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import signupImg from "./signup.svg";
import { checkAuth, setAuth } from '../../verifyLogin';

export class Register extends React.Component {
    
    constructor() {
        super();

        this.state = {
            redirectToReferrer: false,
            username: '',
            email: '',
            password: '',
        }
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

    register = (e) => {

        console.log(this.state)

        const formData = new FormData();
        formData.append("username", this.state.username)
        formData.append("email", this.state.email)
        formData.append("password", this.state.password)

        fetch(`${process.env.API_URL}/api/register`,
        {
          method: 'POST',
          body: formData,
        }
      )
        .then(res => {
          if(!res.ok) {
            alert("Username or email taken!");
            throw Error('Could not fetch the data for that resource');
          }
          if (res.status != 200) {
            alert("Username taken!");
          }
          return res.json();
        })
        .then(res => {
          setAuth(res)
          window.location.assign("/profile")
        })
        .catch((error) => {
          console.error('Error: ', error);
        })

    }

    render() {
        const { redirectToReferrer, username, email, password } = this.state

        return (
        <div className="base-container" ref={this.containerRef}>
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={signupImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" value={username} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="email" value={email} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" value={password} onChange={this.onChange}></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.register}>Register</button>
            </div>
        </div>
        );
    }
}