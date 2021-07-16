import { render } from '@testing-library/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import fakeAuth from '../../auth';
import signupImg from "./signup.svg";

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

        fetch(`${process.env.API_URL}/api/login`, {
            method: 'POST',
            body: formData,
          })
 

        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
        console.log("Registered! Please proceed to complete your profile")
        }

    render() {
        const { redirectToReferrer, username, email, password } = this.state

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/profile' />
            )
        }

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