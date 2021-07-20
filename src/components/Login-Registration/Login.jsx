import { render } from '@testing-library/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import loginImg from "./loginPic.svg";
import { checkAuth, setAuth } from '../../verifyLogin';

export class Login extends React.Component {

    
    constructor() {
        super();

        this.state = {
            redirectToReferrer: false,
            username: '',
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

    login = (e) => {

        console.log(this.state)

        const formData = new FormData();
        formData.append("username", this.state.username)
        formData.append("password", this.state.password)

        fetch(`${process.env.API_URL}/api/login`, {
            method: 'POST',
            body: formData,
          })
            .then(res => {
              if(!res.ok) {
                alert("Invalid username/password!");
                throw Error('Could not fetch the data for that resource');
              }
              if (res.status != 200) {
                alert("Invalid username/password!");
              }
              return res.json();
            })
            .then(res => {
              setAuth(res)
              window.location.assign("/home")
            })
            .catch(error => {
              console.log(error);
              setError(true);
            })


            if (checkAuth()) {
                return (
                  <Redirect to='/home' />
                )
              }
    }

    render() {
        const { redirectToReferrer, username, password } = this.state

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/home' />
            )
        }
        return (
        <div className="base-container" ref={this.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username" value={username} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password" value={password} onChange={this.onChange}></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.login}>Login</button>
            </div>
        </div>
        );
    }
}